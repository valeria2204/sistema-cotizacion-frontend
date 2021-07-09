import API from '../Service';

export async function getUnidadesGastos() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/spendingUnits',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createUnidadGasto(newUndidadGasto) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/spendingUnits/new', newUndidadGasto,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getUnidadGasto(id) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/quotitation/${id}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function updateUnidadGasto(id,status) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.put(`/quotitation/status/${id}`,status,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**asignacion de administrador a una unidad de gasto*/
export async function updateBossUG(idUser,idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.put(`/assignBossesSpending/${idUser}/${idUnit}`,{},headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**Agregar un usuario con rol a una Unidad de Gasto*/
export async function agregarPersonalUS(userRolUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('spendingUnit/personal/new',userRolUnit,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
