import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom'
import {Button} from 'reactstrap';
import {PlusCircle} from 'react-bootstrap-icons'
import {getPersonal} from '../../services/Http/UserService'
import {getPersonalUG} from '../../services/Http/UserService'

function ListaPersonal(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {idUA} = useParams();
    const {idUS} = useParams();
    const [flag, setFlag] = useState(false);
    const [personal, setPersonal] =useState([]);
    const [search, setSearch] = useState("");
    const [filteredPersonal, setFilteredPersonal] = useState([]);
    let history = useHistory();
    const updatePersonal = ()=>{
        setFlag(!flag);
    }
    function buttonPersonal(){
        history.push(`/seleccionPersonal/${idUA}/${idUS}`)
    }
    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("userDetails"));
        async function getAllUsers() {
            if (idUS === "null" ){
                const response = await getPersonal(idUA);
                setPersonal(response.users);   
                console.log("Personal",personal,idUS,idUA)
            }
            if (idUA === "null"){
                const resp = await getPersonalUG(idUS);
                setPersonal(resp.users);
                console.log("Personal",personal,idUS,idUA)
            }
        }
        getAllUsers();
    }, [setPersonal,flag]);
    useEffect(() => {
        setFilteredPersonal(
            personal.filter((person) =>
                person.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search,personal]);
    return (
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Personal</h1>
                <br></br>
                <div className="row">
                    <div className="col-6">
                    <input {...register("personal", { required: true })}
                                className="form-control"
                                placeholder="Ingrese nombre" 
                                aria-label="Search"
                                type="search"
                                id = "search"
                                onChange = {(e) => setSearch(e.target.value)}                                    
                                /> 
                    </div>
                    <div className="col-6" align="right">
                        <button type="button" className="btn btn-success my-2 my-sm-0" onClick={ buttonPersonal }> 
                        <PlusCircle  className="mb-1"/>Agregar</button>
                    </div>
                </div>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">CI</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPersonal.map((user,index) => {
                                    return(
                                        <tr key={user.id}>
                                            <td scope="row">{index+1}</td>
                                            <td>{user.name} {user.lastName}</td>
                                            <td>{user.ci}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.roles}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaPersonal