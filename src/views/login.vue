<template>
    <div class="login">
        <el-carousel :interval="5000" arrow="never" height="700px" style="z-index: 1" indicator-position="none" id="carousel">
            <el-carousel-item v-for="item in 4" :key="item">
                <!--走马灯-->
            </el-carousel-item>
        </el-carousel>
        <!--登录-->
        <div class="login-login">
            <div class="login-img">
                <!--<img src="../assets/log.png" alt="">-->
            </div>
            <!--表单-->
            <div class="login-form">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                    <div class="form-head">
                        <h2>管理中心</h2>
                    </div>
                    <el-form-item prop="username">
                        <div class="login-aa">
                            <i class="el-icon-user-solid"></i>
                            <el-input type="text" v-model="ruleForm.username" autocomplete="off" class="forminput"></el-input>
                        </div>

                    </el-form-item>
                    <el-form-item  prop="password">
                        <div class="login-aa">
                        <i class="el-icon-lock"></i>
                            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input></div>
                    </el-form-item>
                    <el-form-item>
                        <a href=""><p class="wangji">忘记密码？</p></a>
                        <el-button  @click="submitForm('ruleForm')" class="form-button">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>
</template>

<script>
    import base from '@/api/base'
    import axios from "axios";
    export default {
        name: "login",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message:'请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        {required: true,message:'请输入密码', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var that = this
                        var params = {
                            user_login:that.ruleForm.username,
                            user_pass:that.ruleForm.password
                        }
                        axios.post(`${base.baseUrl}index.php/portal/user/login`, params)
                            .then(function (res) {
                                if (res.data.code == 1) {
                                    var setToken = res.data.data.token
                                    var navList = JSON.parse(JSON.stringify(res.data.data))
                                    that.$store.state.navList = navList
                                    sessionStorage.setItem("setToken",setToken)
                                    that.$message.success("登录成功")
                                    that.$router.push('/index');
                                } else {
                                    that.$message.success(res.data.msg)
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    } else {
                        this.$message.error("登录失败")
                    }
                });
            },
        },

    }
</script>

<style scoped lang="less">

 .login{
    .login-login{
        width: 419px;
        height: 539px;
        z-index: 1000;
        position: fixed;
        top:10px;
        right: 325px;
        display: flex;
        flex-direction: column;
        .login-img{
            margin:40px auto;
        }
        .login-form{
            width: 100%;
            height: 423px;
            background:url("../assets/login_form.png") no-repeat;
            margin-top: 20px;
            color: #FFFFFF;
            .demo-ruleForm{
                width: 100%;
                height: 389px;
                padding: 0 90px 0 0;
                box-sizing: border-box;
                .wangji{
                    margin:0 0 0 190px;
                }
                .form-button{
                    width: 200px;
                    height: 45px;
                    border: 0;
                    background: #ff7c3a;
                    color: #FFF;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    font-family: "Microsoft YaHei";
                    border-radius: 10px;
                    margin: 0 auto;
                    display: block;
                }
                .form-head{
                    width: 419px;
                    height: 81px;
                    line-height: 81px;
                    text-align: center;
                    margin-bottom: 20px;
                    border-bottom: rgba(0,0,0, .1)1px solid;
                }
                .login-aa{
                    display: flex;
                    justify-content: space-between;
                    i{
                        margin:10px 10px 0 0;
                        font-size: 28px;
                    }
                    /deep/ .el-input__inner{
                        height: 49px;
                        width: 234px;
                    }
                }
            }
        }
    }
    /deep/ .el-form-item__content{
        margin-left: 65px  !important;

    }
}

    .el-carousel__item:nth-child(1) {
        background:url("../assets/banner_1.jpg") 50% no-repeat;
    }
    .el-carousel__item:nth-child(2) {
        background:url("../assets/banner_3.jpg") 50% no-repeat;
    }
    .el-carousel__item:nth-child(3) {
         background:url("../assets/banner_2.jpg") 50% no-repeat;
     }
    .el-carousel__item:nth-child(4) {
        background:url("../assets/banner_1.jpg") 50% no-repeat;
    }
</style>