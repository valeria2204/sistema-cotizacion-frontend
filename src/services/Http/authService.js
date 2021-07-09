import API from '../Service';


export async function login(user){
    try {
        const token = await API.post('/login',user);
        return token;
    } catch (error) {
        console.log(error);
    }
}
export async function detailsUser(){
    const token=window.localStorage.getItem("tokenContizacion");
    const headers = { headers: {'Authorization': `Bearer ${token}`}};
    try {
        console.log(token)
        const userDetaisl = await API.post('/details',{},headers);
        return userDetaisl;
    } catch (error) {
        console.log(error);
    }
}
