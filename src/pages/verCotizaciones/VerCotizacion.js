import React, { useState, useEffect } from 'react'
import { BagPlusFill, FileEarmarkArrowUpFill, FileEarmarkFill } from 'react-bootstrap-icons'
import { getQuotitationId } from '../../services/Http/QuotitationService';
import { useHistory, useParams } from 'react-router-dom'
import ModalVerOferta from './ModalVerOferta'
import { getFileNameDetail, getFileNameQuotitation } from '../../services/Http/FileService';

function VerCotizacion(props){
    const {idRe} = useParams();
    const {idCo} = useParams();
    let history = useHistory();
    const [ detalles, setDetalles ] = useState([])
    const [ cotizacion, setCotizacion] = useState({offerValidity:"",answerDate:"",deliveryTime:"",paymentMethod:"",observation:""})
    const [ abrirOferta, setAbrirOferta] = useState(false); 
    const [ verCotizacion, setVerCotizacion] = useState(false)
    const [ nameFile, setNameFile ] = useState("")
    const [ oferta, setOferta ] = useState("");
    const [dataQ, setDataQ] = useState({});
    const [ files, setFiles ] = useState([])
    const cerrarOferta = () => {
        setAbrirOferta( false );
    }
    const cerrarVerCotizacion = ()=>{
        history.push({pathname:`/cotizaciones/${idRe}`,data:dataQ})
    }
    useEffect(() => {
        const {data} = props.location;
        async function getQuotitation() {
            try {
                setDataQ(data);
                const result = await getQuotitationId(idRe, idCo)
                setCotizacion(result.Cotizacion[0])
                var aux = []
                var files = []
                
                for (var i = 1; i < result.Cotizacion.length; i++) {
                    aux.push(result.Cotizacion[i][0]);
                    const res = await getFileNameDetail(result.Cotizacion[i][0].idDetail)
                    files.push(res[0]);
                }
                const fileQuotation = await getFileNameQuotitation(idCo);
                if ( fileQuotation.length>0 ){
                    setVerCotizacion(true)
                    setNameFile(fileQuotation[0])
                }
                setDetalles(aux)
                setFiles(files)
                console.log(files)
            } catch (error) {
                console.log(error)
            }
        }
        getQuotitation();
    }, []);
    return(
        <>
            <div className="container" align="left">
                <br></br>
                    <h1> Cotización</h1>
                <br></br>
                <h3>Datos de Cotización</h3>
                <div className="col" >
                    <div className="form-register">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <h5>Validez de la oferta</h5>
                                    <input className="form-control" value={ cotizacion.offerValidity}></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <h5>Fecha de Cotizacion</h5>
                                    <input className="form-control" value={ cotizacion.answerDate}></input>
                                </div>      
                            </div>     
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <h5>Tiempo de Entrega</h5>
                                    <input className="form-control" value={ cotizacion.deliveryTime}></input>
                                </div>
                                <div className="form-group col-md-4">
                                    <h5>Forma de Pago</h5>
                                    <input className="form-control" value={ cotizacion.paymentMethod}></input>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <h3>Detalle por item de Cotización</h3>
                <div className="col">
                {/* <div className="col" style={{marginLeft:"5%", marginRight:"5%"}}></div> */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th width="3%" scope="col">#</th>
                                <th width="8%" scope="col">Cant.</th>
                                <th width="8%" scope="col">Unidad</th>
                                <th width="22%" scope="col">Detalle</th>
                                <th width="11%" scope="col">Precio Unit.</th>
                                <th width="11%" scope="col">Precio total</th>
                                <th width="23%" scope="col">Oferta</th>
                                <th width="16%" scope="col">Archivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                detalles.map((detalle,index)=>{
                                    if(detalle){
                                        return(
                                            <tr key={detalle.id}>
                                                <th scope="row">{index+1}</th>
                                                <td >{detalle.amount}</td>
                                                <td>{detalle.unitMeasure}</td>
                                                <td>{detalle.description}</td>
                                                <td>{detalle.unitPrice}</td>
                                                <td>{detalle.totalPrice}</td>
                                                {/* <td><button className="btn btn-warning" 
                                                style={{color:"white", backgroundColor:"orange"}}
                                                onClick={()=>AbrirModalOferta(detalle)}
                                                ><BagPlusFill/></button></td> */}
                                                <td>Marca: {detalle.brand} <br></br>Modelo: {detalle.model}<br></br>Industria: {detalle.industry}<br></br> Tiempo de Garantia: {detalle.warrantyTime}</td>
                                                <td>
                                                { (files[index])?
                                                (<a
                                                href={`/showFileQuotitationDetail/${1}/${files[index]}`} 
                                                className="btn btn-secondary sm" target="_blank"
                                                ><FileEarmarkFill className="mb-1"/>Ver archivo</a>):
                                                (<button className="btn btn-secondary sm" disabled><FileEarmarkFill className="mb-1"/>Ver archivo</button>)
                                                }
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="form-row" >
                    <div className="col-6" style={{marginLeft:"5%", marginRight:"5%"}}>
                        <h4>Observaciones</h4>
                        <textarea type="text" className="form-control" value={ cotizacion.observation}></textarea>
                    </div>
                </div>
                <br></br>
                <div className="form-row" >
                    <div className="col-6"  style={{marginLeft:"5%", marginRight:"5%"}}>
                        {(verCotizacion) && 
                            (<a href={`/showFileQuotitationDetail/${2}/${nameFile}`} className="btn btn-secondary sm" target="_blank"><FileEarmarkFill className="mb-1"/> Ver archivo</a>)
                        }
                    </div>
                    </div>
                <div className="form-row" >
                    <div className="form-group col" id="toolbar">
                        <button className="btn btn-secondary" id="btnV" onClick={()=>{cerrarVerCotizacion();}}>Cerrar</button>
                    </div>
                </div>
            </div>
            {/* <ModalVerOferta 
            abrirOferta={abrirOferta} 
            cerrarOferta={cerrarOferta} 
            oferta={oferta}
            file={file}/> */}
        </>
    );
}

export default VerCotizacion;