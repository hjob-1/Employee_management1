import Home from "./pages/Home";
import Employee from "./pages/AddEditEmployee";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className='app'>
      <Nav />
      <Routes>
        <Route path='/add' element={<Employee />} />
        <Route path='/' element={<Home />} />
        <Route path='/update/:id' element={<Employee />} />
      </Routes>
    </div>
  );
}

export default App;
