import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeList from './Components/EmployeeList';
import manageIT from './Assets/ManageIT.png';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <img src={manageIT} style={{ width: '35px', height: 'auto' }}></img>
          <a className="navbar-brand" href="#" style={{margin:'10px'}}>ManageIT</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#employees">Employees</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <EmployeeList />
      </div>
      <footer className="footer mt-auto py-3 text-black">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Email:</strong> <a href="mailto:support@manageit.com" className="text-white">support@manageit.com</a>
                </li>
                <li>
                  <strong>Phone:</strong> <a href="tel:+919555678890" className="text-white">+91 955 567 8890</a>
                </li>
                <li>
                  <strong>Address:</strong> ManageIT Pvt Ltd Prestige Shantiniketan Tower A, 19th Floor ITPL Main Road, Whitefield, Bengaluru, Karnataka 560048 India
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>Welcome to the ManageIT! Our goal is to provide a simple and efficient system to manage employee data in a company or organization. This platform is designed to streamline the core functions of managing employee information, such as creating, reading, updating, and deleting employee records , ensuring that HR and administrative teams can easily keep track of employees' essential informations.</p>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://facebook.com" className="text-white">Facebook</a>
                </li>
                <li>
                  <a href="https://twitter.com" className="text-white">Twitter</a>
                </li>
                <li>
                  <a href="https://linkedin.com" className="text-white">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center py-2">
          <small>&copy; 2024 ManageIT. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
