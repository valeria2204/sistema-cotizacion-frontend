import React, {useState, useEffect} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import { createRol } from '../../services/Http/RolService'
import './RolDeUser.css';
import { getPermissions } from '../../services/Http/PermissionService'
import swal from 'sweetalert';
function RolDeUser(props){
    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [ rol, setRol ] = useState({nameRol:"",description:"",permissions:[]});
    const [ permissions, setPermissions ] = useState([]);
    const [ selectedCheckboxes, setSelectedCheckboxes]=useState([]);
    const [message, setMessage] = useState("");
    const [units, setUnits] = useState([
        {id:1, typeUnit:"Unidad Administrativa"},
        {id:2, typeUnit:"Unidad de Gasto"}
    ]);
    var seleccionados =[];
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getPermissions();
            setPermissions(response.permissions);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, []);
     const handleInputChange = (event) => {
        if(event.target.value[0]==" "){
            setRol({
                ...rol,
                [event.target.name] : event.target.value.substring(1)
            });
        }else{
            setRol({
                ...rol,
                [event.target.name] : event.target.value
            });
        }
    };
    const handleChangeCheckBox = (e) => {
        let auxiliar = [];
        if(selectedCheckboxes.includes(e.target.value)){
            auxiliar=selectedCheckboxes.filter(elemento=>elemento!==e.target.value);
        }else{
            auxiliar=selectedCheckboxes.concat(e.target.value)
        }
        for (const per of auxiliar) { 
            seleccionados.push(parseInt(per));
        }
        setSelectedCheckboxes(auxiliar);
        rol.permissions = seleccionados;
    }
    const closeModal = () => {
        props.updateRols();
        props.CloseModalRR();
        setMessage("");
        setSelectedCheckboxes("");
        setRol({nameRol:"",description:"",permissions:[]});
        reset();
    }
    const alertMessage = (message,icono) => {
        swal({
            text: message,
            icon: icono,
            button: "Ok",
          });
    };
    const onSubmit = async (data)  => {
        const res = await createRol(rol);
        if(res.message == "Registro exitoso"){
            alertMessage(res.message,"success");
            closeModal();
        }else{
            alertMessage(res.message,"warning");
        }
    }
    return(
        <>
            <Modal isOpen={props.abierto} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={closeModal}>
                        Agregar Nuevo Rol
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-rom">
                        <div className="form-group col-md-12">
                            <h6>Nombre de Rol de Usuario:</h6>
                                <input
                                type="text"
                                name="nameRol"
                                {...register("nameRol",{
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
                                value={rol.nameRol}
                                onChange={ handleInputChange }
                                className ="form-control"
                                />
                                {errors.nameRol && <span className="text-danger text-small d-block mb-2">{errors.nameRol.message}</span>}
                        </div>
                       
                        <div className="form-group col-md-12">
                            <h6>Descripción de Rol:</h6>
                                <textarea
                                type="text"
                                name="description"
                                {...register("description",{
                                    required:"Campo requerido",
                                    minLength:{
                                        value:15,
                                        message:"Este campo debe tener entre 15 y 200 caracteres"
                                    },
                                    maxLength:{
                                        value:200,
                                        message:"Este campo debe tener entre 15 y 200 caracteres"
                                    }
                                })}s
                                value={rol.description}
                                onChange={ handleInputChange }
                                className ="form-control"
                                />
                                {errors.description && <span className="text-danger text-small d-block mb-2">{errors.description.message}</span>}
                        </div>
                        {/* <div className="form-group col-md-12">
                            <h6>Tipo de Unidad:</h6>
                                <select 
                                name="selectUnit"
                                {...register("selectUnit",{
                                    required:"Campo requerido"
                                })}
                                className="form-control">
                                    <option value="">Seleccione tipo unidad</option>
                                    {
                                    units.map((unit)=>{
                                        return(
                                            <option value={unit.id}>{unit.typeUnit}</option>   
                                        )
                                    })
                                }
                                </select>
                                {errors.selectUnit && <span className="text-danger text-small d-block mb-2">{errors.selectUnit.message}</span>}
                        </div> */}
                        <div className="form-group col-md-12">
                            <h6>Asignar Permisos:</h6>
                            <div class="modal-table">
                            <Table striped bordered hover size="sm">
                              <thead>
                                  <tr>
                                      <th></th>
                                      <th>#</th>
                                      <th>Permiso</th>
                                  </tr>
                              </thead> 
                              <tbody>
                                  {
                                    permissions.map((permission,index)=>{
                                        return (
                                            <tr>
                                                <td scope="row"><input 
                                                                type="checkbox" 
                                                                name="permissions"
                                                                {...register("permissions",{
                                                                    required:"Seleccione al menos 1 permiso"
                                                                })}
                                                                value={permission.id} 
                                                                onChange={handleChangeCheckBox}/></td>
                                                 <th scope="row">{index+1}</th>
                                                <td>{permission.namePermission}</td>
                                               
                                            </tr>
                                        );
                                   })
                                 }
                              </tbody> 
                            </Table>
                            </div>
                            {errors.permissions && <span className="text-danger text-small d-block mb-2">{errors.permissions.message}</span>} 
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

export default RolDeUser