<template>
    <div class="recom">
        <bread></bread>
        <!--卡片-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>月汇报表</span>
            </div>
            <div style="width: 100%;">
                <el-form :inline="true" :model="formLabelAlign" class="report_demo_form">
                    <!--<el-form-item label="选择日期：" size="medium" style="width:50%" prop="month">-->
                        <!--<el-select v-model="formLabelAlign.month" placeholder="请选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in options"-->
                                    <!--:key="item"-->
                                    <!--:label="item"-->
                                    <!--:value="item">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="选择日期：" size="medium" style="width:30%">
                        <el-date-picker
                                width="200"
                                v-model="formLabelAlign.valueTime"
                                value-format="yyyy-MM-dd"
                                format="yyyy 年 MM 月 dd 日"
                                type="daterange"
                                start-placeholder="开始"
                                end-placeholder="结束">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="foodout1" prop="village_id" label="居委会：" size="medium">
                        <el-cascader
                                placeholder="街道/居委会/小区"
                                v-model="formLabelAlign.village_id"
                                :options="options1"
                                @change="handleChange"
                                :props="props">
                        </el-cascader>
                            <el-tooltip class="item" effect="dark" :content="formLabelAlign.village_id" placement="top-start">
                        <el-input :disabled="true" class="formLabelAlign" v-model="formLabelAlign.village_id"></el-input>
                            </el-tooltip>
                    </el-form-item>
                    <el-row class="myReportD">
                        <el-col :span="20" style="border: none;">
                            <div class="grid-content bg-purple">
                            </div>
                        </el-col>
                        <el-col :span="4" style="border: none;padding:20px 0;">
                            <div class="grid-content bg-purple">
                                <el-button size="mini"
                                           style="margin-right: 10px"
                                           type="primary"
                                           @click="editClickUp">领取表
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </el-card>
    </div>
</template>

<script>
    import bread from "../../components/bread"
    import base from '../../api/base'
    import axios from "axios";

    export default {
        name: "shopclass",
        components: {bread},
        data() {
            return {
                props: {
                    value: "name",
                    label: "name",
                    children: "child",
                },
                formLabelAlign: {
                    village_id: '',
                    village_ids: '',
                    valueTime: '',
                    start_time:'',
                    end_time:''
                },
                options: [],
                options1: [],
                childArray:[],
            }
        },
        methods: {
            //领取表
            editClickUp() {
                if (this.formLabelAlign.valueTime) {
                    for (var j = 0; j < this.formLabelAlign.valueTime.length; j++) {
                        this.formLabelAlign.start_time = this.formLabelAlign.valueTime[0]
                        this.formLabelAlign.end_time = this.formLabelAlign.valueTime[1]
                    }
                }
                var params = this.formLabelAlign
                if (params.village_ids != "" && params.month != "") {
                    var a = document.createElement('a')
                    a.href = `${base.baseUrl}index.php/portal/order/excelByMonth?start_time=${params.start_time}&village_id=${params.village_ids}&end_time=${params.end_time}&token=${sessionStorage.getItem("setToken")}`
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } else {
                    if (params.village_ids == ""){
                        this.$message({
                            type: 'info',
                            message: "请选择小区"
                        })
                    }
                    if (params.month == ""){
                        this.$message({
                            type: 'info',
                            message: "请选择时间"
                        })
                    }
                }
            },
            //获取月份
            getSelect() {
                var that = this
                var params = {
                    token: sessionStorage.getItem("setToken"),
                    type: 1,
                }
                axios.post(`${base.baseUrl}index.php/portal/order/getMonth`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.options = res.data.data;
                        } else {
                            that.options = []
                            that.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //级联选择器
            handleChange(value) {
                this.formLabelAlign.village_id = value.join("/")
                console.log(this.childArray);
                if (this.childArray.length > 0) {
                    for (var i = 0; i < this.childArray.length; i++) {
                                if (this.childArray[i].name === value[1]) {
                                    this.formLabelAlign.village_ids = this.childArray[i].id
                                }
                    }
                }
            },
            //获取选项
            getSelect1() {
                var that = this
                var params = {
                    token: sessionStorage.getItem("setToken"),
                }
                axios.post(`${base.baseUrl}index.php/portal/old/getList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.options1 = res.data.data;
                            for (var i = 0; i < that.options1.length; i++) {
                                if (that.options1[i].child) {
                                    for (var j = 0; j < that.options1[i].child.length; j++) {
                                        if (that.options1[i].child[j].child) {
                                            that.options1[i].child[j].child = ""
                                            that.childrenData = that.options1[i].child[j]
                                            that.childArray.push(that.childrenData)
                                        }
                                    }
                                }
                            }
                        } else {
                            that.options1 = []
                            that.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
        created(){
            this.getSelect1();
        },
        mounted() {
            this.getSelect();

        }
    }
</script>

<style scoped lang="less">
    .recom {
        /deep/ .report_demo_form .el-form-item__content .el-date-editor, .report_demo_form .el-form-item__content, .report_demo_form .report_demo_form .el-form-item__content .el-select {
            width: 100% !important;
        }
        /deep/ .report_demo_form .el-form-item__content {
            width: 60% !important;
        }
        .foodout1{
            position: relative;
        }
        .foodout1 .formLabelAlign{
            position: absolute;
            left: 0;
            top:0;
            width: 80% !important;
        }
        .box-card {
            width: 100%;

            .shopclass {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .el-input {
                    width: 40%;

                }
            }
            .el-button--primary {
                height: 30px;
                padding: 0 10px;
                background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
            }

            /*.el-select .el-input {*/
                /*width: 130px;*/
            /*}*/

            .input-with-select .el-input-group__prepend {
                background-color: #fff;
            }

            .text {
                font-size: 14px;
            }

            .item {
                margin-bottom: 18px;
            }

            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }

            .clearfix:after {
                clear: both
            }
        }

    }
</style>