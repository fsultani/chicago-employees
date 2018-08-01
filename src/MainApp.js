import React, { Component } from 'react';
import styled from 'styled-components'

import AllEmployees from './AllEmployees';

const Container = styled.div`
  text-align: center;
  margin: 10px auto;
  padding: 0;
  font-family: sans-serif;
`

const Header = styled.div`
  background: center no-repeat url('https://bondlinkcdn.com/128/Cloudgate_2-cropped.ioy2OWJ4Xz.jpg');
  background-size: contain;
  height: 150px;
  padding: 50px 0;
  width: 100%;
  display: table;
`

const Title = styled.div`
  font-size: 18px;
  color: white;
  margin: 0 auto;
  display: table-cell;
  vertical-align: middle;
`

const Body = styled.div`
  font-size: 16px;
  padding-bottom: 10px;
`

class MainApp extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>Welcome to Chicago</Title>
        </Header>
        <Body>
          <AllEmployees />
        </Body>
      </Container>
    );
  }
}

export default MainApp;
