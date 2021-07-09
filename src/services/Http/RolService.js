import API from '../Service';

/**devuelve la lista de todos los roles*/
export async function getRols() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/rols',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**crear nuevo rol
 * se le envia los datos en un json
*/
export async function createRol(newRol){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.post('roles/new',newRol,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**modifica el rol del usuario */
export async function updateRolUser(idu,idr) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.put(`users/update/${idu}/${idr}`,{},headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**Actualiza un rol */
export async function updateRol(rol) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.put(`roles/edit`,rol,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}