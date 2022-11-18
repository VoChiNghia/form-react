
import './App.css';
import AddStudent from './component/AddStudent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import React, { Component } from 'react'

export default class App extends Component {
 
  render() {
    return (
      <div className="container">
      <AddStudent/>
     
    </div>
    )
  }
}
