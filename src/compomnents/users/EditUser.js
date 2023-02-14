import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const { name, username, email, phone, website } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/users/${id}`, user);
    navigate("/");
  };
  const loaduser = async () => {
    const result = await axios.get(`http://localhost:3001/users/${id}`);
    setUser(result.data);
  };
  useEffect(() => {
    loaduser();
  }, []);
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <Stack spacing={5}>
          <Box paddingTop={2}>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              label="Username"
              size="small"
              type="text"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              label="E-mail"
              size="small"
              type="text"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              label="Phone No"
              size="small"
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => onInputChange(e)}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              label="Website"
              size="small"
              type="text"
              name="website"
              value={website}
              onChange={(e) => onInputChange(e)}
            />
          </Box>
          <Stack style={{ display: "inline-block" }}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="medium"
            >
              Submit
            </Button>
            <Button
              href="/"
              color="primary"
              variant="contained"
              type="submit"
              size="medium"
            >
              Cancle
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default EditUser;
