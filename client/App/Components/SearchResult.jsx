import React from 'react';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Grow';

class SearchResult extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <Fade style = {{display: 'flex', flexDirection: 'column' }} in = {true} timeout = {this.props.timeout*1000} >
                <div>         
                    <button className = {'resultButton'} onClick = {(e) => this.props.selectButton(this.props.timeout-1)}>
                        <div style = {{color: 'white'}}><strong>Book Title: </strong>{this.props.book.title}</div>
                        <div style = {{color: 'white'}}><strong>Author: </strong>{this.props.book.author}</div>
                        <div style = {{wordWrap: 'break-word', color: 'white'}}><strong>API: </strong>{this.props.book.selfLink}</div>
                    </button>
                </div>
            </Fade>    
        )
    }
}

export default SearchResult

