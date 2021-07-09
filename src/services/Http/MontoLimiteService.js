import API from '../Service';
/**Devuelve todos los montos limites del sistema */
export async function getMontoLomite() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/informations/',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**Devuelve los montos limites de una unidad administrativa */
export async function getMontoLimiteAdminUnit(idUnitAdmin) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get(`/limiteAmounts/${idUnitAdmin}`,headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**actualiza el monto limite de una unidad aadministrativa */
export async function updateMontoLimite(montoLimite) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/updateLimiteAmount', montoLimite, headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export async function createMontoLimite(montoLimite) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.post('/limiteAmount/new', montoLimite, headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
