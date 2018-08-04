import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import styled from 'styled-components'
import { Container, Row, Col } from 'react-grid-system';
import Lottie from 'react-lottie';
import * as animationData from './loader.json'
import axios from 'axios';

const Copy = styled.div`
  font-size: 18px;
  margin: 0 auto;
  padding: 10px 0;
  text-align: center;
`

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

class About extends Component {
  constructor(props) {
    super()
    this.state = {
      loading: true,
      totalCount: null,
      currentEmployeeId: parseInt(props.location.pathname.split('/')[2], 10)
    }
  }
  componentDidMount() {
    Promise.all([
      axios.get(`https://dt-interviews.appspot.com/${this.state.currentEmployeeId}`),
      axios.get('https://dt-interviews.appspot.com')
    ]).then(([ currentEmployee, totalCount ]) => {
      this.setState({
        loading: false,
        totalCount: totalCount.data.length,
        ...currentEmployee.data,
      })
    })
    window.addEventListener("keydown", event => {
      if (event.keyCode === 40) {
        if (this.state.totalCount === this.state.currentEmployeeId) {
          this.getEmployeeInfo(1)
        } else {
          this.getEmployeeInfo(this.state.currentEmployeeId + 1)
        }
      } else if (event.keyCode === 38) {
        if (this.state.currentEmployeeId === 1) {
          this.getEmployeeInfo(this.state.totalCount)
        } else {
          this.getEmployeeInfo(this.state.currentEmployeeId - 1)
        }
      } else if (event.keyCode === 13) {
        this.props.history.push({
          pathname: '/',
          state: {
            currentEmployeeId: this.state.currentEmployeeId,
          }
        })
        window.location.reload()
      }
    });
  }

  getEmployeeInfo = (employeeId) => {
    this.props.history.push(`/employee/${employeeId}`)
    axios.get(`https://dt-interviews.appspot.com/${employeeId}`)
    .then(res => {
      this.setState({
        loading: false,
        currentEmployeeId: employeeId,
        ...res.data,
      })
    })
  }

  employeeDetails() {
    return (
      <div>
        <Copy>
          <div>
            Use the up and down arrow keys to view the previous and next employee, respectively.
          </div>
          <div>
            To go back to the home page, simply press the Enter key.
          </div>
        </Copy>
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
      </div>
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
              <Col>
                {this.employeeDetails()}
              </Col>
            </Row>
          </Container>
        }
      </div>
    );
  }
}

export default withRouter(About);
