import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";


// Componente para la gestión de autores
const Add_Autor = () => {
    // Definición de estados para manejar los datos del autor y la lista de autores
    const [autorid, setAutorid] = useState("");
    const [nombreAutor, setNombreAutor] = useState("");
    const [apellidoAutor, setApellidoAutor] = useState("");
    const [autores, setAutores] = useState([]);

    // Función para agregar un nuevo autor
    const addAutor = () => {
        if (nombreAutor === "" || apellidoAutor === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Uno o más campos están vacíos. ¡Verifique!",
                showConfirmButton: true,
            });
        } else {
            // Realiza una solicitud POST para agregar el autor
            Axios.post("http://localhost:3001/add_autores", {
                nombreAutor,
                apellidoAutor,
            })
                .then(() => {
                    Swal.fire({
                        title: "Good job!",
                        html: `<strong>${nombreAutor + ' ' + apellidoAutor}</strong> ha sido registrado`,
                        icon: "success"
                    }).then(() => {
                        getAutores(); // Actualiza la lista de autores
                        limpiarCampos(); // Limpia los campos de entrada
                    });
                })
                .catch((error) => {
                    console.error("Hubo un error al registrar:", error);
                    Swal.fire({
                        title: "Bad job!",
                        html: `<strong>${nombreAutor + ' ' + apellidoAutor}</strong> no pudo ser registrado`,
                        icon: "error"
                    });
                });
        }
    };

    // Función para obtener la lista de autores
    const getAutores = () => {
        Axios.get("http://localhost:3001/get_autores")
            .then((response) => {
                setAutores(response.data); // Actualiza el estado con los datos obtenidos
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los autores:", error);
            });
    };

    // Hook para cargar los autores al montar el componente
    useEffect(() => {
        getAutores();
        limpiarCampos();
    }, []);

    // Función para limpiar los campos de entrada
    const limpiarCampos = () => {
        setNombreAutor("");
        setApellidoAutor("");
        setAutorid(""); // Limpia el ID del autor para la edición
    };

    return (
        <div className="container-fluid">
            {/* <!-- The Modal --> */}
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">Registrar Autor</h4>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                        <form >
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nombre Autor:</span>
                                <input id="nombre" type="text" className="form-control" aria-label="Nombre"
                                    onChange={(event) => setNombreAutor(event.target.value)}
                                    value={nombreAutor}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Apellido Autor:</span>
                                <input id="apellido" type="text" className="form-control" aria-label="Apellido"
                                    onChange={(event) => setApellidoAutor(event.target.value)}
                                    value={apellidoAutor}
                                />
                            </div>
                        </form>
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={addAutor}>
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Add_Autor;
