import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";


// Componente para la gestión de autores
const Editar_Autor = () => {
    // Definición de estados para manejar los datos del autor y la lista de autores
    const [autorid, setAutorid] = useState("");
    const [nombreAutor, setNombreAutor] = useState("");
    const [apellidoAutor, setApellidoAutor] = useState("");
    const [autores, setAutores] = useState([]);



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
    }, []);

    // Función para eliminar un autor


    const deleteAutor = (autorId) => {
        Swal.fire({
            title: "Estas Seguro de Eliminar ? ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar !"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/delete_autor/${autorId}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Autor A sido Eliminado !!!.",
                            icon: "success"
                        });
                        getAutores(); // Actualiza la lista de autores después de eliminar
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



    // Función para actualizar un autor
    const updateAutores = () => {
        if (!nombreAutor || !apellidoAutor ) {
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

        Axios.put("http://localhost:3001/update_autor", {
            autorId: autorid,
            nombreAutor,
            apellidoAutor
        })
            .then(() => {
                Swal.fire({
                    title: "Actualizado!",
                    html: `<strong>${nombreAutor}</strong> Se ha actualizado`,
                    icon: "success",
                    timer: 4000,
                });
                getAutores(); // Actualiza la lista de autores después de la actualización
                clear(); // Limpia los campos
            })
            .catch((error) => {
                console.error("Hubo un error al actualizar el autor:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un error al actualizar el autor.",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                });
            });
    };

    // Función para limpiar los campos de entrada
    const clear = () => {
        setNombreAutor("");
        setApellidoAutor("");
        setAutorid(""); // Limpia el ID del autor para la edición
    };

    return (
        <div className="container-fluid">




            <div id="tabladatos" className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 id='titablausers' className="m-0 font-weight-bold text-primary">Autores</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {autores.map((autor) => (
                                    <tr key={autor.autorId}>
                                        <td>{autor.autorId}</td>
                                        <td>{autor.nombreAutor}</td>
                                        <td>{autor.apellidoAutor}</td>
                                        <td className="opciones">
                                            <div className="btn-group" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-info"
                                                    onClick={() => {
                                                        setAutorid(autor.autorId);
                                                        setNombreAutor(autor.nombreAutor);
                                                        setApellidoAutor(autor.apellidoAutor);
                                                        setAutorid(autor.autorId); // Establece el ID del autor para editar
                                                    }}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#Modaleditarautor"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button" className="btn btn-danger"
                                                    onClick={() => deleteAutor(autor.autorId)}
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
            <div className="modal" id="Modaleditarautor">
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
                                    <input required id="nombreeditar" type="text" className="form-control"
                                        onChange={(event) => setNombreAutor(event.target.value)}
                                        value={nombreAutor}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Apellido</span>
                                    <input required id="apellidoeditar" type="text" className="form-control"
                                        onChange={(event) => setApellidoAutor(event.target.value)}
                                        value={apellidoAutor}
                                    />
                                </div>

                            </form>

                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={updateAutores}>Actualizar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};


export function export_addAutor(nombre, apellido) {
    // Realiza una solicitud POST para agregar el autor
    Axios.post("http://localhost:3001/add_autores", {
        nombre,
        apellido,
    })
}

export default Editar_Autor;
