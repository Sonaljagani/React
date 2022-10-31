import React,{ useState  } from 'react';
import "rsuite/dist/rsuite.min.css";
import { AutoComplete } from 'rsuite';

export default function NewRegform() {

    const [name, setName] = useState('');
    const [add, setAddress] = useState('');
    const [age, setAge] = useState(25);
    const [sub, setTopic] = useState('');
    const [checkedList, setCheckedList] = useState([]);
    const listData = [
        { id: "1", value: "Javascript" },
        { id: "2", value: "Python" },
        { id: "3", value: "Java" },
           
    ];
    const [gender, setGender] = useState('');

    const [dayList, setDayList] = useState([]);
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
       // setAge(e.target.value);
        setAge(age +1);
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
 const handleDay =(e) => {
  setDayList(e.target.value);
 }
        
          

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || add === '' || age === ''|| listData ===''|| gender ===''||dayData ==='') {
            setError(true);
            } else {
            setSubmitted(true);
            setError(false);
            }
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
        <h1>User Registration</h1>
        <form>
       <div>
       <label>Name</label>
        <input onChange={handleName} value={name} type="text" required/>
       </div>

       <div>
       <label>Address</label>
        <textarea onChange={handleAdd} value={add} type="text" />
       </div>

       <div>
       <label>Age</label>
        {/* <input onChange={handleAge} value={age} type="text"/> */}
        <button onClick={handleAge}> {age}</button> 
       </div>

       <div>
                
                <label>Subject</label>
                <select value={sub}
                onChange={handleTopicChange}>
                <option value="React">React</option>
                <option value="Angular">Angular</option>
                <option value="Vue">Vue</option>
                </select>
        </div>
        <div>
        <label>Select Programming Language</label>
          {listData.map((item, index) => {
            return (
              <div key={item.id}>
                <input type="checkbox"onChange={handleSelect} value={item.value}/>
                <label>{item.value}</label>
              </div>
            );
          })}
        </div>
        <div>
          <label>Gender</label>
          <input type="radio" value="Male" checked={gender === "Male"}
                  onChange={onChangeValue} /> Male
          <input type="radio" value="Female" checked={gender === "Female"}
                  onChange={onChangeValue}/> Female
          <input type="radio" value="Other" checked={gender === "Other"}
                  onChange={onChangeValue}/> Other
        </div>
      <div  style={{display: 'block', width: 650, paddingLeft: 500 }}>
        <label>Enter a week day</label>
        <AutoComplete data={dayData} onChange={handleDay} onSelect={setDayList}/>
      </div>
      <button color='red' onClick={handleSubmit}>Submit</button>
      
        </form>
        <div>
            <label>{addSuccess()}{errorMessage()}</label>
      </div>
    </div>
  )
}
