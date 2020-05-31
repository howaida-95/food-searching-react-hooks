import React, {useState} from 'react';
import RecipeDetails from './RecipeDetails';
const Recipe = ({recipe}) => {
// it'll be boolean value & it'll help us to create something like toggle 
  const [show, setShow] = useState(false);  
// destructure different properties from recipe 
  const {label, image, url, ingredients} = recipe.recipe;
  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="recipe">
        <h2>{label}</h2>
        <img src={image} alt ={label}/>
  {/* once we click the url i want to open a new tab in the browser 
  and for that i need to use a target attribute and it should set to _blank 
  rel here solve security issues */}      
        <a href={url} target="_blank" rel="noopener noreferrer">URL</a>
        <button onClick={() => setShow(!show)}>Ingredients</button>
  {/* we need to display the recipe details if the show is set to true 
  so we need condition here 
  ==> && if first part true then display the 2nd part*/}      
        {show && <RecipeDetails ingredients={ingredients}/>}
      </div>
    </div>
  );
}

export default Recipe;