import Vue from 'vue'
import App from './App.vue'
import 'less'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routers from './router'
import vcharts from 'v-charts'
import echarts from 'echarts'
import Axios from 'axios'  //发请求
import store from './store/index.js'
import VueQuillEditor from "vue-quill-editor"
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import * as date from './filter'
Vue.use(VueQuillEditor)
Vue.prototype.$http=Axios;
Vue.use(vcharts)
Vue.use(echarts)
Vue.use(elementui)
Vue.use(date)
Vue.config.productionTip = false
//type=number
Vue.directive('enterNumber', {
    inserted: function (el) {
        el.addEventListener("keypress",function(e){
            e = e || window.event;
            let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
            let re = /\d/;
            if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
                if(e.preventDefault){
                    e.preventDefault();
                }else{
                    e.returnValue = false;
                }
            }
        });
    }
});
new Vue({
  store:store,
  router:routers,
  render: h => h(App),
}).$mount('#app')
