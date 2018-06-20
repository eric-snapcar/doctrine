import React, { Component } from 'react';
import '../style.css';

export default class SearchController extends Component {
  render() {
    return (
      <div className="searchController">
          <input type="text" id="searchBar" placeholder={this.props.placeholder ? this.props.placeholder : "Search"} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
      </div>
    );
  }
}
