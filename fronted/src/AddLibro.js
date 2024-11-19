import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import "./AddAutor";
import Add_Autor from "./AddAutor"; // importo el archivo addautor.js para usar el componente 
import Add_Editorial from "./AddEditorial"; // importo el archivo add editorial.js para usar el componente 

import Swal from "sweetalert2";
import Axios from "axios";



// Componente para la gestión de la biblioteca
const Add_Libro = () => {

	useEffect(() => {
		getLibros();
		getautores();
		getEditoriales();

	}, []);


	const [nombrelibro, setnombrelibro] = useState("");
	const [nombreautor, setnombreautor] = useState("");
	const [nombreeditorial, setnombreeditorial] = useState("");
	const [cantidad, setCantidad] = useState("");
	const [fecha, setFecha] = useState("");

	// del modal autor
	// Definición de estados para manejar los datos del autor y la lista de autores
	// const [autorid, setAutorid] = useState("");
	// const [nombreAutor, setNombreAutor] = useState("");
	// const [apellidoAutor, setApellidoAutor] = useState("");

	// // Definición de estados para manejar los datos del editorial y la lista de editoriales
	// const [editorialId, setEditorialId] = useState(null);
	// const [nombreEditorial, setNombreEditorial] = useState("");
	// const [direccionEditorial, setDireccionEditorial] = useState("");
	// const [telefonoEditorial, setTelefonoEditorial] = useState("");

	//listas data
	const [listalibros, setListalibros] = useState([]);
	const [listaautor, setlistaautor] = useState([]);
	const [listaeditorial, setlistaeditorial] = useState([]);

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

	// Función para obtener las editoriales
	const getEditoriales = () => {
		Axios.get("http://localhost:3001/get_libros_editoriales")
			.then((response) => {
				console.log("Editoriales obtenidas:", response.data); // Verifica los datos
				setlistaeditorial(response.data);
			})
			.catch((error) => {
				console.error("Hubo un error al obtener las editoriales:", error);
			});
	};

	// Función para obtener los autores
	const getautores = () => {
		Axios.get("http://localhost:3001/get_libros_autores")
			.then((response) => {
				console.log("Autores obtenidos:", response.data); // Verifica los datos
				setlistaautor(response.data);
			})
			.catch((error) => {
				console.error("Hubo un error al obtener los autores:", error);
			});
	};


	// Función para Add los Libros

	const addLibro = (e) => {
		e.preventDefault();
		if (nombrelibro === "" || nombreautor === "" || nombreeditorial === "" || cantidad === "" || fecha === "") {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				html: `Uno o Mas Campos Estan Vacios `,
				timer: 3000,
			})
		} else {
			Axios.post("http://localhost:3001/add_libro", {
				nombrelibro,
				nombreautor,
				nombreeditorial,
				cantidad,
				fecha,
			})
				.then((response) => {
					//Menasje sweetalert  de Creacion de Libro correcta
					Swal.fire({
						title: "Good job!",
						html: `<strong>${nombrelibro}</strong>, Registrado Con Exito`,
						icon: "success",
						timer: 3000,

					})
					setnombrelibro("");
					setnombreeditorial("");
					setnombreautor("");
					setCantidad("");
					setFecha("");
					getLibros();
					getEditoriales();
					getautores();
				})
				.catch((error) => {
					console.error("Error al registrar el libro:", error);
				});

		}

	};


	return (
		<div className="container-fluid">

			{/* <!-- The Modal --> */}
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					{/* <!-- Modal Header --> */}
					<div className="modal-header">
						<h4 className="modal-title">Registra Nuevo Libro</h4>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<form>
							<div className="input-group mb-3">
								<span className="input-group-text">Nombre</span>
								<input id="nombrelibro" type="text" className="form-control" required
									value={nombrelibro}
									onChange={(event) => setnombrelibro(event.target.value)}
								/>
							</div>
							<div className="input-group mb-3">
								<span className="input-group-text">Autor:</span>
								<select name="autorId" className="form-control" id="autorId"
									value={nombreautor}
									onChange={(e) => setnombreautor(e.target.value)}
								>
									<option value="">Seleccionar</option>
									{listaautor.map((autores) => (
										<option key={autores.autorId} value={autores.autorId}>
											{autores.nombreAutor + " " + autores.apellidoAutor}
										</option>
									))}
								</select>
								<button id="btn-add" type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#ModalAddAutor"
								>
									Add Autor
								</button>
							</div>

							<div className="input-group mb-3">
								<span className="input-group-text">Editorial:</span>
								<select className="form-control" id="editorialId"
									value={nombreeditorial}
									onChange={(e) => setnombreeditorial(e.target.value)}
								>
									<option value="">Seleccionar</option>
									{listaeditorial.map((editoriales) => (
										<option
											key={editoriales.editorialId}
											value={editoriales.editorialId}
										>
											{editoriales.nombreEditorial}{" "}
										</option>
									))}
								</select>
								<button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#ModalAddeditorial"
								>
									Add Editorial
								</button>
							</div>

							<div className="input-group mb-3">
								<span className="input-group-text">Cantidad:</span>
								<input name="cantidad" type="number" className="form-control" required
									value={cantidad}
									onChange={(e) => setCantidad(e.target.value)}
								/>
							</div>
							<div className="input-group mb-3" id="fecha">
								<span className="input-group-text">Fecha:</span>
								<input id="fecha" type="date" className="form-control" required
									value={fecha}
									onChange={(e) => setFecha(e.target.value)}
								/>
							</div>
							<div>

							</div>
						</form>
					</div>

					{/* <!-- Modal footer --> */}
					<div className="modal-footer">
						<button id="btn-registrar" className="btn btn-block btn-primary"
							onClick={addLibro}
							type="submit"
						>
							Registrar
						</button>
					</div>
				</div>
			</div>

			{/*     MODAL NUEVO Add Autor*/}
			<div className="modal fade" id="ModalAddAutor" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<Add_Autor />
						</div>
						{/* <!-- Modal footer --> */}
						<div className="modal-footer">
							<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>

			{/*     MODAL NUEVO Add Editorial*/}
			<div className="modal fade" id="ModalAddeditorial" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<Add_Editorial />
						</div>
						{/* <!-- Modal footer --> */}
						<div className="modal-footer">
							<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>


		</div>
	);
};

export default Add_Libro;
