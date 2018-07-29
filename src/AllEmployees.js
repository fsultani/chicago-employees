import React, { Component } from 'react';
import styled from 'styled-components'
import { Container, Row, Col } from 'react-grid-system';
import Lottie from 'react-lottie';
import * as animationData from './loader.json'

import axios from 'axios';

const Wrapper = styled.div`
  width: 100%;
  background: #D3D3D3;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50px;
  margin: 10px 0;
  padding: 10px 0;
  cursor: pointer;
  transition: opacity 150ms ease;
`

const Name = styled.h1`
  font-size: 16px;
`

const JobTitle = styled.p`
  font-size: 12px;
`
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
    filteredView.length > 0 ?
    this.setState({ filteredView }) :
    this.setState({ filteredView: this.state.data })
  }

  filterByDepartment() {
    let department = [...new Set(this.state.data.map(d => d.department))]
    return (
      <select onChange={this.handleChange}>
        <option value="all">ALL</option>
        {department.map(dept => <option value={dept}>{dept}</option>)}
      </select>
    )
  }

  listOfEmployees() {
    return this.state.filteredView.map(e =>
      <Col sm={4}>
        <Wrapper>
          <Name>
            {e.name}
          </Name>
          <JobTitle>
            {e.job_titles}
          </JobTitle>
        </Wrapper>
      </Col>
    )
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    return (
      <Container>
        {!this.state.loading &&
          <div>
            <div>Filter by department</div>
            <div>{this.filterByDepartment()}</div>
          </div>
        }
        <Row>
        {this.state.loading &&
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
          />
        }
        {!this.state.loading && this.listOfEmployees()}
        </Row>
      </Container>
    );
  }
}

export default AllEmployees;
