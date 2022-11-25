import axios, { AxiosResponse } from 'axios';
import { employee, res } from '../types/types';

const instance = axios.create({
    baseURL: 'http://localhost:4001/api/employee',
    timeout: 15000,
});



const responseBody = (response: AxiosResponse) => response.data;

const Requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: employee) => instance.post(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
    put :(url:string, body:employee) => instance.put(url, body).then(responseBody)
};


export const employees = {
    getEmployes: (page:number, limit:number) : Promise<employee[]> => Requests.get(`/?page=${page}&limit=${limit}`),
    createEmployee: (employee : employee) : Promise<res> => Requests.post(`/create`, employee),
    deleteEmployee: (_id : string) : Promise<res> => Requests.delete(`/delete/${_id}`),
    updateEmployee: (employee : employee) : Promise<res> => Requests.put(`/update/${employee._id}`, employee),
}
