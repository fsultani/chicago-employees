import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-grid-system';
import Lottie from 'react-lottie';
import * as animationData from './loader.json'
import axios from 'axios';

import Filter from './Filter';

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

  handleChange = (option) => {
    option.length > 0 ?
    this.setState({ filteredView: option }) :
    this.setState({ filteredView: this.state.data })
  }

  handleKeyPress = (e) => {
    const link = document.getElementsByClassName('Link')
    let targetId = parseInt(e.target.id, 10)

    // Keyboard navigation for desktop view only
    if (window.innerWidth > 992) {
      switch(e.keyCode) {
        case 39:
          targetId === this.state.filteredView.length - 1 ?
          link[0].focus() :
          link[targetId + 1].focus()
          break;
        case 37:
          targetId === 0 ?
          link[this.state.filteredView.length - 1].focus() :
          link[targetId - 1].focus()
          break;
        case 40:
          (
            targetId === this.state.filteredView.length - 1 ||
            targetId === this.state.filteredView.length - 2 ||
            targetId === this.state.filteredView.length - 3
          ) ?
          link[0].focus() :
          link[targetId + 3].focus()
          break;
        case 38:
          targetId === 0 || targetId === 1 || targetId === 2 ?
          link[this.state.filteredView.length - 1].focus() :
          link[targetId - 3].focus()
          break;
        default:
          break;
      }
    }
  }

  listOfEmployees() {
    return this.state.filteredView.map((employee, index) =>
      <Row
        style={{display: 'contents'}}
        onKeyDown={this.handleKeyPress}
        tabIndex="0"
      >
        <Col md={6} lg={4}>
          <Link
            to={`/employee/${employee.id}`}
            style={{textDecoration: 'none', color: 'black'}}
            className="Link"
            id={index}
          >
            <Wrapper>
              <Name>
                {employee.name}
              </Name>
              <JobTitle>
                {employee.job_titles}
              </JobTitle>
            </Wrapper>
          </Link>
        </Col>
      </Row>
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
                <Filter
                  data={this.state.data}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row>
              {this.listOfEmployees()}
            </Row>
          </Container>
        }
      </Container>
    );
  }
}

export default AllEmployees;
