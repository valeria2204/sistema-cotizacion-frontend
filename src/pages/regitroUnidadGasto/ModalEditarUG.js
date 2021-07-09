import React,{useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { updateBossUG } from '../../services/Http/UniGastoService';
import { useForm } from "react-hook-form";
import { getAdminsUG } from '../../services/Http/UserService';
import swal from 'sweetalert';
function ModalEditarUG (props){
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ admins, setAdmins] = useState([]);
    const [ flag, setFlag] = useState(false);
    const [ idAdmin, setIdAdmin ] = useState("");
    const [ admin, setAdmin] = useState({id:"",name:"",lastName:""})
    // const [ admins, setAdmins] = useState([
    //     {id:1 , name:"Rodrigo Cespedes"},
    //     {id:2 , name:"Yurguen Pariente"},
    //     {id:3 , name:"Ramiro Saavedra"},
    // ]);
    const modalStyles={
        top:"10%",
        transfrom: 'translate(-50%, -50%)'
    }
    const closeModal = () => {
        props.cerrarEditor()
        props.updateGastos()
        updateAdmins()
        setIdAdmin("")
        reset()
    }
    const updateAdmins = ()=>{
        setFlag(!flag);
    }
    const handleSelectChange = (event) => {
        setIdAdmin(event.target.value)
    };
    const alertMessage = (message,icono) => {
        swal({
            text: message,
            icon: icono,
            button: "Ok",
          });
    };
    const mostrarAdmin = () =>{
        if(props.gasto.admin.id = ""){
            setAdmin("Seleccione Administrador")
        }else{
            setAdmin(props.gasto.admin)
        }
        return admin;
    }
    const onSubmit = async (data) => {
        try{
            if(idAdmin != ""){  
                console.log("IdAdminNuevo:",data.admin_id,"IdUnidad:",props.gasto.id);
                const res = await updateBossUG(data.admin_id,props.gasto.id);
                alertMessage("Se realizo el cambio exitosamente","success")
                closeModal()
            }else{
                alertMessage("No realizo cambios","warning")
                console.log("es el mismo id:",idAdmin)
            }
        }catch(error){
            console.log( error )
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAdminsUG();
                setAdmins(response.users);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [setAdmins,flag]);
    
    return (
        <>
        <Modal isOpen={props.abrirEditor} style={modalStyles}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={closeModal}>
            Editar Unidad de Gasto
            </ModalHeader>  
            <ModalBody>
            <div className="form-rom">
                <div className="form-group col-md-12">
                    <h6>Nombre de Unidad de Gasto:</h6>
                        <input
                            name="nameUnidadGasto"
                            className="form-control"
                            type="text"
                            value={props.gasto.nameUnidadGasto}
                            disabled
                        ></input>
                </div>
                <div className="form-group col-md-12">
                    <h6>Facultad:</h6>
                <select 
                    name="faculties_id"
                    className="form-control"
                    disabled>
                        <option value="">{props.gasto.faculty}</option>
                    </select>
                </div>
                <div className="form-group col-md-12">
                    <h6>Administrador de Unidad:</h6>
                    <select 
                    id="admin_id"
                    name="admin_id"
                    {...register("admin_id")}
                    className="form-control"
                    onClick={handleSelectChange}>
                        <option id="admi" value="" >{props.gasto.admin[0].name} {props.gasto.admin[0].lastName}</option>
                        {
                            admins.map((administrador)=>{
                                return(
                                    <option value={administrador.id}>{administrador.name} {administrador.lastName}</option>   
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal"
                    onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
            </ModalFooter>  
        </form>
        </Modal> 
        </>
    )
}

export default ModalEditarUG