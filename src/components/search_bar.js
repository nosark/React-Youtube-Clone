import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};
  }
  render() {
    return (
      <div className="search-bar">
        <input onChange={event => this.onInputChange(event.target.value)}/>
      </div>
    );
  }
  //searches for new value using callback from app
  onInputChange(term) {
    this.setState({term: term});
    this.props.onSearchTermChanged(term);
  }
}

export default SearchBar;
