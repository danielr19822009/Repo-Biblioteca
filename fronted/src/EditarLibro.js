import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";

// Componente para la gestión de la biblioteca
const Edit_Libro = () => {
    const [libroid, setlibroid] = useState("");
    const [nombrelibro, setnombrelibro] = useState("");

    const [ideditorial, setideditorial] = useState("");
    const [nombreditorial, setnombreditorial] = useState("");

    const [autorid, setautorid] = useState("");
    const [nombreautor, setnombreautor] = useState("");
    const [apellidoautor, setapellidoautor] = useState("");


    const [cantidad, setCantidad] = useState("");
    const [fecha, setFecha] = useState("");

    //listas data
    const [listalibros, setListalibros] = useState([]);


    // Función para obtener los libros
    const getLibros = () => {
        Axios.get("http://localhost:3001/get_libros")
            .then((response) => {
                console.log("Libros obtenidos:", response.data); // Verifica los datos
                setListalibros(response.data);

            })
            .catch((error) => {
                console.error("Hubo un error al obtener los libros:", error);
            });
    };



    const updateLibro = () => {
        // Validaciones para asegurarse de que las variables no sean nulas o indefinidas
        if (!libroid || !nombrelibro) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos. ' + libroid + ' ' + nombrelibro + ' ' + autorid + ' ' + cantidad,
                showConfirmButton: true,
            });
            return;
        }

        Axios.put("http://localhost:3001/update_libro", {
            libroid,
            nombrelibro,
            cantidad,
            fecha,
        })
            .then(() => {
                Swal.fire({
                    title: "Actualizado!",
                    html: `<strong> ${nombrelibro} </strong>Se Ha Actualizado`,
                    icon: "success",
                    timer: 4000,
                });
                getLibros();
            })
            .catch((error) => {
                console.error("Hubo un error al actualizar el Libro:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un error al actualizar el Libro.",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                });
            });
    };


    // Función para eliminar un libro
    const deleteLibro = (libroId, nombrelibro) => {
    
        Swal.fire({
            title: "Estas Seguro de Eliminar ? ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar !"
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/delete_libros/${libroId}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            html: `<strong> Your Libro has been deleted.  ${nombrelibro}, </strong> se ha eliminado`,
                            icon: "success"
                        });
                        getLibros(); // Actualiza la lista de autores después de eliminar
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

    useEffect(() => {
        getLibros();

    }, []);

    return (
        <div className="container-fluid">
            {/* tabla mostrar libros */}
            <div id="tablausers" className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 id="titablausers" className="m-0 font-weight-bold text-primary">
                        Libros
                    </h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Id Libro</th>
                                    <th scope="col">Nombre Libro</th>
                                    <th scope="col">Editorial</th>
                                    <th scope="col">Autor</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Fecha Creación</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listalibros.map((libro) => (
                                    <tr key={libro.libroId}>
                                        <td>{libro.libroId}</td>
                                        <td>{libro.nombreLibro}</td>
                                        <td>{libro.nombreEditorial}</td>
                                        <td>{libro.nombreAutor + " " + libro.apellidoAutor}</td>
                                        <td>{libro.cantidad}</td>
                                        <td>{libro.fechaCreacion}</td>
                                        <td className="opciones">

                                            <div className="btn-group" role="group">
                                                <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#Modaleditarlibro"
                                                    onClick={() => {
                                                        setlibroid(libro.libroId);
                                                        setnombrelibro(libro.nombreLibro);

                                                        setideditorial(libro.editorialId);
                                                        setnombreditorial(libro.nombreEditorial);

                                                        setautorid(libro.autorId);
                                                        setnombreautor(libro.nombreAutor);
                                                        setapellidoautor(libro.apellidoAutor);

                                                        setCantidad(libro.cantidad);
                                                        setFecha(libro.fechaCreacion);

                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                <button type="button" className="btn btn-danger"
                                                    onClick={() => deleteLibro(libro.libroId)}
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
            <div class="modal" id="Modaleditarlibro">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h4 class="modal-title">Editar Libro</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">ID</span>
                                    <input readOnly type="text" className="form-control"
                                        onChange={(event) => setlibroid(event.target.value)}
                                        value={libroid}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Nombre Libro:</span>
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setnombrelibro(e.target.value)}
                                        value={nombrelibro}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Editorial ID:</span>
                                    <input readOnly type="text" id="editorialid" className="form-control"
                                        onChange={(e) => setnombreditorial(e.target.value)}
                                        value={nombreditorial}
                                        placeholder={nombreditorial}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Autor ID:</span>
                                    <input readOnly type="text" className="form-control" required
                                        onChange={(e) => setapellidoautor(e.target.value)}
                                        value={nombreautor + " " + apellidoautor}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Cantidad:</span>
                                    <input type="number" className="form-control" required
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Fecha:</span>
                                    <input required type="date" className="form-control"
                                        onChange={(e) => setFecha(e.target.value)}
                                        value={fecha}

                                    />
                                </div>
                            </form>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={(event) => { event.preventDefault(); updateLibro(); }}>
                                Guardar Cambios
                            </button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default Edit_Libro;
