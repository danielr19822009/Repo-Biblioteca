import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";


// Componente para la gestión de libros
const Add_Editorial = () => {

    // Definición de estados para manejar los datos del editorial y la lista de editoriales
    const [editorialid, setEditorialId] = useState(null);
    const [nombreEditorial, setNombreEditorial] = useState('');
    const [direccionEditorial, setDireccionEditorial] = useState('');
    const [telefonoEditorial, setTelefonoEditorial] = useState('');
    const [editoriales, setEditoriales] = useState([]);

    // Función para limpiar los campos de entrada
    const limpiarCampos = () => {
        setNombreEditorial("");
        setDireccionEditorial("");
        setTelefonoEditorial(""); // Limpia el ID del autor para la edición
    };

    // Función para obtener las editoriales y autores
    const getEditoriales = () => {
        Axios.get("http://localhost:3001/get_editoriales")
            .then((response) => {
                setEditoriales(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener las Editoriales:", error);
            });
    };


    // Función para agregar un nuevo editorial
    const addEditorial = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario (si lo estás usando dentro de un <form>)

        if (nombreEditorial === "") {

            Swal.fire({
                title: "Oops...",
                text: "Uno o más campos están vacíos. ¡Verifique!",
                icon: "error",
                timer: 4000,
            });

        } else {

            // Realiza una solicitud POST para agregar el autor
            Axios.post("http://localhost:3001/add_editoriales", {
                nombreEditorial,
                direccionEditorial,
                telefonoEditorial,
            })
            limpiarCampos();

            Swal.fire({
                title: "Registrado",
                html: `<strong>${nombreEditorial}</strong>, Registrado`,
                icon: "success",
                timer: 4000,
            })
                .then(() => {
                    getEditoriales(); // Actualiza la lista de editoriales
                })
                .catch((error) => {
                    console.error("Hubo un error al registrar:", error);

                    Swal.fire({
                        title: "Error",
                        text: "Hubo un error al registrar la editorial.",
                        icon: "error",
                        timer: 4000,
                    });
                });
        }
    };


    // Hook para cargar los autores al montar el componente
    useEffect(() => {
        getEditoriales();
        limpiarCampos();
    }, []);

    return (
        <div className="container-fluid">


            {/* <!-- The Modal --> */}
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">Registrar Editorial</h4>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                        <form >

                            <div className="input-group mb-3">
                                <span className="input-group-text">ID</span>
                                <input id="ideditorial" type="text" className="form-control" readOnly
                                    onChange={(event) => setEditorialId(event.target.value)}
                                    value={editorialid}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nombre</span>
                                <input id="nombreeditorial" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                    onChange={(event) => setNombreEditorial(event.target.value)}
                                    value={nombreEditorial}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Direccion:</span>
                                <input id="direccioneditorial" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                    onChange={(event) => setDireccionEditorial(event.target.value)}
                                    value={direccionEditorial}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">Telefono:</span>
                                <input  id="telefonoeditorial"  type="text"  className="form-control"  aria-label="Sizing example input"  aria-describedby="inputGroup-sizing-default"
                                    onChange={(event) => setTelefonoEditorial(event.target.value)}
                                    value={telefonoEditorial}
                                />
                            </div>
                        </form>
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-block btn-primary"
                            onClick={addEditorial}>Registrar</button>
                    </div>
                </div>
            </div>

        </div>


    );
};



export default Add_Editorial;
