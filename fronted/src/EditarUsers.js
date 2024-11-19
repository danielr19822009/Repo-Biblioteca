import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";

const Editar_User = () => {
    const [usuarioid, setusuarioid] = useState("");
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");

    const [usersList, setUsersList] = useState([]);
    const [editar, setEditar] = useState(false); ///banderita

    // Function to get users
    const getUsers = () => {
        Axios.get("http://localhost:3001/get_users")
            .then((response) => {
                setUsersList(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los usuarios:", error);
            });
    };

    // Clear input fields
    const clear = () => {
        setusuarioid("");
        setCedula("");
        setNombre("");
        setDireccion("");
        setTelefono("");
        setEditar(false); //banderita
    };

    // Function to update user
    const updateUser = () => {
        if (usuarioid) {
            Axios.put("http://localhost:3001/update_users", {

                idUser: usuarioid,
                cedula,
                nombre,
                telefono,
                direccion,

            })
                .then(() => {
                    Swal.fire({
                        title: "Actualizado!",
                        html: `<strong> ${nombre}  </strong>Se Ha Actualizado`,
                        icon: "success",
                        timer: 4000,
                    });
                    getUsers();
                    clear();
                })
                .catch((error) => {
                    console.error("Hubo un error al actualizar el usuario:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Hubo un error al actualizar el usuario.",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                    });
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se ha seleccionado ningún usuario para actualizar.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
            });
        }
    };

    //funcion delete users

    const deleteUser = (id, nombre) => {
        Swal.fire({
            title: "¿estás seguro??",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/delete_users/${id}`)
                .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            html: `Tu usuario ha sido eliminado.<strong> ${nombre}</strong>`,
                            icon: "success"
                        });
                        getUsers(); // Actualiza la lista de autores después de la actualización

                    })

                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: `Para Eliminar este Usuario 
                            Primero Debe Eliminar el Prestamo Asociado.`,
                            icon: "error"
                        });
                        console.error("Para Eliminar este Usuario Primero Debe Eliminar el Prestamo Asociado.:", error);
                    });
            }
    
        });
    };

    //fin funcion delete

    // UseEffect to get users
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container-fluid">
            {/* Tabla para mostrar los usuarios */}
            <div id="tabladatos" className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 id="titablausers" className="m-0 font-weight-bold text-primary">
                        Usuarios
                    </h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="example" width="100%" cellSpacing="0"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">N° Cédula</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Dirección</th>
                                    <th className="opciones" scope="col">
                                        Opciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.map((user) => (
                                    <tr key={user.usuarioId}>
                                        <td>{user.usuarioId}</td>
                                        <td>{user.cedula}</td>
                                        <td>{user.nombre}</td>
                                        <td>{user.telefono}</td>
                                        <td>{user.direccion}</td>
                                        <td className="opciones">
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Basic example"
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn-info" data-bs-toggle="modal" data-bs-target="#modaledituser"
                                                    onClick={() => {
                                                        setusuarioid(user.usuarioId);
                                                        setCedula(user.cedula);
                                                        setNombre(user.nombre);
                                                        setDireccion(user.direccion);
                                                        setTelefono(user.telefono);
                                                        setEditar(true); //banderita
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger "
                                                    onClick={() =>
                                                        deleteUser(user.usuarioId, user.nombre)
                                                    } // Corrección aquí
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
            <div className="modal" id="modaledituser">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title">Editar Usuario</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">

                            <form >
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        Id
                                    </span>
                                    <input readOnly id="id" type="text" className="form-control"
                                        onChange={(event) => setusuarioid(event.target.value)}
                                        value={usuarioid}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        Cédula
                                    </span>
                                    <input id="cedula" type="text" className="form-control"
                                        onChange={(event) => setCedula(event.target.value)}
                                        value={cedula}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        Nombre
                                    </span>
                                    <input id="nombre" type="text" className="form-control"
                                        onChange={(event) => setNombre(event.target.value)}
                                        value={nombre}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        Dirección
                                    </span>
                                    <input
                                        id="direccion"
                                        type="text"
                                        className="form-control"
                                        onChange={(event) => setDireccion(event.target.value)}
                                        value={direccion}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        Teléfono
                                    </span>
                                    <input id="telefono" type="text" className="form-control"
                                        onChange={(event) => setTelefono(event.target.value)}
                                        value={telefono}
                                    />
                                </div>

                            </form>
                        </div>
                        {/* <!-- Modal footer --> */}

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={updateUser}>Guardar Cambios</button>
                            <button type="button" class="btn btn-secondary" id="cerrarmodal" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Editar_User;
