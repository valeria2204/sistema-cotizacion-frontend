import React,{useEffect, useState} from  'react'
import {useForm} from "react-hook-form";
import {PlusCircle, PencilSquare} from 'react-bootstrap-icons';
import RolDeUser from './RolDeUser';
import EditarRol from './EditarRol';
import {getRols} from '../../services/Http/RolService'
import {Button} from 'reactstrap';
import { getPermissions } from '../../services/Http/PermissionService'
function ListaRoles(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ abierto, setAbierto ] = useState(false);
    const [ rols, setRols ] =useState([]);
    const [ flag, setFlag] = useState(false);
    const [ rol, setRol ] = useState({nameRol:"",description:"",permissions:[]})
    const [ permissions, setPermissions] = useState("");
    const [ abrirEditor, setAbrirEditor] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredRol, setFilteredRol] = useState([]);
    const OpenModalRR = () => {
        setAbierto(true);
    };
    const CloseModalRR = () => {
        setAbierto(false);
    };
    const cerrarEditor = () => {
        setAbrirEditor( false );
        updateRols();
    }
    const updateRols = ()=>{
        setRol({nameRol:"",description:"",permissions:[]});
        setFlag(!flag);
    }
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getRols();
            setRols(response.roles);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, [setRols,flag] );

    useEffect(() => {
        setFilteredRol(
            rols.filter((rol) =>
                rol.nameRol.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search,rols]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getPermissions();
            setPermissions(response.permissions);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, []);
    return(
        <>
            <div className="container" align="left">
                    <br></br>
                    <h1>Roles</h1>
                    <br></br>
                    <div className="row">
                        <div className="col-6">
                            <input {...register("rol", { required: true })}
                                className="form-control"
                                placeholder="Ingrese rol" 
                                aria-label="Search"
                                type="search"
                                id = "search"
                                onChange = {(e) => setSearch(e.target.value)}                                    
                                /> 
                        </div>
                        <div className="col-6" align="right">
                             <Button color="success" onClick={OpenModalRR}><PlusCircle className="mr-1"/>Nuevo</Button>
                         </div>
            </div>
            <RolDeUser abierto={ abierto } CloseModalRR={CloseModalRR} updateRols={updateRols} /> 
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredRol.map((rol,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td scope="row">{index+1}</td>
                                                <td>{rol.nameRol}</td>
                                                <td>{rol.description}</td>
                                                <td><button className="btn  btn-warning" 
                                                        onClick={()=>{
                                                            setAbrirEditor(true)
                                                            setRol(rol)
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
            <EditarRol 
            abrirEditor={ abrirEditor }
            rol={ rol }
            permissions={permissions}
            cerrarEditor = {cerrarEditor}
            updateRols= {updateRols}
        /> 
        </>
    );
}

export default ListaRoles;