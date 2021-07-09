import API from '../Service';

/**Devuelve la lista de todas las unidades administrativas */
export async function getUnidadesAdministrativas() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/administrativeUnit',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**Registra una unidad administrativa*/
export async function createUnidadAdministrativa(newAdministrativa) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/administrativeUnit/new', newAdministrativa,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export async function getUnidadAdministrativa(id) {
    try {
        const response = await API.get(`/quotitation/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function updateUnidadAdministrativa(id,status) {
    try {
        const res = await API.put(`/quotitation/status/${id}`,status);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**asignacion de administrador a una unidad de adminisrativa*/
export async function updateBossUA(idUser,idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.put(`/assignBossesAdmin/${idUser}/${idUnit}`,{},headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**Agregar un usuario con rol a una Unidad Admnistrativa*/
export async function agregarPersonalUA(userRolUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('administrativeUnit/personal/new',userRolUnit,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
