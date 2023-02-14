import React from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";

const Adduser = () => {
  let navigate = useNavigate();

const initialValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
}
const validationSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  website: yup.string().required(),
});
  // const [user, setUser] = useState({
  //   name: "",
  //   username: "",
  //   email: "",
  //   phone: "",
  //   website: "",
  // });

  //const { name, username, email, phone, website } = user;

  // const onInputChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  const onSubmitValue = async (e) => {
    
    await axios.post("http://localhost:3001/users", e);
    navigate("/");
  };

  return (
    <div>
      <Formik  initialValues={initialValues} 
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmitValue(values);
         
        }}>
      {formik =>(
         <Form>
          <div>
         <Stack spacing={5}>
           <Box paddingTop={2}>
           
             <TextField
               label="Name"
               variant="outlined"
               size="small"
               name="name"
               value={formik.values.name}
               onChange={formik.handleChange}
               error={formik.touched.name && Boolean(formik.errors.name)}
               helperText={formik.touched.name && formik.errors.name}
             />
           </Box>
           <Box>
             <TextField
               variant="outlined"
               label="Username"
               size="small"
               type="text"
               name="username"
               value={formik.values.username}
               onChange={formik.handleChange}
               error={formik.touched.username && Boolean(formik.errors.username)}
               helperText={formik.touched.username && formik.errors.username}
             />
           </Box>
           <Box>
             <TextField
               variant="outlined"
               label="E-mail"
               size="small"
               type="text"
               name="email"
               value={formik.values.email}
               onChange={formik.handleChange}
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
             />
           </Box>
           <Box>
             <TextField
               variant="outlined"
               label="Phone No"
               size="small"
               type="text"
               name="phone"
               value={formik.values.phone}
               onChange={formik.handleChange}
               error={formik.touched.phone && Boolean(formik.errors.phone)}
               helperText={formik.touched.phone && formik.errors.phone}
             />
           </Box>
           <Box>
             <TextField
               variant="outlined"
               label="Website"
               size="small"
               type="text"
               name="website"
               value={formik.values.website}
               onChange={formik.handleChange}
               error={formik.touched.website && Boolean(formik.errors.website)}
               helperText={formik.touched.website && formik.errors.website}
             />
           </Box>
           <Stack style={{display:"inline-block"}}>
          
             <Button color="primary" variant="contained" type="submit"size="medium" >
               Submit
             </Button>
             <Button href="/" color="primary" variant="contained" type="submit" size="medium">
               Cancle
             </Button>
           </Stack>
         </Stack>
         </div>
       </Form>
      )}
      </Formik>
     
    </div>
  );
};

export default Adduser;
