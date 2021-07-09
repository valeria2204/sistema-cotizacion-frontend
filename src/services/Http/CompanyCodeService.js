import API from '../Service';

export async function searchCode(code) {
    try {
        const res = await API.post('/searchCode', code);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function detailsQuotitation(id) {
    try {
        const res = await API.get('/quotitation/details/'+id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function registrarCotizacion(data) {
    try {
        const res = await API.post('/quotitacion/response',data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function registrarCotizacionDetalle(data,id) {
    try {
        const res = await API.post('/quotitacion/response/'+id,data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function registrarCotizacionDetalleFile(data,id) {
    try {
        const res = await API.post('/quotitacion/response/file/'+id,data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/*Registrar respuesta desde unidad Administrativa */
export async function registrarCotizacionUA(data) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/ua/quotitacion/response',data,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function registrarCotizacionDetalleUA(data,id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/ua/quotitacion/response/'+id,data,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function registrarCotizacionDetalleFileUA(data,id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/ua/quotitacion/response/file/'+id,data,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export async function regitrarArchivoGeneralUA(data,id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/ua/quotitacion/response/file/uageneral/'+id,data,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}