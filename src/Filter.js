import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import axios from 'axios';

class AllEmployees extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      filteredView: null,
    }
  }
  componentDidMount() {
    axios.get('https://dt-interviews.appspot.com')
    .then(res => this.setState({
      loading: false,
      data: res.data,
      filteredView: res.data,
    }))
  }

  handleChange = (event) => {
    const department = event.target.value
    const filteredView = this.state.data.filter(d => d.department === department)
    // filteredView.length > 0 ?
    // this.setState({ filteredView }) :
    // this.setState({ filteredView: this.state.data })
  }

  filterByDepartment() {
    let department = [...new Set(this.props.data.map(d => d.department))]
    return (
      <select onChange={this.handleChange}>
        <option value="all">ALL</option>
        {department.map(dept => <option value={dept}>{dept}</option>)}
      </select>
    )
  }

  render() {
    return (
      <div>
        <div>Filter by department</div>
        <div>{this.filterByDepartment()}</div>
      </div>
    );
  }
}

export default AllEmployees;
