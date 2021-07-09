import React,{useState,useEffect} from 'react'
import {Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import {PlusCircle} from 'react-bootstrap-icons';
import ModalRegistroEmpresa from './ModalRegistroEmpresa';
import { getEmpresas } from '../../services/Http/BussinessService';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


function ListaEmpresa(){
    const { register } = useForm();
    const [empresas, setEmpresas] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredBusniss, setFilteredBusniss] = useState([]);
    const [abierto, setAbierto] = useState(false);
    const [flag, setFlag] = useState(false);
    

    const abrirModal =()=>{
        setAbierto(true);
    }
    const cerrarModal=()=>{
        setAbierto(false);
    }
    const updateEmpresas = ()=>{
        setFlag(!flag);
    };
    

    //cargar datos de API
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await getEmpresas();
                setEmpresas(response.business);
                
            } catch (error) {
                console.log(error);
            }
            };
            fetchData();
    }, []);

    useEffect(() => {
        setFilteredBusniss(
            empresas.filter((empresa) =>
                empresa.rubro.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search,empresas]);
      
    return (
        <div className="container" align="left">
            <br></br>
                <h1>Empresas</h1>
            <br></br>
            <div className="form-row">
                <div className="col-6">                                
                    <input {...register("rubro", { required: true })}
                        className="form-control"
                        placeholder="Ingrese rubro" 
                        aria-label="Search"
                        type="search"
                        id = "search"
                        onChange = {(e) => setSearch(e.target.value)}                                    
                        />
                </div>
                <div className="col-6" align="right">
                {/*  Boton para abrir el modal*/}
                <Button color="success" onClick={abrirModal}><PlusCircle className="mr-1"/> Agregar Empresa</Button>
                </div>
            </div>
            <br></br>
            <div className="form-row">
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">NIT</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Rubro</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {filteredBusniss.map((busine, idx) => (
                            <tr key={busine.id}>
                                <td scope="row">{idx+1}</td>
                                <td>{busine.nameEmpresa}</td>
                                <td>{busine.nit}</td>
                                <td>{busine.direction}</td>
                                <td>{busine.phone}</td>
                                <td>{busine.email}</td>
                                <td>{busine.rubro}</td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal de registro de empresa */}
            <ModalRegistroEmpresa abierto={ abierto } cerrarModal={ cerrarModal } updateEmpresas={ updateEmpresas }/>
            <br></br>
        </div>
    );
}

export default ListaEmpresa
