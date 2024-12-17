import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ fetchEmployees, employee, setIsEditing }) => {
  const [name, setName] = useState(employee ? employee.name : '');
  const [age, setAge] = useState(employee ? employee.age : '');
  const [isActive, setIsActive] = useState(employee ? employee.isActive : 1);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setAge(employee.age);
      setIsActive(employee.isActive);
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const employeeData = {
      name,
      age,
      isActive,
    };
  
    if (employee) {
      if (!employee.id) {
        console.error("Employee ID is required for updating.");
        return;
      }
  
      employeeData.id = employee.id;  
  
      try {
        console.log("Updating employee with ID:", employee.id);
        const response = await axios.put(`https://localhost:7133/api/employee/${employee.id}`, employeeData);
        console.log('Employee updated successfully:', response.data);
        fetchEmployees(); 
        setIsEditing(false); 
      } catch (error) {
        console.error("There was an error updating the employee!", error);
      }
    } else {
      try {
        const response = await axios.post('https://localhost:7133/api/employee', employeeData);
        console.log('Employee added successfully:', response.data);
        fetchEmployees(); 
        setIsEditing(false); 
      } catch (error) {
        console.error("There was an error adding the employee!", error);
      }
    }
  };
  

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {employee ? 'Edit Employee' : 'Add New Employee'}
            </h5>
            <button type="button" className="btn-close" onClick={() => setIsEditing(false)} aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  className="form-select"
                  id="status"
                  value={isActive}
                  onChange={(e) => setIsActive(Number(e.target.value))}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {employee ? 'Save Changes' : 'Add Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
