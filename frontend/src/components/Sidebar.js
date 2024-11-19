import React from 'react';
import { Link } from 'react-router-dom';


import "../css/sb-admin-2.css";
import "../css/sb-admin-2.min.css";


const Sidebar = () => {
    return (
        <body id="page-top">
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        Biblio`Cloud SM</div>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />

                {/* Nav Items */}
                <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Metricas</span>
                    </Link>
                </li>
                <hr className="sidebar-divider" />


                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Users</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/AddUser">Add Users</Link>
                            <Link className="collapse-item" to="/EditarUser">Mostrar Users</Link>
                        </div>
                    </div>
                </li>
                <hr className="sidebar-divider" />

                {/* Nav Items */}

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#Autores"
                        aria-expanded="true" aria-controls="Autores">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Autores</span>
                    </a>
                    <div id="Autores" className="collapse" aria-labelledby="headingAutores"
                        data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/AddAutor">Add Autor</Link>
                            <Link className="collapse-item" to="/EditarAutor">Mostrar Autor</Link>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider" />





                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#Editorial"
                        aria-expanded="true" aria-controls="Editorial">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Editoriales</span>
                    </a>
                    <div id="Editorial" className="collapse" aria-labelledby="headingEditorial"
                        data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/AddEditorial">Add Editorial</Link>
                            <Link className="collapse-item" to="/EditarEditorial">Mostrar Editorial</Link>
                        </div>
                    </div>
                </li>
                <hr className="sidebar-divider" />
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Libros</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/AddLibro">Add Libro</Link>
                            <Link className="collapse-item" to="/EditarLibro">Mostrar Libros</Link>
                        </div>
                    </div>
                </li>



                <hr className="sidebar-divider" />





                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#prestamo"
                        aria-expanded="true" aria-controls="prestamo">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Prestamos</span>
                    </a>
                    <div id="prestamo" className="collapse" aria-labelledby="headingPrestamo"
                        data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/AddPrestamo">Add Prestamo</Link>
                            <Link className="collapse-item" to="/EditarPrestamo">Mostrar Prestamo</Link>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages"
                        aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Admin</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/login">Login</Link>
                            <Link className="collapse-item" to="/register">Register</Link>
                            <Link className="collapse-item" to="/forgot-password">Forgot Password</Link>
                            <div className="collapse-divider"></div>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider" />

                <div class="text-center d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>

                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </ul>


        </body>
    );
};



export default Sidebar;
