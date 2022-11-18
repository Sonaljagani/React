import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  Typography,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  Radio,
  Autocomplete,
  Box,
} from "@mui/material";
import { Header } from "rsuite";

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

    birthdate: yup
      .date()
      .required()
      .test("age", "You must be 18 or older", function (birthdate) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return birthdate <= cutoff;
      }),

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
  const onSubmit = (values) => {
    try {
      axios.post("https://jsonplaceholder.typicode.com/posts", { values });
      
    } catch (error) {
      console.log("Error...");
    }
  };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  return (
    <Box>
      <Header className="container-1">
        <Typography variant="h4">User Registration</Typography>
      </Header>

      <form onSubmit={formik.handleSubmit} >
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
            <Select
              sx={{ minWidth: 180 }}
              size="small"
              name="sub"
              value={formik.values.sub}
              label="Subject"
              onChange={formik.handleChange}
            >
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Angular">Angular</MenuItem>
              <MenuItem value="Vue">Vue</MenuItem>
            </Select>
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
            {formik.errors.checkedList}
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
        <Box style={{paddingTop: '500px'}}>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
            </Box>
       
      </form>
    </Box>
  );
};
export default NewoneRegForm;
