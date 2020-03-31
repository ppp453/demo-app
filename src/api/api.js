import Axios from '@/config/axios'

export default{
    requestLogin:function(loginData){
        return Axios.post('/login', loginData);
    },
    helloWorldData:function(){
        return Axios.get('/selectAll');
    },
    getUser:function(){
        return Axios.get('/getUser');
    }
}