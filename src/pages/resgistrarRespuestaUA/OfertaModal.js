import React,{useState} from 'react';
import { FileEarmarkArrowUpFill } from 'react-bootstrap-icons';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup} from 'reactstrap';
import { useForm } from "react-hook-form";

const OfertaModal = (props) => {
    const modalStyles={
        top:"10%",
        transfrom: 'translate(-50%, -50%)',
        width:'400px'
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [namefile, setNamefile] = useState([])
    const [fileValidate, setFileValidate] = useState(false);
    const [fl, setFl] = useState(null);
    const closeModal = () => {
        setNamefile([])
        setFl(null)
        setFileValidate(false);
        reset()
        props.cerrarModal()
    }
    const onSubmit=(data)=>{
        if(!fileValidate){
            const formData = new FormData();
            if(fl != null){
                for(var i=0 ; i<fl.length ; i++){
                let name = 'file';
                formData.append(name,fl[i],fl[i].name);
                }
            }
            data.archivo = formData;
            props.guardarOferta(data)
            closeModal()
        }
    }
    const fileSelectHandlerDetalle =(e)=>{
        let namefileAux =[];
        let extenciones = [];
        for (let index = 0; index <e.target.files.length; index++) {
            const name = e.target.files[index].name;
            let extension = name.slice((name.lastIndexOf(".") - 1 >>> 0) + 2);
            namefileAux.push(name);
            extenciones.push(extension);
        }
        let noEsValido = true;
        let flag = false;
        extenciones.forEach(exten => {
            if(!flag){
                if(exten === 'pdf' || exten === 'png' || exten=== 'jpg' || exten === 'jpeg'){
                    noEsValido =false;
                }else{
                    noEsValido=true;
                    flag = true;
                    
                }
            }
        });
        setFileValidate(noEsValido);
        setNamefile(namefileAux);
        setFl(e.target.files);
    }
    return (
        <Modal isOpen={props.abierto} style={modalStyles}>
        <ModalHeader toggle={closeModal}>
            Agregar oferta
        </ModalHeader>
        <form > 
        <ModalBody>
            <FormGroup className="col-md-8">
            <label>Marca:</label>
            <input className="form-control form-control-sm" {...register("marca", { maxLength: 50,pattern: /^[A-Za-z ñáéíóúÁÉÍÓÚ 0-9]+$/i})} />
            <span style={{color:'red'}}>{errors.marca?.type === 'maxLength' && "Supero el numero maximo de caracteres (50)"}</span>
            <span style={{color:'red'}}>{errors.marca?.type === 'pattern' && "Solo se permiten caracteres"}</span>
            <label>Modelo:</label>
            <input className="form-control form-control-sm" {...register("modelo", { maxLength: 50,pattern: /^[A-Za-z ñáéíóúÁÉÍÓÚ 0-9]+$/i })} />
            <span style={{color:'red'}}>{errors.modelo?.type === 'maxLength' && "Supero el numero maximo de caracteres (50)"}</span>
            <span style={{color:'red'}}>{errors.modelo?.type === 'pattern' && "Solo se permiten caracteres"}</span>
            <label>Indutria:</label>
            <input className="form-control form-control-sm" {...register("industria", { maxLength: 50,pattern: /^[A-Za-z ñáéíóúÁÉÍÓÚ 0-9]+$/i })} />
            <span style={{color:'red'}}>{errors.industria?.type === 'maxLength' && "Supero el numero maximo de caracteres (50)"}</span>
            <span style={{color:'red'}}>{errors.industria?.type === 'pattern' && "Solo se permiten caracteres"}</span>
            <label>Tiempo de Garantia:</label>
            <input className="form-control form-control-sm" {...register("tiempo_garantia", { maxLength: 50,pattern: /^[A-Za-z ñáéíóúÁÉÍÓÚ 0-9]+$/i })} />
            <span style={{color:'red'}}>{errors.tiempo_garantia?.type === 'maxLength' && "Supero el numero maximo de caracteres (50)"}</span>
            <span style={{color:'red'}}>{errors.tiempo_garantia?.type === 'pattern' && "Solo se permiten caracteres"}</span>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
                {namefile.map((name,index)=>{
                    return(
                        <li key={index}>{name}</li>
                    )
                })}
            <div style={{width:'100%',height:'35px', display:'flex',justifyContent:'space-between'}}>
            <div className="">
                <input 
                    name="archivo"
                    type="file" 
                    id="files" 
                    onChange = {fileSelectHandlerDetalle}
                ></input>
                <label for="files"><FileEarmarkArrowUpFill className="mb-1"/> Adjuntar archivo</label>
            </div>
            <Button type="button" onClick={handleSubmit(onSubmit)} color="primary" size="sm">Guardar</Button>
            </div>
            {fileValidate && <label style={{color:'red'}}>Solo se permite archivos pdf, png, jpg, jpeg</label>}
        </ModalFooter>
        </form>
    </Modal> 
    )
}

export default OfertaModal
