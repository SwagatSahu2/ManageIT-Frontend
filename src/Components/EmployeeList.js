import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import { BsPersonFillAdd } from "react-icons/bs";
import "../App.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name_asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const employeesPerPage = 9;

  useEffect(() => {
    fetchEmployees();
  }, []); 

  const fetchEmployees = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get('https://localhost:7133/api/Employee');
      setEmployees(response.data);
      filterEmployees(response.data, statusFilter, searchQuery, sortOption, currentPage);
    } catch (error) {
      console.error("There was an error fetching employees!", error);
      setErrorMessage('There was an error fetching the employee data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = (employeeList, filter, search, sort, page) => {
    let filteredList = employeeList;

    if (filter !== 'all') {
      filteredList = filteredList.filter(employee => (filter === 'active' ? employee.isActive === 1 : employee.isActive === 0));
    }

    if (search) {
      filteredList = filteredList.filter(employee =>
        employee.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'name_asc') {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name_desc') {
      filteredList.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'age_asc') {
      filteredList.sort((a, b) => a.age - b.age);
    } else if (sort === 'age_desc') {
      filteredList.sort((a, b) => b.age - a.age);
    }

    const startIndex = (page - 1) * employeesPerPage;
    const paginatedList = filteredList.slice(startIndex, startIndex + employeesPerPage);

    setFilteredEmployees(paginatedList);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7133/api/Employee/${id}`);
      fetchEmployees(); 
    } catch (error) {
      console.error("There was an error deleting the employee!", error);
      setErrorMessage('There was an error deleting the employee. Please try again.');
    }
  };

  const handleEdit = (employee) => {
    setIsEditing(true);
    setEditEmployee(employee);
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setEditEmployee(null); 
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    filterEmployees(employees, e.target.value, searchQuery, sortOption, currentPage); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterEmployees(employees, statusFilter, e.target.value, sortOption, currentPage); 
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    filterEmployees(employees, statusFilter, searchQuery, e.target.value, currentPage); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    filterEmployees(employees, statusFilter, searchQuery, sortOption, newPage);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
      <button
            className="hover-button"
            onClick={handleAddNew}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <BsPersonFillAdd />
          </button>
          {isHovered && (
            <div className="info-box">
              <p>Click here to add a new employee.</p>
            </div>
          )}
        <div>
          <select
            className="form-select"
            value={statusFilter}
            onChange={handleFilterChange}
            style={{ width: '200px' }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: '200px' }}
          />
          <select
            className="form-select"
            value={sortOption}
            onChange={handleSortChange}
            style={{ width: '200px' }}
          >
            <option value="name_asc">Sort by Name (A-Z)</option>
            <option value="name_desc">Sort by Name (Z-A)</option>
            <option value="age_asc">Sort by Age (Low to High)</option>
            <option value="age_desc">Sort by Age (High to Low)</option>
          </select>
        </div>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="row">
        {filteredEmployees.length === 0 && !loading ? (
          <div className="col-12 text-center">
            <p>No employees found.</p>
          </div>
        ) : (
          filteredEmployees.map(employee => (
            <div className="col-md-4 mb-4" key={employee.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{employee.name}</h5>
                  <p className="card-text">
                    Age: {employee.age}
                    <br />
                    Status: {employee.isActive === 1 ? 'Active' : 'Inactive'}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={filteredEmployees.length < employeesPerPage}
        >
          Next
        </button>
      </div>

      {isEditing && (
        <EmployeeForm
          fetchEmployees={fetchEmployees}
          employee={editEmployee}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default EmployeeList;
