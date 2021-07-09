
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './AgregarDetalleSolicitud.css'
import { Modal, ModalHeader, ModalBody} from 'reactstrap';

function ModalAgregarAdquisicion(props){

    const {register, formState: { errors }, handleSubmit, reset} = useForm();
    const [ detail, setDetail] = useState({amount:null, unitMeasure:"", description:""})

    const closeModal = () => {
        reset();
        setDetail({
            amount:"", 
            unitMeasure:"", 
            description:""
        })
        props.cerrarModal()
    }

    const handleInputChange = (event) => {
        console.log("cambio",event.target.value[0])
        if(event.target.value[0]==" "){
            console.log("primer",event.target.value[0])
            setDetail({
                ...detail,
                [event.target.name] : event.target.value.substring(1)
            });
        }else{
            setDetail({
                ...detail,
                [event.target.name] : event.target.value
            });
        }
    };

    const handleInputAmount = (event) => {
        console.log("number",event.target.value)
        setDetail({
            ...detail,
            [event.target.name] : event.target.value
        });
    }

    const saveDetail = () => {
        props.updateDetails(detail)
        console.log("modal",detail)
        setDetail({
            amount:"", 
            unitMeasure:"", 
            description:""
        })
        closeModal();
    };

    return(
        <div>
            <Modal isOpen={props.abierto}>
                <ModalHeader toggle={closeModal}>
                    <h4>Agregar Compra/Alquiler</h4>
                </ModalHeader>
                <ModalBody>
                <form onSubmit={handleSubmit(saveDetail)}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Cantidad:</label>
                            <input
                            name="amount"
                            {...register("amount",{
                                required:"El campo es requerido",
                                min:{
                                    value:1,
                                    message:"Este campo debe tener valores numéricos entre 1 y 9999"
                                },
                                max:{
                                    value:9999,
                                    message:"Este campo debe tener valores numéricos entre 1 y 9999"
                                }
                            })}
                            value={detail.amount}
                            type="number" 
                            className="form-control" 
                            onChange={ handleInputAmount }
                            ></input>
                            {errors.amount && <span className="text-danger text-small d-block mb-2">{errors.amount.message}</span>}
                        </div>
                        <div className="form-group col-md-6">
                            <label>Unidad:</label>
                            <input 
                            name="unitMeasure"
                            {...register("unitMeasure",{
                                required:"El campo es requerido",
                                minLength:{
                                    value:1,
                                    message:"Este campo debe tener entre 1 y 20 caracteres"
                                },
                                maxLength:{
                                    value:20,
                                    message:"Este campo debe tener entre 1 y 20 caracteres"
                                },
                                pattern:{
                                    value: /^[Ññíóáéú a-zA-Z/ ]+$/,
                                    message:"Este campo no permite caracteres especiales excepto el '/'"
                                }
                            })}
                            value={detail.unitMeasure}
                            type="text" 
                            className="form-control" 
                            onChange={ handleInputChange }
                            ></input>
                            {errors.unitMeasure && <span className="text-danger text-small d-block mb-2">{errors.unitMeasure.message}</span>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Descripcion:</label>
                            <textarea 
                            name="description"
                            {...register("description",{
                                required:"El campo es requerido",
                                minLength:{
                                    value:5,
                                    message:"Este campo debe tener entre 5 y 120 caracteres"
                                },
                                maxLength:{
                                    value:120,
                                    message:"Este campo debe tener entre 5 y 120 caracteres"
                                }
                            })}
                            value={detail.description}
                            className="form-control" 
                            onChange={ handleInputChange }
                            ></textarea>
                            {errors.description && <span className="text-danger text-small d-block mb-2">{errors.description.message}</span>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col" id="toolbar">
                            <button type="button" className="btn btn-secondary" onClick={closeModal} id="btnV">Cancelar</button>
                            <button type="submit" className="btn btn-primary" id="btnV">Guardar</button>
                        </div>
                    </div>
                </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalAgregarAdquisicion;