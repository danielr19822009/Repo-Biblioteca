import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaBook, FaUser, FaBuilding, FaHandHolding } from 'react-icons/fa'; // Importa íconos de react-icons
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AddLibro from './AddLibro'; // Ensure these components exist
import EditarLibro from './EditarLibro';
import AddUser from './AddUser';
import EditarUser from './EditarUsers';
import AddEditorial from './AddEditorial';
import EditarEditorial from './EditarEditorial';
import AddAutor from './AddAutor';
import EditarAutor from './EditarAutor';
import AddPrestamo from './AddPrestamo';
import EditarPrestamo from './EditarPrestamo';

import Login from './Login';

const Menu = () => {
  return (
    <Router>
      <div id='wrapper'>
        <Sidebar />
        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Topbar />
            <div className='container-fluid'>
              {/* Main Content */}
              <Routes>
                <Route path='/addlibro'    element={<AddLibro />} />
                <Route path='/editarlibro' element={<EditarLibro />} />

                <Route path='/adduser'    element={<AddUser />} />
                <Route path='/editaruser' element={<EditarUser />} />

                <Route path='/addeditorial' element={<AddEditorial />} />
                <Route path='/editareditorial' element={<EditarEditorial />} />

                <Route path='/addautor' element={<AddAutor />} />
                <Route path='/editarautor' element={<EditarAutor />} />

                <Route path='/addprestamo' element={<AddPrestamo />} />
                <Route path='/editarprestamo' element={<EditarPrestamo/>} />

                <Route path='/login' element={<Login />} />
                <Route path='/editaruser' element={<h1>Bienvenido a la aplicación</h1>} />

                
              </Routes>
              {/* More content */}
            </div>
          </div>

          {/* Footer */}
          <footer className='sticky-footer bg-white'>
            <div className='container my-auto'>
              <div className='copyright text-center my-auto'>
                <span>Copyright © Your Website 2024</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default Menu;
