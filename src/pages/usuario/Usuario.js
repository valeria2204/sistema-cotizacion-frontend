import React,{useEffect, useState} from  'react'
import { useForm } from "react-hook-form";
import { PencilSquare, PlusCircle } from 'react-bootstrap-icons';
import {Button} from 'reactstrap';
import { getUsers } from '../../services/Http/UserService' ;
import ModalEditarUsuario from './ModalEditarUsuario';
import ModalAgregarUsuario from './ModalAgregarUsuario';
function Usuario(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);
    const [flag, setFlag] = useState(false);
    const [ isShowModalEditarU, setIsShowModalEditarU ] = useState(false)
    const [ isShowModalAgregarU, setIsShowModalAgregarU ] = useState(false)
    const [user, setUser ] = useState({name:"",lastName:"",ci:"",phone:"",direction:"",email:"",userName:"",userRol:""})
    const [search, setSearch] = useState("");
    const [filteredUser, setFilteredUser] = useState([]);
    const updateUsers = ()=>{
        setFlag(!flag);
    }
    const openModalAgregarU= () => {
        setIsShowModalAgregarU( true );
    }
    const CloseModalEditarU = () => {
        setIsShowModalEditarU( false );
    };
    const CloseModalAgregarU = () => {
        setIsShowModalAgregarU( false );
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getUsers();
            setUsers(response.users);
            console.log(response.users)
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, [setUsers,flag]);;
    useEffect(() => {
        setFilteredUser(
            users.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search,users]);
    return(
        <>
            <div className="container" align="left">
                    <br></br>
                    <h1>Usuarios</h1>
                    <br></br>
                <div className="row">
                    <div className="col-6">
                       <input {...register("usuario", { required: true })}
                        className="form-control"
                        placeholder="Ingrese nombre de usuario" 
                        aria-label="Search"
                        type="search"
                        id = "search"
                        onChange = {(e) => setSearch(e.target.value)}                                    
                        /> 
                    </div>
                    <div className="col-6" align="right">
                    <Button color="success" onClick={openModalAgregarU}><PlusCircle className="mr-1"/>Nuevo</Button>
                    </div>
                </div>
                <ModalAgregarUsuario isShowModalAgregarU={ isShowModalAgregarU } CloseModalAgregarU={ CloseModalAgregarU } updateUsers={ updateUsers }/>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Carnet de Identidad</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Rol de Usuario</th>
                                <th scope="col">Modificar</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                   filteredUser.map((user,index)=>{
                                        return (
                                            <tr key={user.id}>
                                                <td scope="row">{index+1}</td>
                                                <td>{user.name} {user.lastName}</td>
                                                <td>{user.ci}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.email}</td>
                                                <td>{user.userRol}</td>
                                                <td><button className="btn  btn-warning" 
                                                        onClick={()=>{
                                                            setIsShowModalEditarU(true)
                                                            setUser(user)
                                                        }}
                                                        style={{color:'white', backgroundColor:'orange'}}
                                                    ><PencilSquare/></button>
                                                </td>
                                            </tr>
                                        );
                                   })
                               }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalEditarUsuario isShowModalEditarU={ isShowModalEditarU } user={ user } CloseModalEditarU={CloseModalEditarU} updateUsers={updateUsers}
            />
        </>
    );
}

export default Usuario;