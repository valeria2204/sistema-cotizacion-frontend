import React,{useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import { useForm } from "react-hook-form";
import {createMontoLimite, updateMontoLimite} from '../../services/Http/MontoLimiteService';

const MontoLimiteModal = (props) => {
    
    const modalStyles={
        top:"20%",
        transfrom: 'translate(-50%, -50%)',
        width:'400px'
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const closeModal = () => {
        reset()
        props.cerrarModal()
    }
    
    const onSubmit = async (data) => {
        const fecha = new Date();
        const newFecha = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate();
        const res = await updateMontoLimite({monto:data.monto,starDate:newFecha,steps:fecha.getFullYear(), administrative_units_id:props.idUA});
        console.log({monto:data.monto,starDate:newFecha,steps:fecha.getFullYear(), administrative_units_id:props.idUA})
        props.updateLimitAmout();
        closeModal()
        console.log(res);
    }
    return (
    <Modal isOpen={props.abierto} style={modalStyles}>
        <ModalHeader toggle={closeModal}>
            Actualizar Monto Limite
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}> 
        <ModalBody>
            <FormGroup className="col-md-8">
               <Label for="monto">
                    Monto Limite:
               </Label>
                <input name="monto" 
                {...register("monto", 
                { required:"este campo es requerido",
                    min:{
                        value:1,
                        message:"dato invalido"
                    },
                    max:{
                        value:100000,
                        message:"dato invalido"
                    }
                })} 
                className="form-control"
                type="number"
                />
                {errors.monto && <span className="text-danger text-small d-block mb-2">{errors.monto.message}</span>}
            </FormGroup>
        </ModalBody>  
        <ModalFooter>
            <Button  onClick={closeModal} >Cancelar</Button>
            <Button type="submit" color="primary">Guardar</Button>
        </ModalFooter>
        </form>
    </Modal> 
    )
}

export default MontoLimiteModal
