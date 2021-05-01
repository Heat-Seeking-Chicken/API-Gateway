import React from 'react';

const SearchBar = (props) => (
  <div className = 'searchBar'>
    <input style = {{paddingLeft: '1em', marginRight: '1em'}}
      id="searchvalues"
      type="search"
      placeholder="Please enter a request..."
      value={props.inputName}
    />

    <button className="search" onClick = {() => {
      props.onEnter(document.getElementById('searchvalues').value)}}>
      Search
    </button>
  </div>
);

export default SearchBar;
