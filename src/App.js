import React, {useState} from 'react';
import './App.scss';
import axios from 'axios';
import Recipe from './components/Recipe';
import {v4 as uuidv4} from 'uuid';
import Alert from './components/Alert';
const App = () => {
  const [query, setQuery] = useState("");// set query to empty string
// create new piece of state for recieps 
  const [recipes, setRecipes] = useState([]);  
  const [alert, setAlert] = useState("");
  const APP_ID = "52db9c81";
  const APP_KEY = "1eaa6a1935bb6b385adbab50ba6f0ab0";
/* in q we have to change it dynamically 
we need to grab the value that will be written & make it query 
so the query will be a piece of data that will be updated 
setQuery will be the method that will be used to update this piece of data 
=> to grab value from input field we need onChange 
*/  
  const url = `https://api.edamam.com/search?q=${query}& 
  app_id=${APP_ID}&
  app_key=${APP_KEY}`;
  const getData = () => {
/* we'll use if statement here 
we want to execute this block of code if query doesn't equal to empty string */    
    if(query !== ""){
      axios.get(url)
      .then(result => {
        if(!result.data.more){
          return setAlert('no food with such name');
        } else{
          setAlert('')
          console.log(result);
          setRecipes(result.data.hits);
        }
      })
    }else{
      setAlert('Please fill the form') // update the alert message if query is empty
    }
  }

  const onChange = e => {
    setQuery(e.target.value)
  }
  const onSubmit = e => {
    e.preventDefault();
    getData();
    setQuery(''); // once we submit the form  i want to clear the input field 
  }
  return (
    <div className="container">
      <h1>food searching app</h1>
      <form className="row search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert}/>} {/* to get the msg fro state pass it here */}
        <div className = "col-sm-8">
          <input 
            type = "text" 
            value = {query}
            placeholder = "Search Food" 
            autoComplete = "off"
            onChange = {onChange}/>
        </div>
        <div className = "col-sm-4">
          <input 
            type = "submit" 
            value = "search"/>
        </div>
      </form>
      <div className=" row recipes">
{/* we use conditional statement & check if recipes array is empty or not 
if it's not empty it means that we have to recieve the data that we have requested 
so as the condition we need to insert recipes not equal to empty array */}
        {recipes !== [] && recipes.map(recipe => 
          <Recipe recipe={recipe} key={uuidv4()} />)}
      </div>
    </div>
  );
}
export default App;