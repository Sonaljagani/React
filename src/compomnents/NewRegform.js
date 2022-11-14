import React,{ useState  } from 'react';
//import Textarea from '@mui/joy/Textarea';
//import axios from 'axios';
import './mystyle.css'


import{ Button, FormControl,FormLabel,Box, RadioGroup, FormControlLabel, Radio,
Autocomplete,TextField,FormGroup,Checkbox,MenuItem,Select,Typography } from "@mui/material"
import axios from 'axios';


export default function NewRegform() {

  

    const [name, setName] = useState('');
    const [add, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [sub, setTopic] = useState('');
    const [checkedList, setCheckedList] = useState([]);
    const listData = [
        { id: "1", value: "Javascript" },
        { id: "2", value: "Python" },
        { id: "3", value: "Vue" },
           
    ];
    const [gender, setGender] = useState('');

    const [dayList, setDayList] = useState('');
    const dayData = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday']

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
      setName(e.target.value);
   
    };
    const handleAdd = (e) => {
        setAddress(e.target.value);
     
      };
      const handleAge = (e) => {
        setAge(e.target.value);
     
      };
      const handleTopicChange = (e) => {
        setTopic(e.target.value)
      };

      const handleSelect = (e) => {
        const value = e.target.value;
        // setCheckedList(e.target.checked);
        const isChecked = e.target.checked;

         
         if (isChecked) {
          //Add checked item into checkList
          setCheckedList([checkedList, value]);
        } else {
          //Remove unchecked item from checkList
          const filteredList = checkedList.filter((item) => item !== value);
          setCheckedList(filteredList);
        }
     
            };

        const onChangeValue =(e) => {
              setGender(e.target.value);
            }
//  const handleDay =(e) => {
//   
//   setDayList(e.target.value);
//  }

          

    const handleSubmit = (e) => {
        e.preventDefault();
        const body={name,add,age,sub,checkedList,gender,dayList};
        //axios.post(`http://localhost:3000/body?Name=${name}&Age=${age}&Address=${add}&Subject=${sub},Language=${checkedList},Gender=${gender}Day=${dayList}`)
        axios.post('https://jsonplaceholder.typicode.com/posts',body)
        .then(response  =>{
          console.log(response)
            
        })
        .catch(error =>{
          console.log(error)
            
        })
        
        // if (name === '' || add === '' || age === ''|| listData ===''|| gender ===''||dayData ==='') {
        //     setError(true);
        //     } else {
        //     setSubmitted(true);
        //     setError(false);
        //     }
      };

      const addSuccess = () => {
        return (
          <div 
          className="Sucess"
            style={{
              display: submitted ? '' : 'none',
            }}>
            <h1>My Name is {name}</h1>
            <h1>My Address {add}</h1>
            <h1>I am {age} Year old</h1>
            <h1>Mu fav subject is {sub} </h1>
            <h1>Language {checkedList}</h1>
            <h1>I am a {gender}</h1>
            <h1>Today is {dayList}</h1>
          </div>
        );
      };
      const errorMessage = () => {
        return (
        <div
            className="error"
            style={{
            display: error ? '' : 'none',
            }}>
            <h1>Please enter all the fields</h1>
        </div>
        );
    };

  return (
   
    <div>
      <header className='container-1'>
      <Typography variant='h4'>User Registration</Typography>
      </header>
        
        
      <FormControl class="flex-container">
        <div className='box-1'>
       <div>
       <FormLabel>Name</FormLabel>
       <TextField label='Name'variant='outlined'size='small' onChange={handleName} value={name} type="text"required/>
       </div>

        <div>
       <FormLabel >Address</FormLabel>
       <TextField label='Address'variant="outlined" size='small'onChange={handleAdd} value={add} type="text" />
        
       </div> 

       <div>
       <FormLabel>Age</FormLabel>
        <TextField label='Age'variant='outlined'size='small'onChange={handleAge} value={age} type="number"/>
       </div>

       <div>
       <Box>
       <FormLabel>Subject</FormLabel>             
           <Select sx={{ minWidth: 180 }} size='small' value={sub} label="Subject"
            onChange={handleTopicChange}>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Angular">Angular</MenuItem>
            <MenuItem value="Vue">Vue</MenuItem>
            </Select>
            </Box>
        </div>
        </div>
        <div className='box-2'>
          <div>
            <FormLabel>Select Programming Language</FormLabel>
              {listData.map((item, index) => {
              return (
                <div key={item.id}>
                <FormControl >
                  <FormGroup>
                    <FormControlLabel control={
                    <Checkbox onChange={handleSelect} value={item.value} />}
                  label={item.value}/>
                  </FormGroup>
               </FormControl>
              </div>
            );
              })}
        
          </div>
      
      </div>
      <div className='box-3'>  
       <div>
            <FormLabel>Gender</FormLabel>
            <RadioGroup>
              <FormControlLabel control={<Radio/>} label='Male'value="Male"
              checked={gender === "Male"}onChange={onChangeValue} ></FormControlLabel>
              
              <FormControlLabel control={<Radio/>} label='Female'value="Female"
              checked={gender === "Female"}onChange={onChangeValue}></FormControlLabel>

              <FormControlLabel control={<Radio/>} label='Other'value="Other"
             checked={gender === "Other"}onChange={onChangeValue} ></FormControlLabel>
            </RadioGroup>
       </div>
      <div>
        <FormLabel mb={3}>Day of week </FormLabel>
        <Autocomplete
        value={dayList}
        options={dayData}
        onChange={(event, NewValue) => setDayList(NewValue)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Enter a week day' />}
      />
     </div>
      </div>      
      </FormControl>
        <div style={{display: 'flex',justifyContent: 'center',}}>
              <Button  variant='contained'onClick={handleSubmit}>Submit</Button>
        </div>
        <div>
            <FormLabel>{addSuccess()}{errorMessage()}</FormLabel>           
        </div>
      
    </div>
    
  )
}

 


