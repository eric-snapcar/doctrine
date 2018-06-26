import React, { Component } from 'react';
import '../style.css';
import SearchService  from '../service/SearchService';
export default class SearchController extends Component {
  componentDidMount(){
    this.searchBar.focus();
  }
  onSearch(text){
    SearchService.search(text,(searchResult,error)=>{
      if(error != null){
        console.log("onSearch error");
        console.log(error );
      }else {
        console.log("onSearch OK");
        console.log(searchResult);
      }
    });
  }
  render() {
    return (
      <div className="searchController">
          <div className="searchControllerTopBar">
              <img className="searchLogo"  src="logo.svg"   onClick={this.props.logOut}  alt="" />
              <input onChange={(event) => this.onSearch(event.target.value)} ref = { element => this.searchBar = element} type="text" className="searchBar" placeholder={this.props.placeholder ? this.props.placeholder : "Search"} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
          </div>
      </div>
    );
  }
}
