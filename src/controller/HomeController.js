import React, { Component } from 'react';
import '../style.css';

export default class HomeController extends Component {
  componentDidMount(){
    this.searchBar.focus();
  }
  onSearch(text){
    console.log("onSearch");
    console.log(text);
  }
  render() {
    return (
      <div className="homeController">
          <img className="searchLogo"  src="logo.svg"   onClick={this.props.logOut}  alt="" />
          <input onChange={(event) => this.onSearch(event.target.value)} ref = { element => this.searchBar = element} type="text" className="searchBar" placeholder={this.props.placeholder ? this.props.placeholder : "Search"} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
      </div>
    );
  }
}
