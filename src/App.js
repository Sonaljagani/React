import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  
} from "react-router-dom";
import "./App.css";
import "./compomnents/appStyle.css";
import Home from "./compomnents/pages/Home";
import Navbar from "./compomnents/layout/Navbar";
import About from "./compomnents/pages/About";
import Contect from "./compomnents/pages/Contect";

import PageNotFound from "./compomnents/pages/PageNotFound";
import Adduser from "./compomnents/users/Adduser";

import EditUser from "./compomnents/users/EditUser";
import ViewUser from "./compomnents/users/ViewUser";
//import ResentQuotes from './compomnents/new'
//import NewoneRegform from './compomnents/NewoneRegForm'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
{/* 
           <NewoneRegform/>   */}
          <Navbar />
          <Routes>
   
            <Route exact path="/" element={<Home/>} />
           
            <Route exact path="/About" element={<About/>}></Route>
            <Route exact path="/Contect" element={<Contect/>}></Route>
            <Route exact path="/users/Adduser" element={<Adduser/>}></Route>
            <Route exact path="/users/Edituser/:id" element={<EditUser/>}></Route>
            <Route exact path="/users/:id" element={<ViewUser/>}></Route>
            
            <Route exact path="*" element={<PageNotFound/>}></Route>
           
            {/* <Navigate to="/" /> */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
