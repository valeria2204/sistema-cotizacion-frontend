
import API from '../Service';

/**devuelve las facultades */
export async function getFaculties() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/faculties',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**devuelve las facultades sin unidad admin */
export async function getFacultyAdmin() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/faculties/use',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**faculties/in/use */
export async function getFacultyInUse() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('faculties/in/use',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}