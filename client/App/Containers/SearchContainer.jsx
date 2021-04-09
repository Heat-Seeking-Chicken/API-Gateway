import React from 'react';
import SearchBar from '../Components/SearchBar.jsx';
import SearchResult from '../Components/SearchResult.jsx';
import Fade from '@material-ui/core/Grow';
import LinearProgress from '@material-ui/core/LinearProgress';

class SearchContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      books: [],
      showSnippet: false,
      loading: false,
    }

    this.performSearch = this.performSearch.bind(this)
  }
  
  // Request books from backend
  performSearch(string){
    // If search bar has an empty string, return an alert to user
    if(!string) return alert('Please type search term in the search bar')
    
    // Instantiate loading bar and hide code snippet if visible
    this.setState({loading: true, showSnippet: false, books: []});


    // Process string to make a valid request to the backend
    let tempArray = string.split(' ').filter(el => el !== '');
    let updatedString = tempArray.join('+')
    const sendObj = {"updatedString":updatedString}

    let requestBody = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendObj)
    };

    // Start fetch request, set results to books.
    fetch('/search', requestBody) 
    .then(response => response.json())
    .then(data => this.setState({books : data,loading: false}))
    .catch(err => console.log(err));
  }

  // Update code snippet when book is selected
  selectButton(id) {
    this.setState({
      codeSnippetObj: this.state.books[id].apiData,
      showSnippet: true})
  }

  // UI Functions: Search Results and Code Snippet views
  searchResults () {
    // Create search result component for each book found. 
    const rowsArray = [];
    for (let i = 0; i < this.state.books.length; i++){
      rowsArray.push(<SearchResult key = {i} selectButton = {(e) => this.selectButton(e)} timeout = {i+1} book={this.state.books[i].formattedData}/>)
    }

    return(
      <div style = {{display: 'flex', flex: 1, flexDirection: 'column'}}>
        <strong style = {{alignSelf: 'center'}} >Search Results: </strong> 
        {rowsArray}
      </div>
    );
  }

  codeSnippetView(){
    return(
      <Fade in = {this.state.showSnippet} timeout = {1000} >
        <div style = {{display: 'flex', flex: 2, flexDirection: 'column'}}>
              <strong style = {{alignSelf: 'center'}}>API Returned Object: </strong> 
              <pre className ='codeSnippet'>
                <code>
                  {JSON.stringify(this.state.codeSnippetObj, null, 2)}
                </code>
              </pre>
        </div>
      </Fade>
    )
  }
  
  render(){
    
      return(
        <div className='searchcontainer'>
          {/* Search Bar */}
          <SearchBar onEnter={this.performSearch} />

          {/* Loading Bar displays during fetch request to backend */}
          {this.state.loading?
            <div style = {{height: 100, justifyContent: 'center', marginTop: '25%'}}>
              <LinearProgress />
            </div>
          :
          <div />}
          
          {/* Search Results and codesnippet show only after books are populated in state  */}
          {this.state.books.length > 0?
            <div style = {{marginTop: '1em', display: 'flex', flexDirection: 'row',}}> 
              {/*Search Results*/}
              {this.searchResults()}

              {/* Code Snippet */}
              {this.codeSnippetView()}
             
            </div>
          :
          <div />}
        
        </div>
      )
  }
}

export default SearchContainer