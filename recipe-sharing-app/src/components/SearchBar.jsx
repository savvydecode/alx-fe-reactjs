import React from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
    const searchTerm = useRecipeStore((s) => s.searchTerm);
    const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

    const onChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={onChange}
            aria-label="Search recipes"
            style={{ padding: 8, width: '100%', maxWidth: 480, margin: '8px 0' }}
        />
    );
};

export default SearchBar;