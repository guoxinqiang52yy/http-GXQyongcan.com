<template>
    <div class="updatepas">
        <bread></bread>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <!--表单-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldpass">
                    <el-input v-model="ruleForm.oldpass" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpass">
                    <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import bread from "../../components/bread"
    export default {
        name: "updatepas",
        components:{bread},
        data() {
            return {
                ruleForm: {
                    username:this.$store.state.loginform.username,
                    oldpass: this.$store.state.loginform.password,
                    newpass:'',
                    password: '',
                },
                rules: {
                    username:[
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    newpass: [
                        {required:'true', message:'请输入新密码', trigger: 'blur' }
                    ],
                    password: [
                        {required:'true', message:'请再次输入密码', trigger: 'blur' }
                    ],
                    oldpass: [
                        { required:'true',message:'请输入旧密码',trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            // console.log(this.$store.state.loginform);
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
.updatepas{

}
</style>