import React,{useState,useEffect} from 'react'

import axios from "axios";
import {useParams }from "react-router-dom";
import { Button,Stack,Box, } from '@mui/material';

const ViewUser=()=> {
  const {id} = useParams();
  const[user,setUser]=useState({
      name:"",
      username:"",
      email:"",
    });

    useEffect(() => {
      loaduser();
    },[]);

    const loaduser =async()=>{
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      setUser(response.data);
     }
   
  return (
    <Stack spacing={5}>
      <Box paddingTop={2}> 
      <Button href="/" variant="contained"> Back To Home</Button>
      </Box>

     <h1 style={{color: "cornflowerblue"}}>User Id:{id}</h1>
     <ul>
        <li >name :{user.name}</li>
        <li>User name :{user.username}</li>
        <li>email:{user.email}</li>
        <li>Phone no:{user.phone}</li>
        <li>Website:{user.website}</li>        
      </ul>
    </Stack>
    )
}
export default ViewUser
