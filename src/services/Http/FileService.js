import API from '../Service';

/**devuelve los nombres de los archivos */
export async function getFileNames(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`files/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**devuelve el nombre del archivo asociado a un detalle de cotizacion */
export async function getFileNameDetail(idDetailOffert) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`quotation/files/detail/${idDetailOffert}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**devuelve el nombre del archivo asociado a una cotizacion manual*/
export async function getFileNameQuotitation(idDetailOffert) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`ua/quotation/files/detail/${idDetailOffert}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}