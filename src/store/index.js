import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// 先创建一个对象并进行配置：
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
Vue.use(Vuex)
const stores=new Vuex.Store({
    state:{
        loginform:{
            username:'',
            password:''
        },
        token:'',
        url:'http://www.jiaju.com/',
        navList:{}
    },
    mutations:{
        updatefrom:function (state,obj) {
            state.loginform = obj
        },
        tokenFun:function (state,token) {
            state.token = token
        }
    },
    getters:{},
    modules:{},
    actions:{},
    plugins: [vuexLocal.plugin]
})
export default stores;