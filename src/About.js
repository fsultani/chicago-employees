import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
`

const Field = styled.p`
  font-size: 16px;
  text-align: left;
`

class AboutEmployee extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      filteredView: null,
    }
  }
  componentDidMount() {
    const employeeId = document.location.pathname.split('/')[2]
    axios.get(`https://dt-interviews.appspot.com/${employeeId}`)
    .then(res => {
      this.setState({
        loading: false,
        ...res.data,
      })
    })
  }

  employeeDetails() {
    return (
      <Wrapper>
        <Field>
          ID: {this.state.id}
        </Field>
        <Field>
          Name: {this.state.name}
        </Field>
        <Field>
          Job Title: {this.state.job_titles}
        </Field>
        <Field>
          Salary: {this.state.employee_annual_salary}
        </Field>
        <Field>
          Department: {this.state.department}
        </Field>
      </Wrapper>
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
      <div>
        {this.state.loading &&
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
          />
        }
        {!this.state.loading &&
          <Container>
            <Row>
              {this.employeeDetails()}
            </Row>
          </Container>
        }
      </div>
    );
  }
}

export default AboutEmployee;
