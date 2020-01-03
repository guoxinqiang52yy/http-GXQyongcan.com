import http from '../config/http.js';
export default {
    //获取表格数据
    get(page,limit){
        return http.get(`/goods?page=${page}&limit=${limit}`)
    },
    //获取input数据
    getInput(){
        return http.get(`/goods`)
    },
    //缴费
    add(data){
        return http.post('/goods',data)
    },

    delete(id){
        // return http.delete(`/goods/${id}?is_del=1`)
        return http.delete('/goods/'+id)
    },
    update(id,data){
        return http.delete(`/goods/${id}?is_del=1`,data)
    }
}
