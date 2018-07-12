import React, { Component } from 'react';
import '../style.css';
import HomeController from './HomeController';
import SearchController from './SearchController';
export default class RootController extends Component {
  constructor(props){
    super(props);
    this.state = {searchText:null};
  }
  render() {
    return (
      <div className="rootController">
      { this.state.searchText != null && this.state.searchText.length > 0 ?
        <SearchController initialSearchText={this.state.searchText}/>
        :   <HomeController onType={(searchText)=> this.setState({searchText:searchText})} searchText={this.state.searchText} />
      }
      </div>
    );
  }
}
