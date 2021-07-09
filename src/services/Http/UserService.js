import API from '../Service';

/**Lista de Usuarios
 * Obtiene los datos de todos los usario */
export async function getUsers() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/users',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/*Crear nuevo usuario
se envia los datos en un json y en la url el id del rol del usuario */
export async function createUser(user,idrol) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const token = await API.post(`/register/${idrol}`, user,headers);
        return token;
    } catch (error) {
        console.log(error);
    }
}
/**Devuelve los usuarios de una unidad administrativa*/
export async function getPersonal(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`users/unit/administrative/${idUnit}`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**Devuelve los usuarios que NO estan en una unidad administrativa*/
export async function getUsersOutUA(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`users/unit/administrative/out/${idUnit}`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**Devuelve los usuarios de una unidad e gasto*/
export async function getPersonalUG(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`users/unit/spending/${idUnit}`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**Devuelve los usuarios que NO estan en una unidad e gasto*/
export async function getUsersOutUS(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`users/unit/spending/out/${idUnit}`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**usuarios que tienen el rol de jefe administrativos y no estan asignados*/
export async function getAdmins() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`usersAdmi/WithoutDrives`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**usuarios que tienen el rol de jefe de unidad de gasto y no estan asignados*/
export async function getAdminsUG() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`usersSpending/WithoutDrives`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
/**Devuelve el admin de una unidad*/
export async function getAdminUA(idUnit) {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const res = await API.get(`getInfoAdmi/${idUnit}`,headers);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

