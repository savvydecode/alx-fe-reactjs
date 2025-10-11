import { useState } from 'react'
import HomePage from './components/HomePage'
import RecipeDetail from './components/RecipeDetail';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/recipe/:clientId" element={<RecipeDetail />} />
        <Route path='/add-recipe' element={<AddRecipeForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
export default App
