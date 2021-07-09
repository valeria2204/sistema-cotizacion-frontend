import API from '../Service';

export async function getPermissions() {
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        const response = await API.get('/permissions',headers);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}