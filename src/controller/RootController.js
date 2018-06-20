import React, { Component } from 'react';
import '../style.css';
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
