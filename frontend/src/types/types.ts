  interface state_interface {
  employee: employee[];
  loading: boolean;
  filtered: employee[];
  error: boolean;
  success: boolean;
  message: string;
  len: number;
}
 
 
 interface employee {
   _id:string;
   full_name:string;
   gender:string;
   dob:string;
   salary:number;
   createdAt?:string;
   updatedAt?:string;
}

type res = {
  success:boolean;
  message:string;
}
type empdelete = {
  message: string;
  success: boolean;
  _id: string;
};
type date = {
  date?: boolean;
};
type onChange = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};
export type {employee,res,state_interface,empdelete, date,onChange}