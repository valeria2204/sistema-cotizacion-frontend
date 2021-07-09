import React, { Fragment,useState,useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useHistory  } from 'react-router-dom'
import Navbar from '../navbar/Navbar';
import MenuNavegacion from './MenuNavegacion'
import {Button} from 'reactstrap'
import {NavLink} from 'react-router-dom'
import './InicioSegunRol.css';
function InicioSegunRol(props){
    const [user, setUser] = useState([]);
    const [ flag, setFlag] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem("userDetails"));
                setUser(user.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    return(
     <> 
        <ModalHeader>Informacion Personal</ModalHeader>
        <br></br>
        <div class="container ">
        <div id="datos">
              <div className="form-row">
                <div id="name" className="form-group col-md-3">
                    <h6>Nombres:</h6>
                    <input
                        name="nombres"
                        className="form-control"
                        type="text"
                        value={user.name}
                        disabled
                    ></input> 
                </div>
                <div id="name" className="form-group col-md-3">
                    <h6>Apellidos:</h6>
                    <input
                        name="apellidos"
                        className="form-control"
                        type="text"
                        value={user.lastName}
                        disabled
                    ></input>   
                </div>
                <div id="name" className="form-group col-md-3">
                    <h6>Carnet de Identidad:</h6>
                    <input
                        name="carnet"
                        className="form-control"
                        type="text"
                        value={user.ci}
                        disabled
                    ></input>
                </div>
        </div>
        <div className="form-row">
             <div id="name" className="form-group col-md-3">
                <h6>Correo Electronico:</h6>
                <input
                    name="correo"
                    className="form-control"
                    type="text"
                    value={user.email}
                    disabled
                ></input> 
            </div>
            <div id="name" className="form-group col-md-3">
                <h6>Telefono:</h6>
                <input
                    name="telefono"
                    className="form-control"
                    type="text"
                    value={user.phone}
                    disabled
                ></input> 
            </div>
            <div id="name" className="form-group col-md-3">
                <h6>Direccion:</h6>
                <input
                    name="direccion"
                    className="form-control"
                    type="text"
                    value={user.direction}
                    disabled
                ></input> 
            </div>
            </div>
            </div>
        </div>
        {/* <ModalHeader>Mis Roles</ModalHeader>
        <ModalBody>
            <label>LISTA DE ROLES </label>
        </ModalBody> */}
     </>
    );
}

export default InicioSegunRol;