import React from 'react';

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
    <div>Filter by department</div>
    <div><FilterByDepartment {...props} /></div>
  </div>
))
