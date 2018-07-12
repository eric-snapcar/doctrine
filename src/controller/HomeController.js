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
          <input
          value={this.props.searchText}
          onChange={(event) =>
            {
                let searchText = event.target.value;
                this.props.onChange(searchText);
            }
          }
          ref = { element => this.searchBar = element}
          placeholder={this.props.placeholder ? this.props.placeholder : "Search"}
          type="text" className="searchBar" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
      </div>
    );
  }
}
