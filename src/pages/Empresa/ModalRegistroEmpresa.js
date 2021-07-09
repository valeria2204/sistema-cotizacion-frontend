
import React,{useState} from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { createBusiness }  from '../../services/Http/BussinessService'

const ModalRegistroEmpresa = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [empresa, setEmpresa]  = useState({nameEmpresa:"", nit:"", email:"", phone:"", direction:"", rubro:""});
    
    const onSubmit = async (data) => {
        const res = await createBusiness(empresa);
        if(res.message){
            swal({
                title: res.message,
                button: "Aceptar",
            });
        }
        props.updateEmpresas()
        closeModal()
    };

    const validateEmail = (e) => {
        const reg = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        if(/@/.test(e)){
            if (reg.exec(e)!=null) {
                return true
            }else{
                return "Este campo solo acepta caracteres alfanuméricos y especiales como el @ (arroba) .(punto) - (guión) y _ (guión bajo)"
            }
        }else{
            return "Este campo debe tener el carácter @"
        }
    };

    const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            setEmpresa({
                ...empresa,
                [event.target.name] : event.target.value.substring(1)
            });
        }else{
            setEmpresa({
                ...empresa,
                [event.target.name] : event.target.value
            });
        } 
    };

    const closeModal = () => {
        props.cerrarModal();
        setEmpresa({nameEmpresa:"", nit:"", email:"", phone:"", direction:"", rubro:""});
        reset()
    }

    return (
        <>
        <Modal isOpen={props.abierto}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={ closeModal }>
            Registrar Empresa
            </ModalHeader>  
            <ModalBody>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <h5>Nombre Empresa:</h5>
                        <input
                        name="nameEmpresa" 
                        {...register("nameEmpresa",{
                            required:"Campo requerido",
                            minLength:{
                                value:3,
                                message:"Este campo debe tener entre 3 y 50 caracteres"
                            },
                            maxLength:{
                                value:50,
                                message:"Este campo debe tener entre 3 y 50 caracteres"
                            }
                        })}
                        value={empresa.nameEmpresa}
                        type="text" 
                        className="form-control"
                        onChange={ handleInputChange }
                        ></input>
                        {errors.nameEmpresa && <span className="text-danger text-small d-block mb-2">{errors.nameEmpresa.message}</span>}
                    </div>
                    <div className="form-group col-md-6">
                        <h5>NIT:</h5>
                        <input 
                        name="nit"
                        {...register("nit",{
                            required:"Campo requerido",
                            pattern:{
                                value:/^[0-9]+$/,
                                message:"Este campo solo acepta valores numéricos"
                            },
                        })}
                        value={empresa.nit}
                        type="text" 
                        className="form-control" 
                        onChange={ handleInputChange }
                        ></input>
                        {errors.nit && <span className="text-danger text-small d-block mb-2">{errors.nit.message}</span>}
                    </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                        <h5>Correo:</h5>
                        <input 
                        name="email"
                        {...register("email",{
                            required:"Campo requerido",
                            validate:{
                                value:(value)=>validateEmail(value)
                            },
                            minLength:{
                                value:11,
                                message:"Este campo debe tener mínimo 11 caracteres"
                            },
                        })}
                        value={empresa.email}
                        type="text" 
                        className="form-control" 
                        onChange={ handleInputChange }
                        ></input>
                        {errors.email && <span className="text-danger text-small d-block mb-2">{errors.email.message}</span>}
                    </div>
                    <div className="form-group col-md-6">
                        <h5>Telefono:</h5>
                        <input 
                        name="phone"
                        {...register("phone",{
                            required:"Campo requerido",
                            minLength:{
                                value:7,
                                message:"Este campo debe tener entre 7 y 8 números"
                            },
                            maxLength:{
                                value:8,
                                message:"Este campo debe tener entre 7 y 8 números"
                            },
                            pattern:{
                                value:/^[0-9]+$/,
                                message:"Este campo solo acepta valores numéricos"
                            },
                        })}
                        value={empresa.phone}
                        type="text" 
                        className="form-control" 
                        onChange={ handleInputChange }
                        ></input>
                        {errors.phone && <span className="text-danger text-small d-block mb-2">{errors.phone.message}</span>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <h5>Dirección:</h5>
                        <input
                        name="direction" 
                        {...register("direction",{
                            required:"Campo requerido",
                            minLength:{
                                value:3,
                                message:"Este campo debe tener entre 3 y 60 caracteres"
                            },
                            maxLength:{
                                value:60,
                                message:"Este campo debe tener entre 3 y 60 caracteres"
                            },
                        })}
                        value={empresa.direction}
                        type="text" 
                        className="form-control" 
                        onChange={ handleInputChange }
                        ></input>
                        {errors.direction && <span className="text-danger text-small d-block mb-2">{errors.direction.message}</span>}
                    </div>
                    <div className="form-group col-md-6">
                        <h5>Rubro:</h5>
                        <input
                        name="rubro" 
                        {...register("rubro",{
                            required:"Campo requerido",
                            minLength:{
                                value:5,
                                message:"Este campo debe tener entre 5 y 30 caracteres"
                            },
                            maxLength:{
                                value:30,
                                message:"Este campo debe tener entre 5 y 30 caracteres"
                            },
                            pattern:{
                                value: /^[Ññíóáéú a-zA-Z ]+$/,
                                message:"Este campo solo acepta caracteres alfabéticos"
                            }
                        })}
                        value={empresa.rubro}
                        type="text" 
                        className="form-control"
                        onChange={ handleInputChange }
                        ></input>
                        {errors.rubro && <span className="text-danger text-small d-block mb-2">{errors.rubro.message}</span>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col" id="toolbar">
                        <button type="button" className="btn btn-secondary" onClick={closeModal} id="btnV">Cancelar</button>
                        <button type="submit" className="btn btn-primary" id="btnV">Guardar</button>
                    </div>
                </div>
            </ModalBody>
        </form>
        </Modal> 
        </>
    )
}

export default ModalRegistroEmpresa;