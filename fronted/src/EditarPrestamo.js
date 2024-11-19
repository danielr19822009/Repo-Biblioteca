import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";

function Editar_Prestamos() {

    const [idprestamo, setidprestamo] = useState("");
    const [usuario, setusuario] = useState("");
    const [libro, setlibro] = useState("");
    const [estado, setestado] = useState("");
    const [fechaprestamo, setFechaPrestamo] = useState("");
    const [fechadevolucion, setFechaDevolucion] = useState("");

    const [listalibros, setListaLibros] = useState([]);
    const [listusuarios, setListaUsuarios] = useState([]);
    const [listaprestamos, setListaPrestamos] = useState([]);

    // Fetch Prestamos
    const getPrestamos = () => {
        Axios.get("http://localhost:3001/get_prestamos")


            .then((response) => {
                console.log("Prestamos obtenidos:", response.data);
                setListaPrestamos(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los prestamos:", error);
            });
    };

    // Fetch Usuarios
    const getUsuarios = () => {
        Axios.get("http://localhost:3001/get_users")
            .then((response) => {
                console.log("Usuarios obtenidos:", response.data);
                setListaUsuarios(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los usuarios:", error);
            });
    };

    // Fetch Libros (if needed)
    const getLibros = () => {
        Axios.get("http://localhost:3001/get_libros")
            .then((response) => {
                console.log("Libros obtenidos:", response.data);
                setListaLibros(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los libros:", error);
            });
    };

    // Delete Prestamo
const deletePrestamo = (idprestamo) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Axios.delete(`http://localhost:3001/delete_prestamo/${idprestamo}`)
                .then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    getPrestamos(); // Actualiza la lista de autores después de la actualización

                })
                .catch((error) => {
                    Swal.fire({
                        title: "Error!",
                        text: "There was a problem deleting the file.",
                        icon: "error"
                    });
                    console.error("There was an error deleting the file:", error);
                });
        }

    });
};




    // Función para actualizar un autor
    const updateprestamo = () => {
        if ( !fechaprestamo) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, complete todos los campos.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
            });
            return;
        }

        Axios.put("http://localhost:3001/update_prestamo", {
            Prestamoid: idprestamo,
            usuario,
            libro,
            estado,
            FechaPrestamo:fechaprestamo,
            FechaDevolucion:fechadevolucion,

        })
            .then(() => {
                Swal.fire({
                    title: "Actualizado!",
                    html: `<strong>${libro}</strong> Se ha actualizado`,
                    icon: "success",
                    timer: 4000,
                });
                getPrestamos(); // Actualiza la lista de autores después de la actualización
            })
            .catch((error) => {
                console.error("Hubo un error al actualizar el Libro:", error);

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    html: `<strong> Debe Completar Todos los Campos </strong>`,
                    icon: "error",
                    timer: 4000,
                });
            });
        
    };


    useEffect(() => {
        getPrestamos();
        getUsuarios();
        getLibros(); // Fetch libros if needed
    }, []);

    return (
        <div className="container-fluid">
            <hr />
            <div id="tabladatos" className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 id="titablausers" className="m-0 font-weight-bold text-primary">Libros Prestados</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col"> # Prestamo</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Libro</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Fecha Prestamo</th>
                                    <th scope="col">Fecha Devolucion</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody id="prestamos">
                                {listaprestamos.map((prestamo) => (
                                    <tr key={prestamo.prestamoId}>
                                        <td>{prestamo.prestamoId}</td>
                                        <td>{prestamo.nombusu}</td>
                                        <td>{prestamo.nomblibro}</td>
                                        <td>{prestamo.estado}</td>
                                        <td>{prestamo.fechaCreacion}</td>
                                        <td>{prestamo.fechaFin}</td>
                                        <td className="opciones">
                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#Modalprestamos"
                                                    onClick={() => {
                                                        setidprestamo(prestamo.prestamoId);
                                                        setusuario(prestamo.nombusu);
                                                        setlibro(prestamo.nomblibro);
                                                        setestado(prestamo.estado);
                                                        setFechaPrestamo(prestamo.fechaCreacion);
                                                        setFechaDevolucion(prestamo.fechaFin);
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => deletePrestamo(prestamo.prestamoId)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



            {/* <!-- The Modal --> */}
            <div className="modal" id="Modalprestamos">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title">Editar Prestamo</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">

                            <form>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Id Prestamo:</span>
                                    <input readOnly id="idprestamo" type="text" className="form-control"
                                        value={idprestamo}
                                        onChange={(e) => setidprestamo(e.target.value)}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Usuario:</span>
                                    <input readOnly id="usuario" type="text" className="form-control"
                                        value={usuario}
                                        onChange={(e) => setusuario(e.target.value)}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Nombre Libro:</span>
                                    <input readOnly id="nombre" type="text" className="form-control"
                                        value={libro}
                                        onChange={(e) => setlibro(e.target.value)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Estado Libro:</span>
                                    <input required id="estado" type="text" className="form-control"
                                        value={estado}
                                        onChange={(e) => setestado(e.target.value)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Fecha Prestamo:</span>
                                    <input required type="date" className="form-control"
                                        onChange={(e) => setFechaPrestamo(e.target.value)}
                                        value={fechaprestamo}

                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Fecha Devoluion:</span>
                                    <input required type="date" className="form-control"
                                        onChange={(e) => setFechaDevolucion(e.target.value)}
                                        value={fechadevolucion}

                                    />
                                </div>

                            </form>
                        </div>
                        {/* <!-- Modal footer --> */}

                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={updateprestamo}>Actualizar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
}

export default Editar_Prestamos;
