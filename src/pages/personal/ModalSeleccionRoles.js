import React, {useState, useEffect} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup, Button} from 'reactstrap';
import { useForm } from "react-hook-form";
import { getRols} from '../../services/Http/RolService'
import {agregarPersonalUS} from '../../services/Http/UniGastoService'
import {agregarPersonalUA} from '../../services/Http/UniAdministrativaService'
import swal from 'sweetalert';
function ModalSeleccionRoles(props){
  
    const { register, formState: { errors },handleSubmit, reset } = useForm();
    const [ selectedCheckboxes, setSelectedCheckboxes]=useState([]);
    const [ user, setUser ] = useState({idUser:"",idUnit:"",roles:[]});
    const [ rols, setRols ] =useState([]);
    const [ rolSelec, setRolSelec ] =useState("");
    const [ message, setMessage] = useState("");
    var seleccionados =[];  
    const closeModal = () => {
        clearForm();
        props.cerrarModal();
        props.updateUsers();
    }
    const clearForm = () => {
        setMessage("");
        setSelectedCheckboxes("");
        reset();
    };
    const alertMessage = (message,icono) => {
        swal({
            text: message,
            icon: icono,
            button: "Ok",
          });
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
        console.log(seleccionados);
        user.roles=seleccionados;
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getRols();
            setRols(response.roles);
            user.idUser=props.user.id;
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
    }, [] );
   
    const onSubmit = async (data)  => {
        try{ 
            if (props.idUS === "null" ){
                console.log("este user se registra:",props.user.id, "en unidad",props.idUA,"con el rol",user.roles)
                const res = await agregarPersonalUA({idUser:props.user.id,idUnit:props.idUA,idRol:user.roles});
                alertMessage(res.message,"success");
            }
            if (props.idUA === "null" ){
                const resp = await agregarPersonalUS({idUser:props.user.id,idUnit:props.idUS,idRol:user.roles});
                alertMessage(resp.message,"success");
            }
            closeModal();
        }catch(error){
            console.log( error )
        }
    }
    return(
        <>
            <Modal isOpen={props.abierto} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={closeModal}>
                        {props.user.name} {props.user.lastName}
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label>Seleccione el/los rol(es) que desea que cumpla en su unidad</label>
                            <div class="table table-hover">
                            <Table bordered>
                              <thead>
                                  <tr>
                                      <th></th>
                                      <th>Rol</th>
                                      <th>Descripcion</th>
                                  </tr>
                              </thead> 
                              <tbody>
                                  {
                                    rols.map((rol,index)=>{
                                        if(rol.id != 1 & rol.id != 2 & rol.id != 3){
                                        return (
                                            <tr>
                                                <td scope="row"><input 
                                                                type="checkbox" 
                                                                name="roles"
                                                                {...register("roles",{
                                                                    required:"No selecciono ningun rol"
                                                                })}
                                                                value={rol.id} 
                                                                onChange={handleChangeCheckBox}/></td>
                                                {/* <td>{index+1}</td> */}
                                                <td>{rol.nameRol}</td>
                                                <td>{rol.description}</td>
                                            </tr>
                                        );
                                     }
                                   })
                                 }
                              </tbody> 
                            </Table>
                            </div>
                            {errors.roles && <span className="text-danger text-small d-block mb-2">{errors.roles.message}</span>} 
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

export default ModalSeleccionRoles