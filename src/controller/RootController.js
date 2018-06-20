import React, { Component } from 'react';
import '../style.css';
import HomeController from './HomeController';
import SearchController from './SearchController';
export default class RootController extends Component {
  render() {
    return (
      <div className="rootController">
          <SearchController />
      </div>
    );
  }
}
