import React,{useState} from "react";
//import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

import {
  Button,
  TextField,
  Typography,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,

  MenuItem,
  FormHelperText,
  RadioGroup,
  Radio,
  Autocomplete,
  Box,
  Table ,
  TableBody ,
  TableCell ,
  TableContainer ,
  TableHead ,
  TableRow ,
  Paper , 
  Stack,
  
  

} from "@mui/material";

//import {TableGrid} from "./Table";



const NewoneRegForm = () => {
  
  const listData = [
    { id: "1", value: "Javascript" },
    { id: "2", value: "Python" },
    { id: "3", value: "Vue" },
  ];

  const dayData = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),

    // birthdate: yup
    //   .date()
    //   .required()
    //   .test("age", "You must be 18 or older", function (birthdate) {
    //     const cutoff = new Date();
    //     cutoff.setFullYear(cutoff.getFullYear() - 18);
    //     return birthdate <= cutoff;
    //   }),

    checkedList: yup.array().min(1, "at least one must be selected"),
  });
  const initialValues = {
    name: "",
    add: "",
    birthdate: "",
    sub: "",
    checkedList: [],
    gender: "",
    dayList: "",
  };
  const StudentDto = {
    id:0,
    name: "",
    add: "",
    birthdate: "",
    sub: "",
    checkedList: "",
    gender: "",
    dayList: "",
  };
  const [studentData, setStudentData] = useState([]);
  
  
  
  const onSubmit = (values,onSubmitProps) => {
    
   console.log(StudentDto);
  
    StudentDto.name=values.name;
    StudentDto.add=values.add;
    StudentDto.birthdate=values.birthdate;
    StudentDto.sub=values.sub;
    StudentDto.checkedList=values.checkedList[0];
    StudentDto.gender=values.gender;
    StudentDto.dayList=values.dayList;

    //setStudentData([StudentDto]);
    setStudentData(oldArray => [...oldArray, StudentDto]);

    console.log(studentData);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    // try {
      
    //   axios.post("https://jsonplaceholder.typicode.com/posts", { values });
    // } catch (error) {
    //   console.log("Error...");
    // }
    // // axios.post("https://jsonplaceholder.typicode.com/posts", { values })
    // //     .then(response  =>{
    // //       console.log(response)
          
    // //     })
    // //     .catch(error =>{
          
    // //       console.log(error)
            
    // //     })

        
  };
  const deleteTableRows = (index)=>{
    const rows = [...studentData];
    rows.splice(index, 1);
    setStudentData(rows);
}
//const [isEdit, setEdit] = useState(false);
const  onUpdateStudent=(updatedStudent)=> {
  const updatedStudents = studentData.map(
    student => {
      if (student.id === updatedStudent.id) {
        return updatedStudent
      } else {return student}
    }
  )
  setStudentData(updatedStudents)
}
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  
  
  return (
    
    <Box>
      <Typography className="container-1" variant="h4">
        User Registration
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box className="flex-container">
          <Box className="box-1">
            <Box>
              <FormLabel className="label">Name</FormLabel>
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
            <Box>
              <FormLabel className="label">Address</FormLabel>
              <TextField
                label="Address"
                variant="outlined"
                size="small"
                id="add"
                name="add"
                value={formik.values.add}
                onChange={formik.handleChange}
                type="text"
              />
            </Box>
            <Box>
              <FormLabel className="label">age</FormLabel>
              <TextField
                type="date"
                name="birthdate"
                error={
                  formik.touched.birthdate && Boolean(formik.errors.birthdate)
                }
                helperText={formik.touched.birthdate && formik.errors.birthdate}
                onChange={formik.handleChange}
              />
            </Box>
            <Box>
              <FormLabel className="label">Subject</FormLabel>
              <TextField
                label="Subject"
                select
                sx={{ minWidth: 180 }}
                size="small"
                name="sub"
                value={formik.values.sub}
                onChange={formik.handleChange}
              >
                <MenuItem value="React">React</MenuItem>
                <MenuItem value="Angular">Angular</MenuItem>
                <MenuItem value="Vue">Vue</MenuItem>
              </TextField>
            </Box>
          </Box>
          <Box className="box-2">
            <Box>
              <FormLabel>Select Programming Language</FormLabel>
              {listData.map((item, index) => {
                return (
                  <div key={item.id}>
                    <FormControl>
                      <FormGroup name="checkedList">
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={formik.handleChange}
                              value={item.value}
                            />
                          }
                          label={item.value}
                          name="checkedList"
                        />
                      </FormGroup>
                    </FormControl>
                  </div>
                );
              })}
            </Box>

            <FormHelperText
              error={
                formik.touched.checkedList && Boolean(formik.errors.checkedList)
              }
            >
              {formik.touched.checkedList && formik.errors.checkedList}
            </FormHelperText>
          </Box>
          <Box className="box-3">
            <Box>
              <FormLabel>Gender</FormLabel>
              <RadioGroup name="gender">
                <FormControlLabel
                  control={<Radio />}
                  label="Male"
                  value="Male"
                  onChange={formik.handleChange}
                ></FormControlLabel>

                <FormControlLabel
                  control={<Radio />}
                  label="Female"
                  value="Female"
                  onChange={formik.handleChange}
                ></FormControlLabel>

                <FormControlLabel
                  control={<Radio />}
                  label="Other"
                  value="Other"
                  onChange={formik.handleChange}
                ></FormControlLabel>
              </RadioGroup>
            </Box>
            <Box>
              <FormLabel mb={3}>Day of week </FormLabel>
              <Autocomplete
                name="dayList"
                value={formik.values.dayList}
                options={dayData}
                onChange={(event, value) => {
                  formik.setFieldValue("dayList", value);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Enter a week day" />
                )}
              />
            </Box>
          </Box>
        </Box>
        <Stack spacing={2} direction="row">
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
      
       
          <Button color="primary" variant="contained"type='reset'onClick={formik.handleReset}>
            Reset
          </Button>
        </Stack>
        
      </form>
       {/*<TableGrid data={studentData}/> */}
      <Box>
      <TableContainer component={Paper}sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
          <TableCell padding="checkbox">
          <Checkbox
         
            color="primary"
            
            
          />
        </TableCell>
          <TableCell align="right">Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Date of Birth</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">Language</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Day</TableCell>
           
     
          </TableRow>
        </TableHead>
        <TableBody>
          {studentData&& studentData.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               <Checkbox/>
              </TableCell>
              
              <TableCell align="right">{i+1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.add}</TableCell>
              <TableCell align="right">{row.birthdate}</TableCell>
              <TableCell align="right">{row.sub}</TableCell>
              <TableCell align="right">{row.checkedList}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.dayList}</TableCell>
              <TableCell align='right'><Tooltip title="Edit"><EditIcon onClick={onUpdateStudent} /></Tooltip></TableCell>
              
              <TableCell align="right"> <Tooltip title="Delete"><DeleteIcon onClick={deleteTableRows}/></Tooltip></TableCell>
         
              
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    
 
  );
          }
export default NewoneRegForm;
