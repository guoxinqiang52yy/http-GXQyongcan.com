<template>
    <div class="index">
        <el-container class="index-container">
            <el-aside class="index-aside" style="width: auto;">
                <div class="index-aside-logo">
                    <!--<img src="" alt="" :class="{actives:isCollapse==false}">-->
                </div>
                <!--导航菜单-->
                <el-menu
                        default-active="isRouter"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#2F3E4E"
                        text-color="#fff"
                        active-text-color="#409eff"
                        :router="true"
                        :collapse="isCollapse">
                    <template v-for="v in menulist"><!--大循环-->
                        <el-submenu :index="v.name" v-if="v.children && v.children.length > 0">
                            <template slot="title">
                                <i :class="v.meta.icon"></i>
                                <span slot="title">{{v.meta.title}}</span>
                            </template>
                            <template v-for="item in v.children"><!--小循环-->
                                <el-menu-item :index="item.name">
                                    <i :class="item.meta.icon"></i>
                                    <span slot="title">{{item.meta.title}}</span>
                                </el-menu-item>
                            </template>
                        </el-submenu>
                        <el-menu-item :index="v.name" v-else-if="!v.meta.ishidden">
                            <i :class="v.meta.icon"></i>
                            <span slot="title">{{v.meta.title}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-container>
                <!--头-->
                <el-header class="index-header">
                    <!--展开-->
                    <i class="el-icon-s-unfold" @click="isCollapse=!isCollapse" :class="{active:isCollapse}"></i>
                    <div class="index-header-right">
                        <div class="header-right1">
                            <a href="javascript:;">帮助手册</a>
                        </div>
                        <div class="header-right2">
                            <ol>admin</ol>
                            <ol>管理员</ol>
                        </div>
                        <div class="header-right4">
                            <a href="javascript:;"><i class="el-icon-date"></i></a>
                        </div>
                        <div class="header-right3">
                            <!--点击下拉-->
                            <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="updatepas">
                                        <div class="ccc">
                                            <div class="ccc-head">
                                                <span>最后登陆</span>
                                                <a href="javascript:;"><span>修改密码</span></a>
                                            </div>
                                            <div class="ccc-foot">
                                                <p>2019-07-06 09:37:31</p>
                                                <span>(IP: 1.68.98.210)</span>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <div class="ccc">
                                            <div class="ccc-head">
                                                <span>常用操作</span>
                                                <a href="javascript:;"><span>添加菜单</span></a>
                                            </div>
                                            <div class="ccc-foot">
                                                <a href="javascript:;">站点设置：</a>
                                                <span></span>
                                            </div>
                                        </div>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <el-dropdown class="index-header-my" @command="handleCommand">
                            <span class="el-dropdown-link">
                                 我的工作台<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="login">
                                    <div class="ddd">
                                        <img src="" alt="">
                                        <h5>退出系统</h5>
                                    </div>
                                </el-dropdown-item>

                            </el-dropdown-menu>
                        </el-dropdown>

                    </div>
                </el-header>
                <!--内容-->
                <el-main class="index-main">
                    <router-view></router-view>
                </el-main>
                <!--底部-->
                <el-footer class="index-footer">
                    版权所有 © 2020-01/01 津杰溢华网络科技有限公司 并保留所有权利。
                </el-footer>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                menulist: [],
                isRouter: this.$route.name,
                isCollapse: false,
                options: [],
                value: ''
            }
        },
        created: function () {
            this.menulist = this.$router.options.routes[1].children

            console.log(this.$store.state.navList.auth_list);
            console.log(this.$route.name);
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command) {
                // this.$message('click on item ' + command);
                this.$router.push({
                    name: command
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .ddd {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h5 {
            margin-left: 5px;
            font-size: 14px;
            display: inline;
        }
    }

    .ccc {
        width: 238px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-bottom: 5px;

        .ccc-head {
            width: 220px;
            height: 23px;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed #cccccc;
            align-items: center;

            a {
                color: #000000;
            }
        }

        .ccc-foot {
            width: 100%;

            a {
                font-size: 12px;
                color: #000000;
            }

            p {
                display: inline;
                font-size: 12px;
                color: #000;

                span {
                    font-size: 12px;
                    color: #cccccc;
                }
            }
        }
    }

    .index-aside-logo {
        /*margin-top:10px;*/
        margin-bottom: 10px;

        img {
            margin-left: 10px;
            margin-right: 10px;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: auto;
    }

    .index {
        width: 100%;
        height: 100%;

        .index-container {
            width: 100%;
            height: 100%;

            .index-aside {
                background-color: #2F3E4E;

                .actives {
                    display: none;
                }
            }
        }

        .index-header {
            width: auto;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #293038;

            .index-header-right {
                width: 380px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                div {
                    width: 56px;
                    color: #ffffff;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                }

                .header-right2 {
                    flex-direction: column;
                    height: 40px;
                    display: flex;
                    justify-content: space-around;
                }

                .header-right3 {
                    .el-dropdown-link {
                        cursor: pointer;
                    }

                    .el-icon-arrow-down {
                        font-size: 12px;
                    }

                    .demonstration {
                        display: block;
                        margin-bottom: 20px;
                    }

                    .el-icon-arrow-down {
                        font-size: 16px;
                        color: #FFFFFF;
                    }
                }

                .header-right4 {
                    font-size: 35px;

                    .el-icon-date {
                        margin-left: 10px;
                    }
                }

                .index-header-my {
                    border-left: 1px solid #a6a9ad;
                    padding-left: 20px;
                    box-sizing: border-box;
                    width: 150px;
                    height: 50px;
                    display: flex;
                    justify-content: flex-start;

                    .el-dropdown-link {
                        cursor: pointer;
                        color: #FFFFFF;
                    }
                }
            }

            .el-icon-s-unfold {
                font-size: 20px;
                color: #FFF;
                cursor: pointer;
                text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
            }

            .active {
                transform: rotate(90deg);
                transition: all .5s;
            }
        }

        .index-footer {
            height: 80px;
            background-color: #ffffff;
            line-height: 80px;
            color: #cccccc;
            text-align: center;
        }
    }


</style>