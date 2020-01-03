import http from '../config/http.js';
import base from './base'
export default {
    //新增街道
    add(data){
        return http.post('/goods',data)
    },
    //获取表格数据
    get(data){
        return http.post(`${base.baseUrl}index.php/portal/old/streetList`,data)
    },
    //删除
    delete(id){
        return http.delete('/goods/'+id)
    },
    //编辑
    update(id,data){
        return http.delete(`/goods/${id}?is_del=1`,data)
    }
}
