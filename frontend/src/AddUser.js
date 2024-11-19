import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";


//componente
const Add_User = () => {
    const [id, setId] = useState("");
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");

    const [usersList, setUsersList] = useState([]);
    const [editar, setEditar] = useState(false);  ///banderita



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
        setId("");
        setCedula("");
        setNombre("");
        setDireccion("");
        setTelefono("");
        setEditar(false); //banderita
    };

    // Function to add user
    const addUser = () => {
        if (cedula === "" || nombre === "" || direccion === "" || telefono === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                html: `Uno o Mas Campos Estan Vacios `,
                timer: 4000,
            });
        } else {

            Axios.post("http://localhost:3001/add_users", {
                cedula,
                nombre,
                direccion,
                telefono,
            })
            //Menasje sweetalert  de Creacion de usuario correcta
            Swal.fire({
                title: "Good job!",
                html: `<strong>${nombre}</strong>, Registrado`,
                icon: "success",
                timer: 4000,

            })
                .then(() => {
                    getUsers();
                    clear();
                })
                .catch((error) => {
                    console.error("Hubo un error al registrar:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error !!",
                        html: `<strong>${nombre}</strong>, Error Al Registrarlo`,
                        timer: 4000,
                    });
                });
        }
    };

    // UseEffect to get users
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container-fluid">

            {/* <!-- The Modal --> */}
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">Registrar Usuario</h4>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                        <form id="reg-pdo">
                            
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default" aria-required >
                                    Cédula
                                </span>
                                <input id="cedula" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Sin Puntos'
                                    onChange={(event) => setCedula(event.target.value)}
                                    value={cedula}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default" aria-required >
                                    Nombre
                                </span>
                                <input  id="nombre"  type="text"  className="form-control"  aria-label="Sizing example input"  aria-describedby="inputGroup-sizing-default" placeholder='Nombres y Apellidos'
                                    onChange={(event) => setNombre(event.target.value)}
                                    value={nombre}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">
                                    Dirección
                                </span>
                                <input  id="direccion"  type="text"  className="form-control"  aria-label="Sizing example input"  aria-describedby="inputGroup-sizing-default"
                                    onChange={(event) => setDireccion(event.target.value)}
                                    value={direccion}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">
                                    Teléfono
                                </span>
                                <input id="telefono" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                    onChange={(event) => setTelefono(event.target.value)}
                                    value={telefono}
                                />
                            </div>
                        </form>

                    </div>

                    {/* <!-- Modal footer --> */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-block" onClick={addUser} >
                            Registrar 
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Add_User;