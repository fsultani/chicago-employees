import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system';

const Title = styled.div`
  padding: 10px 0;
  font-size: 18px;
`

const Label = styled.div`
  width: 100%;
  padding: 10px 0 0;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  cursor: pointer;
`

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

class AddEmployee extends Component {
  constructor(props) {
    super()
    this.state = {
      firstname: null,
      lastname: null,
      title: null,
      salary: null,
      department: null,
    }
  }

  handleFirstName = event => {
    this.setState({ firstname: event.target.value.toUpperCase() })
  }

  handleLastName = event => {
    this.setState({ lastname: event.target.value.toUpperCase() })
  }

  handleTitle = event => {
    this.setState({ title: event.target.value.toUpperCase() })
  }

  handleSalary = event => {
    this.setState({ salary: event.target.value.toUpperCase() })
  }

  handleDepartment = event => {
    this.setState({ department: event.target.value.toUpperCase() })
  }

  handleSubmit = event => {
    event.preventDefault()
    const fullName = `${this.state.firstname} ${this.state.lastname}`
    const salaryAmount = parseInt(this.state.salary, 10)

    axios({
      method: 'post',
      url: 'https://dt-interviews.appspot.com/',
      data: {
        name: fullName,
        department: this.state.department,
        employee_annual_salary: salaryAmount,
        job_titles: this.state.title,
      },
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    }).then(res => {
      if (res.status === 201) {
        window.alert(`You have successfully added ${fullName} to the database.  Click OK to be redirected back to the main page.`)
        this.props.history.push('/')
      }
    }).catch(err => {
      window.alert(`There was an error: ${err}`)
    })
  }
  render() {
    return (
      <Wrapper>
      <Title>Add new employee</Title>
      <form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={6} lg={6}>
            <Label>
              First name
            </Label>
            <input type="text" value={this.state.firstname} onChange={this.handleFirstName} required/>
          </Col>
          <Col md={6} lg={6}>
            <Label>
              Last name
            </Label>
            <input type="text" value={this.state.lastname} onChange={this.handleLastName}  required/>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={6}>
            <Label>
              Title
            </Label>
            <input type="text" value={this.state.title} onChange={this.handleTitle} required/>
          </Col>
          <Col md={6} lg={6}>
            <Label>
              Salary
            </Label>
            <input type="text" value={this.state.salary} onChange={this.handleSalary} required/>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={6}>
            <Label>
              Department
            </Label>
            <input type="text" value={this.state.department} onChange={this.handleDepartment} required/>
          </Col>
        </Row>
        <SubmitButton type="submit">
          Submit
        </SubmitButton>
        </form>
      </Wrapper>
    );
  }
}

export default AddEmployee;
