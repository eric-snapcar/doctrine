import React, { Component } from 'react';
import '../style.css';
import HomeController from './HomeController';
export default class RootController extends Component {
  render() {
    return (
      <div className="rootController">
          <HomeController />
      </div>
    );
  }
}
