import React, { Component } from 'react';
import styled from 'styled-components'
import { Container, Row, Col } from 'react-grid-system';
import Lottie from 'react-lottie';
import * as animationData from './wakeup_speaking.json'

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
  cursor: pointer;
  transition: opacity 150ms ease;
`

class AllEmployees extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    axios.get('https://dt-interviews.appspot.com')
    .then(res => this.setState({
      loading: false,
      employees: res.data
    }))
  }

  employee(emp) {
    return emp.map(e =>
      <Col sm={4}>
        <Wrapper>
          {e.name}
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
        <Row>
        {this.state.loading &&
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
          />
        }
          {!this.state.loading && this.employee(this.state.employees)}
        </Row>
      </Container>
    );
  }
}

export default AllEmployees;
