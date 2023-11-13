import api from './api'

const cmService = {}
cmService.authUser = async (user) =>{ return await api.post('/auth', user)};
cmService.getUsers = () => api.get('/users');
cmService.getRoles = () => api.get('/rols');
cmService.getSpecialities = () => api.get('/speciality');
cmService.DeleteUser = async (id) => {return await api.delete(`/users/${id}`);}
cmService.CreateOrUpdateUser = async (user) => {
    if(user._id){
        return await api.put('/users',user);
    }
    else{
        console.log(user);
        return await api.post('/users',user);
    }
    
};
cmService.CreateOrUpdateRol = async (rol) => {
    if(rol._id){
        return await api.put('/rols',rol);
    }
    else{
        return await api.post('/rols',rol);
    }
    
};
export default cmService