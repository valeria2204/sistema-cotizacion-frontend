import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import SolicitudesVista from './solictudesVista/SolicitudesVista';
//import {} from './EnviarFormulario'
import EnviarCotizacion from './EnviarFormulario/EnviarCotizacion'
import Home from './Home'
import Usuario from './usuario/Usuario';
import IngresoCodigo from './respEmpresa/IngresoCodigo';
import RespCotizacion from './respEmpresa/RespCotizacion.js';
import UnidadesAdministrativas from './registroUnidadAdministrativa/UnidadesAdministrativas'
import MainRegistroUnidad from './regitroUnidadGasto/MainRegistroUnidad'
import MontoLimite from './montoLimite/MontoLimite'
import SolicitudesDeAdquisicion from './solicitudes/SolicitudesDeAdquisicion'
import AgregarDetalleSolictud from './solicitudes/AgregarDetalleSolicitud'
import DetalleSolicitud from './solictudesVista/DetalleSolicutd'
import ListaEmpresa from './Empresa/ListaEmpresa'
import ListaRoles from './Rol/ListaRoles'
import ListaPersonal from './personal/ListaPersonal'
import VentanaVerArchivo from './verArchivos/VentanaVerArchivo';
import SeleccionPersonal from './personal/SeleccionPersonal'
import Cotizaciones from './cotizaciones/Cotizaciones';
import VerCotizacion from './verCotizaciones/VerCotizacion';
import RespuestaInformeCotizacion from './cotizaciones/RespuestaInformeCotizacion';
import InicioSegunRol from '../components/menuNavegacion/InicioSegunRol';
import MenuNavegacion from '../components/menuNavegacion/MenuNavegacion';
import RespCotizacionUA from './resgistrarRespuestaUA/RespCotizacion';
import VerArchivoCotizacion from './verCotizaciones/VerArchivoCotizacion';
import CuadroComparativo from './cotizaciones/CuadroComparativo';
import VerSolicitud from './solicitudes/VerSolicutd';

const Router = () => {
    return (
        <div>
            <Switch>
                <Redirect exact from="/" to="/home" />
                <Route exact path="/home" component={ Home }/>
                {/* Unidad de Gasto */}
                <Route exact path='/SolicitudesDeAdquisicion/:idUS/:nameUS' component={ SolicitudesDeAdquisicion}/>
                <Route exact path='/AgregarDetalleSolictud/:idUS/:nameUS' component={ AgregarDetalleSolictud }/>
                <Route exact path='/verSolicitud/:id' component={ VerSolicitud }/>
                {/* Unidad Administratica */}
                <Route exact path="/SolicitudesDeAdquisicionAdmin/:idUA" component={ SolicitudesVista }/>
                <Route exact path="/EnviarCotizacion" component={ EnviarCotizacion }/>
                <Route exact path="/DetalleSolicitud/:id" component={ DetalleSolicitud }/>
                <Route exact path='/montoLimite/:idUA' component={ MontoLimite }/>
                <Route exact path="/personal/:idUA/:idUS" component={ListaPersonal}/>
                <Route exact path='/seleccionPersonal/:idUA/:idUS' component={SeleccionPersonal}/>
                <Route exact path='/perfil' component={InicioSegunRol}/>
                <Route exact path="/menu" component={ MenuNavegacion }/>
                <Route exact path='/respuesta/cotizacion/ua/:id' component={RespCotizacionUA}/>
                <Route exact path='/cuadro/:id' component={CuadroComparativo}/>
                
                {/* Administrador del Sistema */}
                <Route exact path="/UnidadesAdministrativas" component={ UnidadesAdministrativas }/>
                <Route exact path='/unidadesDeGasto' component={ MainRegistroUnidad }/>
                <Route exact path='/user' component={Usuario}/>
                <Route exact path='/empresas' component={ListaEmpresa}/>
                <Route exact path='/roles' component={ListaRoles}/>
                <Route exact path='/showFile/:id/:fl' component={VentanaVerArchivo}/>
                {/* Empresa respuesta de cotizacion */}
                <Route exact path='/respuestaCotizacion' component={ RespCotizacion }/>
                <Route exact path='/ingresoCodigo' component={ IngresoCodigo }/>
                {/**Cotizaciones */}
                <Route exact path='/cotizaciones/:id' component={ Cotizaciones }/>
                <Route exact path='/verCotizacion/:idRe/:idCo' component={ VerCotizacion }/>
                <Route exact path='/informeCotizacionResp/:idRe' component={ RespuestaInformeCotizacion }/>
                <Route exact path='/showFileQuotitationDetail/:aux/:fl' component={VerArchivoCotizacion}/>
            </Switch>
        </div>
    )
}

export default Router
