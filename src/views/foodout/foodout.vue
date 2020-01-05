<template>
    <div class="recom">
        <bread></bread>
        <!--卡片-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>推荐库</span>
            </div>
            <div style="width: 100%;">
                <el-form :rules="rules" :inline="true" :model="formLabelAlign" class="report_demo_form">
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
                    <el-form-item prop="village_id" label="小区：" size="medium" style="width:30%">
                        <el-cascader
                                placeholder="街道/居委会/小区"
                                v-model="formLabelAlign.village_id"
                                :options="options"
                                @change="handleChange"
                                :props="props">
                        </el-cascader>
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
        name: "foodout",
        components: {bread},
        data() {
            return {
                formLabelAlign: {
                    date: '',
                    village_id: '',
                    village_ids: ''
                },
                options: [],
                childrenData: [],
                childArray: [],
                rules: {
                    month: [
                        {type: 'string', required: true, message: '请选择月份', trigger: 'change'}
                    ]
                },
                props: {
                    value: "name",
                    label: "name",
                    children: "child",
                },
            }
        },
        methods: {
            //领取表
            editClickUp() {
                var params = this.formLabelAlign
                var a = document.createElement('a')
                a.href = `${base.baseUrl}index.php/portal/order/excelText?date=${params.date}&village_id=${params.village_ids}&token=${"wch1228310"}`
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            },
            //获取街道选项
            getSelect() {
                var that = this
                var params = {
                    token: "wch1228310",
                    type: 1,
                }
                axios.post(`${base.baseUrl}index.php/portal/order/getMonth`, params)
                    .then(function (res) {
                        console.log(res.data.data);
                        if (res.data.code === 1) {
                            res.data.data.length === 0 ?
                                that.options = [] : that.options = res.data.data;
                        } else {
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
                if (this.childArray.length > 0) {
                    console.log(this.childArray);
                    for (var i = 0; i < this.childArray.length; i++) {
                        if (this.childArray[i].length > 0) {
                            for (var j = 0; j < this.childArray[i].length; j++) {
                                if (this.childArray[i][j].name === value[2]) {
                                    this.formLabelAlign.village_ids = this.childArray[i][j].id
                                    console.log(this.formLabelAlign.village_ids);
                                }
                            }

                        }

                    }
                }

            },
            //获取选项
            getSelect1() {
                var that = this
                var params = {
                    token: "wch1228310",
                }
                axios.post(`${base.baseUrl}index.php/portal/old/getList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            res.data.data.length === 0 ?
                                that.options = [] : that.options = res.data.data;
                            for (var i = 0; i < that.options.length; i++) {
                                if (that.options[i].child) {
                                    for (var j = 0; j < that.options[i].child.length; j++) {
                                        if (that.options[i].child[j].child) {
                                            that.childrenData = that.options[i].child[j].child
                                            that.childArray.push(that.childrenData)
                                        }
                                    }
                                }
                            }
                        } else {
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
        mounted() {
            this.getSelect();
            this.getSelect1();
        }
    }
</script>

<style scoped lang="less">
    .recom {


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

            .el-select .el-input {
                width: 130px;
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