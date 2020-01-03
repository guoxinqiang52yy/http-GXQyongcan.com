//import导入http配置
import http from "../config/http.js"
export default{
    checkLogin(data){
        return http.post("/login",data);
    }
}