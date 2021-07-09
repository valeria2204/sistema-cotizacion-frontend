
import API from '../Service';

/**lista de todas las cotizaciones existente */
export async function getQuotitation() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/quotitations',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**devuelve las cotizaciones de una unidad de gasto */
export async function getQuotitationSpendingUnit(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`quotitations/spending/${idUnit}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**devuelve las soliciudes de cotizaciones de una unidad Aministrativa*/
export async function getQuotitationAdministrativeUnit(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`quotitations/${idUnit}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Crea una nueva cotizacion */
export async function createQuotitation(quotitation) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/quotitation', quotitation,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

/**envia los correos y la descripcion de con el id de la solicitud asociada */
export async function sendEmail(desciptionEmail,id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post(`/sendEmail/${id}`, desciptionEmail,headers);
        return res;
    } catch (error) {
        console.log(error);
    }
}

/**devuelve los detalles de una solicitud enviandole su id */
export async function getRequest(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/quotitation/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**actualiza el estado de un solicitud "aceptado, rechazado" */
export async function updateStatus(id,status) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.put(`/quotitation/status/${id}`,status,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

/**devuelve los datos del usuario que realizara una solicitud */
export async function getInform(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/getInform/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Devuelve los datos de una cotizacion mediante su id y el id de la solicitud*/
export async function getQuotitationId(idRe, idCo){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/quote/${idCo}/${idRe}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Devueve una lista de cotizaciones realizadas dado el id de solicitud */
export async function getQuotitationList(idRe){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/listQuotation/${idRe}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**devuelve los datos para el cuadro comparativo */
export async function getComparativeChart(idRe){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/getComparativeChart/${idRe}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

