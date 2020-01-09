<template>
    <div class="foodoutReyurn">
        <bread></bread>
        <!--卡片-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>后厨配餐管理</span>
            </div>
            <div style="width: 100%;">
                <el-form :inline="true" :model="formLabelAlign" class="report_demo_form">
                    <el-form-item label="选择日期：" size="medium" style="width:50%" prop="month">
                        <el-date-picker
                                v-model="formLabelAlign.date"
                                value-format="yyyy-MM-dd"
                                format="yyyy 年 MM 月 dd 日"
                                type="date"
                                start-placeholder="开始"
                                end-placeholder="结束">
                        </el-date-picker>
                    </el-form-item>
                    <el-row class="myReportD">
                        <el-col :span="20" style="border: none;">
                            <div class="grid-content bg-purple">
                                <el-button size="mini"
                                           style="margin-right: 10px"
                                           type="primary"
                                           @click="editClickUp">领取表
                                </el-button>
                            </div>
                        </el-col>
                        <el-col :span="4" style="border: none;padding:20px 0;">
                            <div class="grid-content bg-purple">

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
        name: "foodoutReyurn",
        components: {bread},
        data() {
            return {
                formLabelAlign: {
                    date: '',
                },
            }
        },
        methods: {
            //领取表
            editClickUp() {
                var params = this.formLabelAlign
                if ( params.date != "") {
                    var a = document.createElement('a')
                    a.href = `${base.baseUrl}index.php/portal/order/chunExcel?date=${params.date}&token=${sessionStorage.getItem("setToken")}`
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } else {
                    if (params.date == ""){
                        this.$message({
                            type: 'info',
                            message: "请选择时间"
                        })
                    }
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .foodoutReyurn {
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

            .el-select .el-input {
                width: 130px;
            }

            .foodout1 {
                position: relative;
            }

            .foodout1 .formLabelAlign {
                position: absolute;
                left: 0;
                top: 0;
                width: 80%;
            }

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