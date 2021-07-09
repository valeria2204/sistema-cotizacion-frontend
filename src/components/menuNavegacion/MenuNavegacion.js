import React, { useState, useEffect } from 'react';
import { PersonFill,PersonCircle,BoxArrowRight, HouseDoorFill, PersonBadgeFill} from 'react-bootstrap-icons'
import './MenuNavegacion.css';
import ModalSeleccionRol from './ModalSeleccionRol';
import {NavLink} from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import {Button} from 'reactstrap'
function MenuNavegacion (){

    const [userName, setUserName] = useState("")
    const [ user, setUser] = useState(null)
    const [ abrirRoles, setAbrirRoles] = useState(false)
    const [ rolEntrante, setRolEntrante] = useState({nameRol:"",permissions:[]})
    const [ flag, setFlag] = useState(false);
    const [ userRol, setUserRol] = useState("");
    const [home, setHome] = useState(true)
    const [perfil, setPerfil] = useState(true)
    const [login, setLogin] = useState(false)
    const [realizarSolicitudesAdqui, setRealizarSolicitudesAdqui] = useState(false)
    const [verSolicitudesAdqui, setVerSolicitudesAdqui] = useState(false)
    const [enviarCotizacion, setEnviarCotizacion] = useState(false)
    const [realizarCotizacion, setRealizarCotizacion] = useState(false)
    const [realizarComparacion,setRealizarComparacion] = useState(false)
    const [adminitrarUsuario, setAdministarUsuario] = useState(false)
    const [administrarRoles , setAdimnistrarRoles] = useState(false)
    const [administrarUnidadesdeGasto, setUnidadesGasto] = useState(false)
    const [UnidadesAdministrativas, setUnidadesAdministrativas] = useState(false)
    const [Empresa, setEmpresa] = useState(false)
    const [decargaFormularioCoti, setDecargaFormularioCoti] = useState(false)
    const [decargaFormularioAdqui, setDecargaFormularioAdqui] = useState(false)
    const [admiMontoLimite, setAdmiMontoLimite] = useState(false)
    const [personal, setPersonal] = useState(false)
    const [idUnitA,setidUnitA]=useState(null);
    const [idUnitS,setidUnitS]=useState(null);
    const [nameUnitA,setNameUnitA]=useState(null);
    const [nameUnitS,setNameUnitS]=useState(null);
    const [ roleMore, setRoleMore] = useState(false)
    const [ numRoles, setNumRoles] = useState(0)
    const [ bandera, setBandera] = useState(null)
    let history = useHistory();
    const cerrarSesion = () =>{
        window.localStorage.removeItem("tokenContizacion");
        window.localStorage.removeItem("userDetails");
        window.location = '/';
    }
    const cerrarModalRoles=()=>{
        setAbrirRoles(false);
    }
    const updateRol=(rol)=>{
        resetPermisos()
        //console.log("entra a ACTUALIZAR y recibe",rol)
        setidUnitA(rol.pivot.administrative_unit_id)
        setidUnitS(rol.pivot.spending_unit_id)
        setBandera(rol)
        cambiarPermisos(rol.permissions)
        setUserRol(rol.nameRol)
        setNameUnitS(rol.nameUnidadGasto)
        setNameUnitA(rol.nameUnidadAdministrativa)
        setFlag(!flag);
        history.replace("/")
    }
    const resetPermisos=()=>{
        setVerSolicitudesAdqui(false)
        setRealizarSolicitudesAdqui(false)
        setEnviarCotizacion(false)
        setAdmiMontoLimite(false)
        setUnidadesAdministrativas(false)
        setUnidadesGasto(false)
        setAdministarUsuario(false)
        setEmpresa(false)
        setPersonal(false)
    }
    const cambiarPermisos=(arrayPermisos)=>{
        
        arrayPermisos.forEach(permission=>{
            if(permission.namePermission==="Ver las solicitudes de adquisición"){
                setVerSolicitudesAdqui(true)
            }
            if(permission.namePermission==="Solicitu de aquicición"){
                setRealizarSolicitudesAdqui(true)
            }
            if(permission.namePermission==="Enviar el correo de contización"){
                setEnviarCotizacion(true)
            }
            if(permission.namePermission==="Todo sobre monte límite"){
                setAdmiMontoLimite(true)
            }
            if(permission.namePermission==="Registrar unidades administrativas"){
                setUnidadesAdministrativas(true)
            }
            if(permission.namePermission==="Registrar unidades de gasto"){
                setUnidadesGasto(true)
            }
            if(permission.namePermission==="Registrar usuarios"){
                setAdministarUsuario(true)
            }
            if(permission.namePermission==="Registro de empresas"){
                setEmpresa(true)
            }
            if(permission.namePermission==="Administar roles"){
                setAdimnistrarRoles(true)
            }
            if(permission.namePermission=="Ver Personal"){
                setPersonal(true)
            }
        })
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(window.localStorage.getItem("userDetails"));
                setUser(user.user);
                console.log(user)
                setUserName(user.user.name);
                setLogin(true)
                if(user.user.roles.length === 1){ //si solo hay un rol
                    setRolEntrante(user.user.roles[0])
                    //console.log("entra a menu navegacion CON ESTE UNICO ROL",user.user.roles[0]);
                    cambiarPermisos(user.user.roles[0].permissions)
                    setUserRol(user.user.roles[0].nameRol)
                    setNumRoles(1)
                    setidUnitA(user.user.roles[0].pivot.administrative_unit_id)
                    setidUnitS(user.user.roles[0].pivot.spending_unit_id)
                    setNameUnitS(user.user.roles[0].nameUnidadGasto)
                    setNameUnitA(user.user.roles[0].nameUnidadAdministrativa)
                    console.log("UNIDAD ADMIN",user.user.roles[0].pivot.administrative_unit_id)
                    console.log("UNIDAD GASTO",user.user.roles[0].pivot.spending_unit_id)
                }else{
                    setAbrirRoles(true)
                    setRoleMore(true)
                }
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[])
    return(
        <>
         {(bandera!=null | numRoles == 1)?(
           <div>   
           <nav className="navbar navbar-light justify-content-between" id="cabecera">
               <h1> Sistema de Cotizaciones </h1>
               <div>
                   <li className="nav-container--item dropdown" id="person">
                           <div className="dropdown">
                               <button type="button" className="btn btn-default dropdown-toggle" id="userButton">
                                    <PersonCircle id="userImg"/> 
                                    <label>{userName} <br></br>{userRol}</label>
                                </button>
                                <div className="dropdown-content" >
                                        <button type="button" className="btn btn-default dropdown-item" id="userDrop"
                                        onClick={()=>{
                                            history.replace("/perfil")
                                        }}>
                                            <PersonFill height={20} width={20}/> Mi Perfil
                                        </button>
                                        {roleMore && 
                                            <button type="button" className="btn btn-default dropdown-item" id="userDrop"
                                            onClick={()=>{
                                                setAbrirRoles(true)
                                            }}>
                                                <PersonBadgeFill height={20} width={20}/> Cambiar Rol
                                            </button>
                                        }     
                                    <button onClick={cerrarSesion} type="button" className="btn btn-default dropdown-item" id="userDrop">
                                        <BoxArrowRight height={20} width={20}/> Cerrar Sesion
                                    </button>
                                </div>
                                <ModalSeleccionRol
                                abrirRoles={abrirRoles}
                                cerrarModalRoles={cerrarModalRoles}
                                updateRol={updateRol}
                                />
                           </div>
                    </li>
               </div>
           </nav>
               <ul className="nav nav-pills justify-content-center" id="navmenu">
                   {home &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" to="/home"><HouseDoorFill style={{height:'23px',width:'23px'}}/></NavLink>
                       </li>
                   }
                   {/* {perfil &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" type="button" to="/perfil">Mi Perfil</NavLink>
                       </li>
                   } */}
                   {realizarSolicitudesAdqui &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" type="button" to={`/SolicitudesDeAdquisicion/${idUnitS}/${nameUnitS}`}>Solicitudes De Adquisicion</NavLink>
                       </li>
                   }
                   {verSolicitudesAdqui &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" to={`/SolicitudesDeAdquisicionAdmin/${idUnitA}`}>Solicitudes De Adquisicion</NavLink>
                       </li>
                   }
                   {(adminitrarUsuario || administrarRoles) &&
                       <li className="nav-container--item dropdown">
                           <div className="dropdown">
                               <button className="dropbtn nav-link dropdown-toggle">Administrar accesos</button>
                                   <div className="dropdown-content">
                                       {adminitrarUsuario &&
                                       <NavLink className="dropdown-item" to="/user">Usuarios</NavLink>
                                       }
                                       {administrarRoles &&
                                       <NavLink className="dropdown-item" to="/roles">Rol de Usuarios</NavLink>
                                       }
                                   </div>
                           </div>
                           
                       </li>
                   }
                   { UnidadesAdministrativas &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" to="/UnidadesAdministrativas">Unidades Administrativas</NavLink>
                       </li>
                   }
                   { administrarUnidadesdeGasto ? (
                       <li className="nav-container--item">
                           <NavLink className="nav-link" to="/unidadesDeGasto">Unidad de Gasto</NavLink>
                       </li>):(<div/>)
                   }
                   { Empresa &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" to="/empresas">Empresas</NavLink>
                       </li>
                   }
                   { decargaFormularioCoti &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" to="./SolicitudDeCotización.pdf" download>Descargar Formulario</NavLink>
                       </li>
                   }
                   { decargaFormularioAdqui &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" type="button" to="./SolicitudDeAdquisicion.pdf" download>Descargar Formulario</NavLink>
                       </li>
                   }
                   { admiMontoLimite &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" to={`/montoLimite/${idUnitA}`}>Monto Limite</NavLink>
                       </li>
                   }
                   { personal &&
                       <li className="nav-container--item">
                           <NavLink className="nav-link" to={`/personal/${idUnitA}/${idUnitS}`}>Personal</NavLink>
                       </li>
                   }
               </ul>
               </div>
               
         ):(
            <div> 
                <ModalSeleccionRol
                abrirRoles={abrirRoles}
                cerrarModalRoles={cerrarModalRoles}
                updateRol={updateRol}
                setRolEntrante={setRolEntrante}
                />
                <nav className="navbar navbar-light justify-content-between" id="cabecera">
                <h1> Sistema de Cotizaciones </h1>
                <div>
                <li className="nav-container--item dropdown" id="person">
                <div className="dropdown">
                    <button type="button" className="btn btn-default dropdown-toggle" id="userButton">
                        <PersonCircle id="userImg"/> 
                        <label>{userName} <br></br>{userRol}</label>
                    </button>
                    <div className="dropdown-content" >
                        {roleMore && 
                            <button type="button" className="btn btn-default dropdown-item" id="userDrop"
                            onClick={()=>{
                                setAbrirRoles(true)
                            }}>
                                <PersonBadgeFill height={20} width={20}/> Cambiar Rol
                            </button>
                        }     
                        <button onClick={cerrarSesion} type="button" className="btn btn-default dropdown-item" id="userDrop">
                            <BoxArrowRight height={20} width={20}/> Cerrar Sesion
                        </button>  
                    </div>
                    <ModalSeleccionRol
                    abrirRoles={abrirRoles}
                    cerrarModalRoles={cerrarModalRoles}
                    updateRol={updateRol}
                    />
                </div>
                </li>
                    
              </div>
              </nav>
                <ul className="nav nav-pills justify-content-center" id="navmenu">
                    {home &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" to="/home"><HouseDoorFill style={{height:'23px',width:'23px'}}/></NavLink>
                        </li>
                    }
                    {perfil &&
                        <li className="nav-container--item">
                            <NavLink className="nav-link" type="button" to="/perfil">Mi Perfil</NavLink>
                        </li>
                    }
                </ul>
                
            </div> 
         )}
        </>
    );
}

export default MenuNavegacion;