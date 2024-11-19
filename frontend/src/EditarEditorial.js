import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";

// Componente para la gestión de libros
const Editar_Editorial = () => {

    // Definición de estados para manejar los datos del editorial y la lista de editoriales
    const [editorialid, setEditorialId] = useState('');
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



    // Función para actualizar un editorial
    const updateEditoriales = () => {
        if (!nombreEditorial || !direccionEditorial || !telefonoEditorial) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, complete todos los campos.",

                timer: 4000,

            });
            return;
        }
        console.log(nombreEditorial + direccionEditorial)

        Axios.put("http://localhost:3001/update_editoriales", {
            editorialId: editorialid,
            nombreEditorial,
            direccionEditorial,
            telefonoEditorial,

        })
            .then(() => {
                Swal.fire({
                    title: "Actualizado!",
                    html: `<strong>${nombreEditorial}</strong> Se ha actualizado`,
                    icon: "success",
                    timer: 4000,
                });
                getEditoriales(); // Actualiza la lista de autores después de la actualización
                limpiarCampos(); // Limpia los campos
            })
            .catch((error) => {
                console.error("Hubo un error al actualizar el Editorial:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    html: "Hubo un error al actualizar el Editorial.",
                    timer: 4000,
                });
            });
    };

    // Hook para cargar los autores al montar el componente
    useEffect(() => {
        getEditoriales();
    }, []);

    // Función para eliminar un editorial


    const deleteEditorial = (editorialId, nombreEditorial) => {
        Swal.fire({
            title: "Estas Seguro de Eliminar ? ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar !"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/delete_editoriales/${editorialId}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            html: `<strong>${nombreEditorial}</strong> se ha eliminado`,
                            icon: "success"
                        });
                        getEditoriales(); // Actualiza la lista de autores después de eliminar
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "Para Eliminar este Autor Debes Desasociar El libro del Autor",
                            icon: "error"
                        });
                        console.error("Para Eliminar este Autor Debes Desasociar El libro del Autor:", error);
                    });
            }


        });
    };




return (
    <div className="container-fluid">

        <div id="tabladatos" className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 id='titablausers' className="m-0 font-weight-bold text-primary">Editoriales</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Editorial</th>
                                <th scope="col">Direccion</th>
                                <th scope="col">telefono</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editoriales.map((editorial) => (
                                <tr key={editorial.editorialId}>
                                    <td>{editorial.editorialId}</td>
                                    <td>{editorial.nombreEditorial}</td>
                                    <td>{editorial.direccionEditorial}</td>
                                    <td>{editorial.telefonoEditorial}</td>

                                    <td className="opciones">
                                        <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                className="btn btn-info" data-bs-toggle="modal" data-bs-target="#Modaleditorial"
                                                onClick={() => {
                                                    setEditorialId(editorial.editorialId);
                                                    setNombreEditorial(editorial.nombreEditorial);
                                                    setDireccionEditorial(editorial.direccionEditorial);
                                                    setTelefonoEditorial(editorial.telefonoEditorial); // Establece el ID del editoriaal para editar
                                                }}
                                            >Editar
                                            </button>
                                            <button
                                                type="button" className="btn btn-danger"
                                                onClick={() => deleteEditorial(editorial.editorialId)}
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
        <div className="modal" id="Modaleditorial">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">Editar Editorial</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">

                        <form >

                            <div className="input-group mb-3">
                                <span className="input-group-text">Nombre</span>
                                <input id="nombreeditorial" type="text" className="form-control" required
                                    onChange={(event) => setNombreEditorial(event.target.value)}
                                    value={nombreEditorial}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Dirección</span>
                                <input id="direedito" type="text" className="form-control" required
                                    onChange={(event) => setDireccionEditorial(event.target.value)}
                                    value={direccionEditorial}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Teléfono</span>
                                <input id="teleedito" type="text" className="form-control" required
                                    onChange={(event) => setTelefonoEditorial(event.target.value)}
                                    value={telefonoEditorial}
                                />
                            </div>

                        </form>

                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={updateEditoriales}>Actualizar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>

                </div>
            </div>
        </div>



    </div>


);
};

export function export_addEditorial(i, nombre, direccion, telefono) { }


export default Editar_Editorial;
