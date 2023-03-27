import React, { Component } from 'react';
import axios from 'axios';

export default class RecipeList extends Component {
  constructor(props) {
    super(props);
  
  }

  //componentDidMount() {}

  render() {
    return (
      <div>
        <p>Home</p>
        {this.props.userName ? <div>Hello {this.props.userName}</div> : <div>no one logged in</div>}
      </div>
    )
  }
}