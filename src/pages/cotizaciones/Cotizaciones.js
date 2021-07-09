import React, { useEffect, useState } from 'react'
import { EyeFill, PlusCircle } from 'react-bootstrap-icons'
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { getQuotitationList } from '../../services/Http/QuotitationService';

function Cotizaciones(props) { 

    const {id} = useParams();
    const [ quotitations, setQuotitations ] = useState([]);
    const [flagCotizar, setFlagCotizar] = useState(true);
    const [finalizado, setFinalizado] = useState(false);
    const [dataQ, setDataQ] = useState({});
    let history = useHistory()

    const abrirCuadro = ()=>{
        history.push({pathname:`/cuadro/${id}`,data:dataQ});
    }

    const agregarCotizacion = () =>{
        if(!finalizado){
            history.push();
            history.push({pathname:"/respuesta/cotizacion/ua/"+id,data:dataQ});
        }else{
            swal({
                title: "Finalizado",
                text: "Ya finalizo la cotización de esta solicitud",
                icon: "success",
                button: "Entendido",
              });
        }
    }
    useEffect(() => {
        const {data} = props.location;
        async function getQuotitations() {
            try {
                setDataQ(data);
                if(data.statusResponse ==="Finalizado"){
                    setFinalizado(true);
                }
                const result = await getQuotitationList(id);
                setQuotitations(result.Cotizaciones)
                if(result.Cotizaciones.length>2){
                    setFlagCotizar(false);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getQuotitations();
    }, []);
 
  
    
    return(
        <>
            <div className="container" align="left" style={{marginBottom:"100px"}}>
                        <br></br>
                        <h1>Cotizaciones</h1>
                        <br></br>
                    <div className="col" style={{textAlign:"end"}}>
                        <button className="btn btn-secondary" onClick={abrirCuadro} disabled={flagCotizar} >
                          Realizar Comparación
                        </button>
                        
                        <button  onClick={agregarCotizacion} className="btn btn-success" style={{marginLeft:"20px"}}>
                            <PlusCircle className="mb-1"/> Agregar
                        </button>
                    </div>
                    <br></br>
                    <div className="form-register">             
                        <div className="form-row">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">#</th>
                                        <th scope="col">Empresa</th>
                                        <th scope="col">Items Cotizados</th>
                                        <th scope="col">Total en Bs</th>
                                        <th scope="col">Ver Cotización</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {quotitations.map((quotitation,index) => {
                                    return(
                                        <tr key={quotitation.idCotizacion}>
                                            <th scope="row">{index+1}</th>
                                            <td >{index+1}</td>
                                            <td>{quotitation.Empresa}</td>
                                            <td>{quotitation.ItemsCotizados}</td>
                                            <td>{quotitation.TotalEnBs}</td>
                                            <td><button className="btn btn-primary" 
                                            onClick={() => {
                                                history.push({pathname:`/verCotizacion/${id}/${quotitation.idCotizacion}`,data:dataQ})
                                            }}><EyeFill/></button></td>
                                        </tr>
                                    );
                                })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </> 
    )
}

export default Cotizaciones;