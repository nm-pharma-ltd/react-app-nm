import React, { useState } from 'react';

const EmployeeTable = ({ employees, onEmployeeChecked }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Add to Team</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => onEmployeeChecked(employee.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TeamForm = () => {
  const [teamName, setTeamName] = useState('');
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Smith', position: 'Designer' },
    // ... Add more employees here ...
  ]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleEmployeeChecked = (employeeId) => {
    // Check if the employeeId is already in selectedEmployees array
    const isSelected = selectedEmployees.includes(employeeId);

    if (isSelected) {
      // If it's already selected, remove it from the list
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      // If it's not selected, add it to the list
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const handleSave = () => {
    // Here, you can use the selectedEmployees array to do whatever you want with the selected employees.
    // For example, you can send them to the server or update the state to reflect the changes.

    // Reset the selectedEmployees array after saving if needed
    setSelectedEmployees([]);
  };

  return (
    <div>
      <h1>Add New Team</h1>
      <label>
        Team Name:
        <input type="text" value={teamName} onChange={handleTeamNameChange} />
      </label>

      <EmployeeTable employees={employees} onEmployeeChecked={handleEmployeeChecked} />

      <button onClick={handleSave}>Save & Upload</button>
      <button>Cancel</button>
    </div>
  );
};

export default TeamForm;
