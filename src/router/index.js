import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

import login from '../views/login'
const routers = new VueRouter({
    routes: [
        {
            path: "/",
            name: "login",
            meta: {
                icon: "el-icon-switch-button",
                title: "登录"
            },
            component: login

        },
        {
            path: "/index",
            name: "index",
            meta: {
                icon: "el-icon-s-home",
                title: "首页"
            },
            component: ()=>import("@/views/index/index.vue"),
            redirect:{          /*重定向*/
                name:'system'
            },
            children:[
                {
                    path:"/setup",
                    name:'setup',
                    meta:{
                        icon:'el-icon-edit',
                        title:'行政管理'
                    },
                    component: ()=>import('@/views/setup/setup.vue'),
                    children:[
                        {
                            path: "/system",
                            name: 'system',
                            meta: {
                                icon: 'el-icon-edit',
                                title: '街道管理'
                            },
                            component: () => import('@/views/setup/system/system.vue')
                        },
                        {
                            path: "/payment",
                            name: 'payment',
                            meta: {
                                icon: 'el-icon-finished',
                                title: '居委会管理'
                            },
                            component: () => import('@/views/setup/payment/payment.vue')
                        },
                        {
                            path: "/jurisdiction",
                            name: 'jurisdiction',
                            meta: {
                                icon: 'el-icon-coordinate',
                                title: '小区管理'
                            },
                            component: () => import('@/views/setup/jurisdiction/jurisdiction.vue')
                        },
                        {
                            path: "/math",
                            name: 'math',
                            meta: {
                                icon: 'el-icon-s-custom',
                                title: '用户管理'
                            },
                            component: () => import('@/views/setup/math/math.vue')
                        },
                    ]
                },
                {
                    path:"/vips",
                    name:'vips',
                    meta:{
                        icon:'el-icon-edit',
                        title:'预定交费'
                    },
                    component: ()=>import('@/views/vips/vips.vue'),
                    children:[
                        {
                            path:'/vip',
                            name:'vip',
                            meta:{
                                icon:'el-icon-trophy',
                                title:'缴费'
                            },
                            component: ()=>import('@/views/vips/vip/vip.vue')
                        },
                        {
                            path:'/vipdetails',
                            name:'vipdetails',
                            meta:{
                                icon:'el-icon-trophy',
                                title:'缴费情况管理'
                            },
                            component: ()=>import('@/views/vips/vipdetails/vipdetails.vue')
                        },
                        {
                            path:'/fooddetails',
                            name:'fooddetails',
                            meta:{
                                icon:'el-icon-trophy',
                                title:'订餐情况'
                            },
                            component: ()=>import('@/views/vips/fooddetails/fooddetails.vue')
                        },
                    ]
                },
                {
                    path:'/foodout',
                    name:'foodout',
                    meta:{
                        icon:'el-icon-trophy',
                        title:'取餐管理'
                    },
                    component: ()=>import('@/views/foodout/foodout.vue')
                },
                {
                    path:'/recom',
                    name:'recom',
                    meta:{
                        icon:'el-icon-trophy',
                        title:'月统计表'
                    },
                    component: ()=>import('@/views/recom/recom.vue')
                },
                {
                    path:'/updatepas',
                    name:'updatepas',
                    meta:{
                        icon:'el-icon-lock',
                        title:'修改密码'
                    },
                    component: ()=>import('@/views/updatepas/updatepas.vue')
                }
            ]
        },
        // {
        //     path: "/",
        //     name: "login",
        //     meta: {
        //         icon: "el-icon-switch-button",
        //         title: "登录"
        //     },
        //     component: login
        //
        // },

    ]
});
export default routers;