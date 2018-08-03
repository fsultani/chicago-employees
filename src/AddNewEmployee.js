import React from 'react';
import styled from 'styled-components'

const Title = styled.div`
  padding: 10px 0;
  font-size: 18px;
`

const Container = styled.div`
  padding: 0;
  margin: 0 auto;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 6px;
  width: 160px;
  cursor: pointer;
  display: inline-block;
  position: relative;

  &::after {
    position: absolute;
    content: "\\25BC";
    font-size: 12px;
    line-height: 1;
    right: 16px;
    top: 50%;
    margin-top: -6px;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 10px;
    cursor: pointer;
    width: 100%;
    border: none;
    box-shadow: none;
    background: transparent;
    background-image: none;
  }
`

const FilterByDepartment = ({ data, onChange }) => {
  return (
    <select>
      <option value="all">ALL</option>
    </select>
  )
}

export default (props => (
  <div>
    <Title>Add new employee</Title>
    <Container><FilterByDepartment /></Container>
  </div>
))
