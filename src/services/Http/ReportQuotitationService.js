import API from '../Service';

/**devuelve el informe de una cotizacion*/
export async function getReportQuotitation(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/quotitation/quoteReport/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Registro de informe de una cotizacion*/
export async function createReportQuotitation(report){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.post('/quotitation/quoteReport',report,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}