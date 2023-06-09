import {BrowserRouter,Route,Routes} from "react-router-dom"
import React from 'react'
import Login from "./views/Login/Login";
import Layout from "./views/Layout/Layout";
import Role from "./views/Role/Role";
import Admin from "./views/Admin/Admin";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/layout" element={<Layout/>}>
          <Route path="role" element={<Role/>}/>
          <Route path="admin" element={<Admin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




