import React, { useRef, useState,useEffect} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { getFacultyAdmin } from '../../services/Http/FacultyService';
import { getAdmins } from '../../services/Http/UserService';
import { createUnidadAdministrativa } from '../../services/Http/UniAdministrativaService';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert'
function ModalRegistroUnidadAdministrativa( props ){

    const {register, formState: { errors }, handleSubmit, reset } = useForm();
    const [ nameUnidadAdministrativa, setNameUnidadAdministrativa ] = useState("");
    const [ facultades, setFacultades ] = useState([]);
    const [ flag, setFlag] = useState(false);
    const [ admins, setAdmins] = useState([]);
    const [ idAdmin, setIdAdmin ] = useState("");
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
        props.closeModalRUA()
        props.updateAdministrativas();
        setNameUnidadAdministrativa("")
        setIdAdmin("")
        updateFacultades()
        updateAdmins()
        reset()
    };
    const updateAdmins = ()=>{
        setFlag(!flag);
    }
    const updateFacultades = ()=>{
        setFlag(!flag);
    }
    const alertMessage = (message) => {
        swal({
            text: message,
            icon: "success",
            button: "Ok",
          });
    };
    const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            setNameUnidadAdministrativa(
                event.target.value.substring(1)
            );
        }else{
            setNameUnidadAdministrativa(
                event.target.value
            );
        } 
    };

    const saveData = async(data, e) => {
        try{ 
            console.log("Unidad:",data.nameUnidadAdministrativa,"Facultad:",data.selectFacultad,"IdAdmin:",data.idUser);
            const res = await createUnidadAdministrativa({name:data.nameUnidadAdministrativa,faculties_id:data.selectFacultad,idUser:data.idUser});
            alertMessage(res.message)
            closeModal();
        }catch(error){
            console.log( error )
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFacultyAdmin();
                setFacultades(response.facultades);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [setFacultades,flag]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAdmins();
                setAdmins(response.users);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [setAdmins,flag]);

    return(
        <>
            <Modal isOpen={props.isShowModalRegistroUA} style={modalStyles}>
                <form onSubmit={handleSubmit(saveData)}>
                    <ModalHeader toggle={closeModal}>
                    Agregar Unidad Administrativa
                    </ModalHeader> 
                    <div className="modal-body">
                    <div className="form-rom">
                        <div className="form-group col-md-12">
                            <h6>Nombre de Unidad:</h6>
                                <input
                                    name="nameUnidadAdministrativa"
                                    {...register("nameUnidadAdministrativa",{
                                        required:"Campo requerido",
                                        minLength:{
                                            value:3,
                                            message:"Este campo debe tener entre 3 y 50 caracteres"
                                        },
                                        maxLength:{
                                            value:50,
                                            message:"Este campo debe tener entre 3 y 50 caracteres"
                                        },
                                        pattern:{
                                            value: /^[Ññíóáéú. a-zA-Z ]+$/,
                                            message:"El campo solo permite caracteres alfabeticos"
                                        }
                                    })}
                                    className="form-control"
                                    type="text"
                                    value={nameUnidadAdministrativa}
                                    onChange={ handleInputChange }
                                ></input>
                                {errors.nameUnidadAdministrativa && <span className="text-danger text-small d-block mb-2">{errors.nameUnidadAdministrativa.message}</span>}
                        </div>
                        <div className="form-group col-md-12">
                            <h6>Facultad:</h6>
                            <select 
                            name="selectFacultad"
                            {...register("selectFacultad",{
                                required:"Seleccione facultad"
                            })}
                            className="form-control">
                                <option value="">Seleccione la facultad</option>
                                {
                                    facultades.map((facultad)=>{
                                        return(
                                            <option value={facultad.id}>{facultad.nameFacultad}</option>   
                                        )
                                    })
                                }
                            </select>
                            {errors.selectFacultad && <span className="text-danger text-small d-block mb-2">{errors.selectFacultad.message}</span>}
                        </div>
                        <div className="form-group col-md-12">
                            <h6>Administrador de Unidad:<label style={{color:'silver'}}>(opcional)</label></h6>
                                <select 
                                name="idUser"
                                {...register("idUser")}
                                className="form-control">
                                    <option value="">Seleccione Administrador</option>
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
                    </div>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal"
                            onClick={closeModal}>Cancelar</button>
                        <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                    </ModalFooter>  
                </form>
            </Modal>
        </>
    );
}

export default ModalRegistroUnidadAdministrativa;