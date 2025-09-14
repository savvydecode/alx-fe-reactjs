import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList.jsx';
import AddRecipeForm from './components/AddRecipeForm.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';

function Home() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '40px auto',
        padding: '0 16px',
      }}
    >
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, borderBottom: '1px solid #ddd', marginBottom: 16 }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 600 }}>
          Home
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="*" element={<div style={{ padding: 16 }}>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;