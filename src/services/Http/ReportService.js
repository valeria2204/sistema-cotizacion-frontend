import API from '../Service';

/**devuelve el informe de una solicitud*/
export async function getReport(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/quotitation/report/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Registro de informe de una solicitud*/
export async function createReport(report){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.post('/quotitation/report',report,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}