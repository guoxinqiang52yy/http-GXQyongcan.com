import http from '../config/http.js';
export default {
    add(data){
        return http.post('/goods',data)
    },
    get(page,limit,is_up,cat_id,search){
        return http.get(`/goods?page=${page}&limit=${limit}&is_up=${is_up}&cat_id=${cat_id}&search=${search}&is_del=0`)
    },
    delete(id){
        // return http.delete(`/goods/${id}?is_del=1`)
        return http.delete('/goods/'+id)
    },
    update(id,data){
        return http.delete(`/goods/${id}?is_del=1`,data)
    }
}
