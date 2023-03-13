import Login from "./views/Login/Login";
import Layout from "./views/Layout/Layout";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import React from 'react'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/layout" element={<Layout/>}/>
      </Routes>
    </BrowserRouter>
  );
}




