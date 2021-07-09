import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getRequest,updateStatus } from '../../services/Http/QuotitationService'
import { getFileNames } from '../../services/Http/FileService'
import VerArchivos from '../verArchivos/VerArchivos'
import swal from 'sweetalert'
import './SolicitudesVista.css'
import CrearInforme from '../informe/CrearInforme'

function DetalleSolicitud(){
    const {id} = useParams();
    const [ request, setRequest ] = useState();
    const [ nameUnidadGasto, setNameUnidadGasto ] = useState();
    const [ aplicantName, setAplicantName ] = useState();
    const [ requestDate, setRequestDate ] = useState();
    const [messageAmount, setMessageAmount] = useState("");
    const [ amount, setAmount ] = useState();
    const [ details, setDetails ] = useState([])
    const [ isShowModalFile, setIsShowModalFile ] = useState(false)
    const [btnActivo, setBtnActivo]=useState(false)
    const [disabledVerArchivos, setDisabledVerArchivos] = useState(true)
    const [montoTope, setMontoTope] = useState(0)
    const [isShowModalInforme, setIsShowModalInforme] = useState(false)

    let history = useHistory();
    const acceptRequest = async ( ) => {
        if(amount > montoTope){
            alert("Monto excedido");
        }else{
            const aux = {status:"Aceptado"}
            const result = await updateStatus(id,aux);
            // history.replace("/SolicitudesDeAdquisicionAdmin")
            window.history.back();
        }
    };

    const rejectRequest = async ( ) => {
        const aux = {status:"Rechazado"}
        const result = await updateStatus(id,aux);
        // history.replace("/SolicitudesDeAdquisicionAdmin")
        window.history.back();
    };

    const closePage = ( ) => {
        // history.replace("/SolicitudesDeAdquisicionAdmin")
        window.history.back();
    };

    const alertMessgeInforme = () => {
        swal({
            title: "¿Estas seguro?",
            text: "Para cambiar el estado de una solicitud se debera agregar un informe",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                console.log("se debe abrir el modal")
                setIsShowModalInforme(true)
            } else {
                console.log("no pasa nada")
            }
          });
    };

    const cerrarModalInforme=()=>{
        setIsShowModalInforme(false);
    }

    const closeModal = () => {
        setIsShowModalFile(false)
    }

    const Details = details.map((detail,index)=>{
        return(
            <tr key={index}>
                <th scope="row">
                    {index+1}         
                </th>
                <td>
                    {detail.amount}         
                </td>
                <td>
                    {detail.unitMeasure}         
                </td>
                <td >
                    {detail.description}         
                </td>
                
            </tr>
        );
    })
    useEffect(() => {
        async function getRequestId() {
            const result = await getRequest(id);
            const resultQuotitations=result;
            setRequest(resultQuotitations);
            setNameUnidadGasto(resultQuotitations.nameUnidadGasto)
            setAplicantName(resultQuotitations.aplicantName)
            setRequestDate(resultQuotitations.requestDate)
            setDetails(resultQuotitations.details)
            setAmount(resultQuotitations.amount)
            setMontoTope(resultQuotitations.limite.monto)
            setMessageAmount(resultQuotitations.message);
            const files = await getFileNames(id);   
            if ( files ){
                setDisabledVerArchivos(false)
            }    
            if((resultQuotitations.status == "Pendiente")){
                    setBtnActivo(true);
               }else{
                    setBtnActivo(false);
               }
            
        }
        getRequestId();
    }, []);
    return(
        <>
            <div className="container" align="left">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Solicitud # {id}</h1>   
                    </div>
                    <div className="col-md-6" align="right">
                        <button type="button" className="close" onClick={ closePage }>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <br></br>
                <div className="col" id="registro">
                    <div className="form-register">
                        <form>
                        <div className="form-row" id="formData">
                                <div className="form-group col-md-4" >
                                    <label>Unidad de gasto:</label>
                                    <div className="form-row" id="input">
                                        <label class="col-form-label">{nameUnidadGasto}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Nombre del Solicitante:</label>
                                    <div className="form-row" id="input">
                                        <label class="col-form-label">{aplicantName}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Fecha de Solicitud:</label>
                                    <div className="form-row" id="input">
                                        <label class="col-form-label">{requestDate}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md">
                                    <label>Detalle de solicitud</label>
                                </div>
                            </div>
                            <div className="form-row" id="lista">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Unidad</th>
                                        <th scope="col">Descripcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Details}
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Monto Estimado:</label>
                                    <div className="form-row" id="input">
                                        <label class="col-form-label">{amount}</label>
                                    </div>
                                </div>
                                <div className="form-group col-md-6" style={{marginTop:"33px"}}>
                                    <button type="button" className="btn btn-secondary"
                                        disabled={disabledVerArchivos}
                                        onClick={()=>setIsShowModalFile(true)}
                                    >Ver Archivos</button>
                                </div>
                            </div>
                            <div style={{color:'red'}}>{messageAmount}</div>
                            {
                                messageAmount&&<div style={{color:'red'}}>Monto tope: {montoTope}</div>
                            }
                            <div className="form-row" >
                                <div className="form-group col" id="toolbar">
                                    <button type="button" className="btn btn-danger"  id="btnV" disabled={!btnActivo} onClick={ alertMessgeInforme }> Rechazar solicitud </button>
                                    <button type="button" className="btn btn-success"  id="btnV" disabled={!btnActivo} onClick={ acceptRequest}> Aceptar Solicitud </button>
                                </div>
                            </div>
                        </form>
                                
                    </div>
                </div>
                <VerArchivos
                    isShowModalFile={isShowModalFile}
                    closeModal={closeModal}
                    id={id}    
                />
                <CrearInforme
                        id={id}
                        abierto={isShowModalInforme} 
                        cerrarModal={cerrarModalInforme}
                        report={null}
                        rejectRequest={rejectRequest}
                />
            </div>
        </>
    );
}

export default DetalleSolicitud;