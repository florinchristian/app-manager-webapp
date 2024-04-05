import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";

const App = () => {
    return (
       <BrowserRouter>
           <Routes>
               <Route index element={<Dashboard />}/>
               <Route path={'/login'} element={<Login />}/>
           </Routes>
       </BrowserRouter>
    );
}

export default App;
