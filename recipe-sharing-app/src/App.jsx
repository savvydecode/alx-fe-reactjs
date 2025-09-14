import { useState } from 'react'
import RecipeList from './components/RecipeList.jsx';
import AddRecipeForm from './components/AddRecipeForm.jsx';
function App() {

  return (
    <div style={{
      maxWidth: "720",
      margin: '40px auto',
      padding: '0 16px'
    }}>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  )
}

export default App;
