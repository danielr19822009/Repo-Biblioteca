import React, { useState } from "react";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [listadmin, setlistadmin] = useState([]);

    const iniciarsession = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                html: `Uno o más campos están vacíos`,
                timer: 4000,
            });
        } else {
            axios.post("http://localhost:3001/login_admon", { email, password })
                .then(() => {
                    Swal.fire({
                        title: "Good job!",
                        html: `<strong>${email}</strong> ha sido registrado`,
                        icon: "success"
                    }).then(() => {
                        getAdmin(); // Actualiza la lista de administradores
                        limpiarCampos(); // Limpia los campos de entrada
                    });
                })
                .catch((error) => {
                    console.error("Hubo un error al registrar:", error);
                    Swal.fire({
                        title: "Bad job!",
                        html: `<strong>${email}</strong> no pudo ser registrado`,
                        icon: "error"
                    });
                });
        }
    }

    // Función para obtener los usuarios administradores
    const getAdmin = () => {
        axios.get('http://localhost:3001/get_admin')
            .then(response => {
                console.log('Admins obtenidos:', response.data); // Verifica los datos
                setlistadmin(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los admins:', error);
            });
    }

    // Función para limpiar los campos de entrada
    const limpiarCampos = () => {
        setEmail("");
        setPassword("");
    };

    return (
        <div className={'mainContainer'}>
            <form>
                <div className={'titleContainer'}>
                    <div>BiblioCloud SM</div>
                </div>

                <div className={'inputContainer'}>
                    <input 
                        className={'inputBox'} 
                        placeholder="Enter your email here" 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={'inputContainer'}>
                    <input 
                        className={'inputBox'} 
                        placeholder="Enter your password here" 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={'inputContainer'}>
                    <button 
                        className="btn btn-primary" 
                        type="button" 
                        onClick={iniciarsession}
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
