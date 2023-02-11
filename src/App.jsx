import React,{useEffect, useState} from "react";
import {Container , AppBar, Typography,Grow , Grid,Button} from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar";
import useStyles from './styles'
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <Container maxWidth='lg'>
      <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
      </Router>
    </Container>
  );
}

export default App;
