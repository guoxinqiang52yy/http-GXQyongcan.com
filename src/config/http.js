import axios from "axios";
import store from "@/store"
var instance = axios.create({

});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
//POST传参序列化(添加请求拦截器)// 在发送请求之前做某件事
// instance.interceptors.request.use(function (config) {
//     if(store.state.token){
//         config.headers.token=store.state.token
//     }
//     return config
// },function(error){
//     return Promise.reject(error)
// });



// 自定义的 axios 响应拦截器
// instance.interceptors.response.use((response)=>{
//     if (response.data.code = 999) {
//
//      location.href = "/"
//     }
//     return response
// },(error) => {
//     return Promise.reject(error)
// });
export default instance;