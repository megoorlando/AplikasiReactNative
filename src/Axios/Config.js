import Axios from 'axios';

const instance = Axios.create({
    // baseURL:"http://192.168.100.2:5000/api/",
    baseURL:"http://192.168.64.225:5000/api/",
    timeout:20000,
    headers:{
        'type-Project':'mobilebanking',
        'Content-Type': 'application/json'
    }
})

export default instance;
