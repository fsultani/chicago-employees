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
  let department = [...new Set(data.map(d => d.department))]

  const handleChange = ({ target }) => {
    const department = target.value
    const filteredView = data.filter(d => d.department === department)
    onChange(filteredView)
  }

  return (
    <select onChange={handleChange}>
      <option value="all">ALL</option>
      {department.map(dept => <option value={dept}>{dept}</option>)}
    </select>
  )
}

export default (props => (
  <div>
  {console.log("props\n", props)}
    <Title>Filter by department</Title>
    <Container><FilterByDepartment {...props} /></Container>
  </div>
))
