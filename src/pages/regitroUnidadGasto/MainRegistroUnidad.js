import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import RegistroUnidadGastoModal from './RegistroUnidad'
import {Button} from 'reactstrap';
import {PlusCircle, PencilSquare} from 'react-bootstrap-icons';
import {getUnidadesGastos} from '../../services/Http/UniGastoService';
import ModalEditarUG from './ModalEditarUG'
const MainRegistroUnidad = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [abierto, setAbierto] = useState(false);
    const [abrirEditor, setAbrirEditor] = useState(false);
    const [unidadesGasto, setUnidadesGasto] = useState([]);
    const [gasto, setGasto] = useState({nameUnidadGasto:"",faculty:[{id:"",nameFacultad:""}],admin:[{id:"",name:"",lastName:""}]});
    const [flag, setFlag] = useState(false);
    const [administrador, setAdministrador] = useState({id:"",name:"",lastName:""})
    const [search, setSearch] = useState("");
    const [filteredUnidad, setFilteredUnidad] = useState([]);
    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    const updateGastos = ()=>{
        setFlag(!flag);
    }
    const cerrarEditor = () => {
        setAbrirEditor( false );
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getUnidadesGastos();
            setUnidadesGasto(response.spending_units);
        } catch (error) {
            console.log(error);
        }
        };

        fetchData();
    }, [setUnidadesGasto,flag]);
    useEffect(() => {
        setFilteredUnidad(
            unidadesGasto.filter((unit) =>
                unit.nameUnidadGasto.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search,unidadesGasto]);
    return (
        <>
            <div className="container" align="left">
                <br></br>
                <h1>Unidades de Gasto</h1>
                <br></br>
                <div className="row">
                    <div className="col-6">
                        <input {...register("unidad", { required: true })}
                                className="form-control"
                                placeholder="Ingrese nombre de unidad administrativa" 
                                aria-label="Search"
                                type="search"
                                id = "search"
                                onChange = {(e) => setSearch(e.target.value)}                                    
                        />
                    </div>
                    <div className="col-6" align="right">
                    {/*  Botom para abrir el modal*/}
                    <Button color="success" onClick={abrirModal}><PlusCircle className="mr-1"/>Nuevo</Button>
                    </div>
                </div>
                {/* Modal de registro de undiad de gasto */}
                <RegistroUnidadGastoModal abierto={abierto} cerrarModal={cerrarModal} updateGastos={updateGastos}/>
                <br></br>
                <div className="form-register">             
                    <div className="form-row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Facultad</th>
                                    <th scope="col">Encargado</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredUnidad.map((gasto,index)=>{
                                        return(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{gasto.nameUnidadGasto}</td>
                                                <td>{gasto.faculty}</td>
                                                <td>{gasto.admin[0].name} {gasto.admin[0].lastName}</td>
                                                <td><button className="btn  btn-warning" 
                                                        onClick={()=>{
                                                            setAbrirEditor(true)
                                                            setGasto(gasto)
                                                        }}
                                                        style={{color:'white', backgroundColor:'orange'}}
                                                    ><PencilSquare/></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalEditarUG
                abrirEditor={ abrirEditor }
                gasto={ gasto }
                cerrarEditor = {cerrarEditor}
                updateGastos= {updateGastos}
            />
        </>
    )
}

export default MainRegistroUnidad