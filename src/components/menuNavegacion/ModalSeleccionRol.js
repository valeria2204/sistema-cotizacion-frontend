import React, { Fragment,useState,useEffect } from 'react'
import { PersonCircle ,BoxArrowRight,HouseDoorFill} from 'react-bootstrap-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useHistory  } from 'react-router-dom'
import { useForm } from "react-hook-form";
import './ModalSeleccionRol.css';
function ModalSeleccionRol(props){
    const [user, setUser] = useState([]);
    const [userRol, setUserRol] = useState([]);
    const [nameUnidad, setNameUnidad] = useState("")
    const [ flag, setFlag] = useState(false);
    let history = useHistory();
    // const [userRol, setUserRol] = useState([
    //     {id:1, nameRol:"Jefe unidad de gasto",unidad:"3",facultad:"Ciencias y Tecnologia"},
    //     {id:4, nameRol:"Cotizador",unidad:"2", facultad:"Economia"},
    //     {id:5, nameRol:"Secretaria",unidad:"6", facultad:"Arquietectura"},
    //     {id:6, nameRol:"Encargado de Correos",unidad:"4", facultad:"Humanidades"},
    //     {id:7, nameRol:"Encargado de Personal",unidad:"4", facultad:"Humanidades"},
    //     {id:8, nameRol:"Encargado de Compras",unidad:"5", facultad:"Humanidades"},
    //     {id:9, nameRol:"Encargado de relaciones publicas",unidad:"1", facultad:"Humanidades"},
    //     {id:10, nameRol:"Encargado de Personal",unidad:"3", facultad:"Ciencias y Tecnologia"},
    // ]);

    const modalStyles={
        top:"5%",
        transfrom: 'translate(-50%, -50%)'
    }
    const closeModal = () => {
        props.cerrarModalRoles()
        //history.replace("/")
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem("userDetails"));
                setUser(user.user);
                setUserRol(user.user.roles);
                //console.log("LOS ROLES",user.user.roles)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    return(
     <> 
     <Modal isOpen={props.abrirRoles}  style={modalStyles}>
        <ModalHeader toggle={closeModal}>
          Seleccione el rol con el que desea acceder
        </ModalHeader>
        <ModalBody>
                <div align="center" class="tabla grid-container--fill">
                    {userRol.map((rol)=>{
                        // rol.nameUnidadGasto==null? setNameUnidad(rol.nameUnidadAdministrativa):setNameUnidad(rol.nameUnidadGasto);
                        return(
                            <div id="card">
                            <image class="card-img-top"><PersonCircle height={60} width={60} id="card-image"/></image>
                            <div class="card-body">
                                <h6 class="card-title">{rol.nameRol}</h6>
                                <label class="card-text">{rol.nameUnidadGasto} </label>
                                <label class="card-text">{rol.nameUnidadAdministrativa}</label>
                                <button type="button" class="btn btn-info"
                                 onClick={()=>{
                                    console.log("entra con el rol",rol.nameRol,rol.nameUnidadAdministrativa,rol.nameUnidadGasto);  
                                    props.updateRol(rol)
                                    closeModal()
                                }}>Acceder</button> 
                            </div>
                            </div>
                        );
                    }
                    )}
                </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" onClick={closeModal}>Cerrar</button>
        </ModalFooter>
    </Modal>
     </>
    )
}

export default ModalSeleccionRol;