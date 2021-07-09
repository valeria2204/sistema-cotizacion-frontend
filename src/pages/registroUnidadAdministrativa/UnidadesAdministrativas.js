  import React, { useState, useRef, useEffect } from 'react'
import { PlusCircle, PencilSquare } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form';
import ModalRegistroUnidadAdministrativa from './ModalRegistroUnidadAdministrativa'
import {getUnidadesAdministrativas} from '../../services/Http/UniAdministrativaService'
import ModalEditarUA from './ModalEditarUA'
function UnidadesAdministrativas() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {reset} = useForm();
    const [ administrativeUnits, setAdministrativeUnits ] = useState([])
    const [ administrativeUnit, setAdministrativeUnit] = useState({name:"",faculty:"",admin:[{id:"",name:"",lastName:""}]});
    const [ isShowModalRegistroUA,setIsShowModalRegistroUA ] = useState(false)
    const [abrirEditor, setAbrirEditor] = useState(false);
    const [flag, setFlag] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredAdministrative, setFilteredAdministrative] = useState([]);
    const closeModalRUA = () => {
        setIsShowModalRegistroUA( false );
    };
   const cerrarEditor = () => {
        setAbrirEditor( false );
    }
    const updateAdministrativas = ()=>{
        setFlag(!flag);
    }
    // Unit admin de BD
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getUnidadesAdministrativas();
            setAdministrativeUnits(response.Administrative_unit);
        } catch (error) {
            console.log(error);
        }
        };
    fetchData();
    }, [setAdministrativeUnits,flag]);
    useEffect(() => {
        setFilteredAdministrative(
            administrativeUnits.filter((unit) =>
                unit.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search,administrativeUnits]);

    return(
        <>
            <div className="container" align="left">
                        <br></br>
                        <h1>Unidades Administrativas</h1>
                        <br></br>
                    <div className="row">
                        <div className="col-6">
                            <input {...register("unit", { required: true })}
                                    className="form-control"
                                    placeholder="Ingrese nombre de unidad administrativa" 
                                    aria-label="Search"
                                    type="search"
                                    id = "search"
                                    onChange = {(e) => setSearch(e.target.value)}                                    
                                /> 
                        </div>
                        <div className="col-6" align="right">
                            <button type="button" className="btn btn-success my-2 my-sm-0" onClick={() => setIsShowModalRegistroUA(true)}> 
                            <PlusCircle  className="mb-1"/> Nuevo </button>
                        </div>
                    </div>
                    <ModalRegistroUnidadAdministrativa isShowModalRegistroUA={ isShowModalRegistroUA } closeModalRUA = {closeModalRUA} updateAdministrativas={updateAdministrativas}/>
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
                                        filteredAdministrative.map((administrativeUnit,index)=>{
                                            return(
                                                <tr>
                                                <td>{index+1}</td>
                                                <td>{administrativeUnit.name}</td>
                                                <td>{administrativeUnit.faculty}</td>
                                                <td>{administrativeUnit.admin[0].name} {administrativeUnit.admin[0].lastName}</td>
                                                <td><button className="btn  btn-warning" 
                                                        onClick={()=>{
                                                            setAbrirEditor(true)
                                                            setAdministrativeUnit(administrativeUnit)
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
            <ModalEditarUA
                abrirEditor={ abrirEditor }
                administrativeUnit ={ administrativeUnit }
                cerrarEditor = {cerrarEditor}
                updateAdministrativas= {updateAdministrativas}
            />
        </>
    );
};

export default UnidadesAdministrativas;