import React, { Component } from 'react';
import '../style.css';

export default class SearchController extends Component {
  componentDidMount(){
    this.searchBar.focus();
  }
  onChangeSearchBar(text){
    console.log("onSearch");
    console.log(text);
  }
  render() {
    return (
      <div className="searchController">
          <div className="searchControllerTopBar">
              <img className="searchLogo"  src="logo.svg"   onClick={this.props.logOut}  alt="" />
              <input onChange={(event) => this.onChangeSearchBar(event.target.value)} ref = { element => this.searchBar = element} type="text" className="searchBar" placeholder={this.props.placeholder ? this.props.placeholder : "Search"} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
          </div>
      </div>
    );
  }
}
