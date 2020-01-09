<template>
    <div class="box">
        <div class="wrap">
            <div class="math">
                <bread></bread>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>缴费情况管理</span>
                    </div>
                    <div style="width: 100%;">
                        <el-form :rules="rules" label-width="90px" :inline="true" :model="formInline"
                                 class="report_demo_form">
                            <el-form-item label="用户姓名：" size="medium" style="width:19%">
                                <el-input v-model="formInline.user_name"
                                          @keyup.enter.native="searchEnterFun"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号：" size="medium" style="width:19%">
                                <el-input v-model="formInline.mobile"
                                          @keyup.enter.native="searchEnterFun"></el-input>
                            </el-form-item>
                            <el-form-item label="选择日期：" size="medium" style="width:19%">
                                <el-date-picker
                                        v-model="formInline.valueTime"
                                        value-format="yyyy-MM-dd"
                                        format="yyyy 年 MM 月 dd 日"
                                        type="daterange"
                                        start-placeholder="开始"
                                        end-placeholder="结束">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item class="foodout1" prop="village_id" label="小区：" size="medium">
                                <el-cascader
                                        placeholder="街道/居委会/小区"
                                        v-model="formInline.village_id"
                                        :options="options"
                                        @change="handleChange"
                                        :props="props">
                                </el-cascader>
                                <el-input :disabled="true" class="formLabelAlign"
                                          v-model="formInline.village_id"></el-input>
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
                                        <el-button style="float: right" size="mini" type="primary"
                                                   @click="onSubmit()">查询
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div style="width: 100%;">
                            <!--表格-->
                            <el-table ref="table" class="form1"

                                      :cell-style="cellStyle"
                                      :header-cell-style="{'background-color': '#F3F6FD','color': '#606266','padding': '10px 0','text-align':'center'}"
                                      border stripe highlight-current-row :data="tableData">
                                <el-table-column type="selection" :resizable="false"></el-table-column>
                                <el-table-column align="center" label="序号" :resizable="false">
                                    <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
                                </el-table-column>
                                <el-table-column label="姓名" prop="user_name" :resizable="false"></el-table-column>
                                <el-table-column label="身份证号" prop="card_number" :resizable="false"></el-table-column>
                                <el-table-column label="年龄" prop="age" :resizable="false"></el-table-column>
                                <el-table-column label="性别" prop="sex" :resizable="false">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.sex === 0?"男":"女"}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="电话" prop="mobile" :resizable="false">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.mobile == null?"--":scope.row.mobile}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="缴费日期" prop="add_time" :resizable="false"></el-table-column>
                                <el-table-column label="交费金额" prop="money" :resizable="false"></el-table-column>
                                <el-table-column label="缴费状态" prop="pay_status" :resizable="false">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.pay_status == 0?"未交":"已交"}}</span>
                                    </template>

                                </el-table-column>
                                <el-table-column fixed="right"
                                                 label="操作"
                                                 width="150">
                                    <template slot-scope="scope">
                                        <el-button type="text" @click="showInTable(scope.row)">
                                            缴费
                                        </el-button>
                                        <el-button type="text" :class="scope.row.pay_status == 0?'paystatus':'paystatushide'" @click="showIngo(scope.row)">
                                            补交
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!--分页器-->
                            <div class="pagination_clumun">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage4"
                                        :page-size="pageSize"
                                        layout="total, prev, pager, next"
                                        :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <!--缴费对话框-->
        <el-dialog title="缴费" :visible.sync="dialogFormVisibleGo">
            <!--表格-->
            <el-table ref="table" class="form1"
                      :row-key="row_key"
                      :cell-style="cellStyle"
                      :header-cell-style="{'background-color': '#F3F6FD','color': '#606266','padding': '10px 0','text-align':'center'}"
                      border stripe highlight-current-row :data="tableDataIn">
                <el-table-column type="selection" :resizable="false"></el-table-column>
                <el-table-column align="center" label="序号" :resizable="false">
                    <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
                </el-table-column>
                <el-table-column label="主食" prop="main_food" :resizable="false"></el-table-column>
                <el-table-column label="标准" prop="standard" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{scope.row.standard == 13?"13元":"15元"}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="配送日期" prop="send_date" :resizable="false"></el-table-column>
                <el-table-column label="配送方式" prop="send_type" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{scope.row.send_type == 0?"自取":scope.row.send_type == 1?"送餐":"堂食"}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页器-->
            <div class="pagination_clumun">
                <el-pagination
                        @size-change="handleSizeChange3"
                        @current-change="handleCurrentChange3"
                        :current-page="currentPage3"
                        :page-size="pageSize3"
                        layout="total, prev, pager, next"
                        :total="total1">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleGo = false">取 消</el-button>
                <el-button type="primary" @click="okFunction()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import bread from "../../../components/bread"
    import base from '../../../api/base'
    import axios from "axios";

    export default {
        name: "vipdetails",
        components: {bread},
        data() {
            return {
                pay_status: false,
                dialogFormVisibleGo: false,
                hackReset: false,
                rows: {},
                options: [],
                currentPage4: 1, /*分页*/
                pageSize: 20,
                currentPage3: 1, /*分页*/
                pageSize3: 20,
                total: 0,
                total1: 0,
                tableData: [], /*表格数据*/
                tableDataIn: [],/*详情表格*/
                formInline: {
                    user_name: '',
                    mobile: '',
                    start_time: '',
                    end_time: '',
                    village_id: '',
                    village_ids: '',
                    valueTime: ''
                }, /*查询的表单数据*/
                datasDatas: [], /*查询年份*/
                arrDate_: [{id: '', date: '全部'}], /*查询年份*/
                multipleSelection: [],
                childArray: [],
                childrenData: [],
                props: {
                    value: "name",
                    label: "name",
                    children: "child",
                },
                rules: {
                    village_id: [
                        {type: 'string', required: true, message: '请选择小区', trigger: 'change'}
                    ]
                },
            }
        },
        methods: {
            //补交
            showIngo(row) {
                this.$confirm(`是否补交${row.money}元?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this
                    var params = {id: row.id, token: sessionStorage.getItem("setToken")}
                    axios.post(`${base.baseUrl}index.php/portal/order/buJiao`, params)
                        .then(function (res) {
                            if (res.data.code === 1) {
                                that.$message({
                                    type: 'success',
                                    message: res.data.msg
                                })
                                that.gettpl(1, 0)
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
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消补交'
                    });
                });
            },
            // 销毁组件
            handleClose() {
                this.$confirm('确认关闭?', '提示').then(() => {
                    this.hackReset = false;// 销毁组件
                    this.dialogTableVisible = false;
                    /*
                    * 功能: 关闭归档弹框时触发行内浏览事件,刷新数据
                    * */
                    this.showInTable(this.rows);
                }).catch(() => {
                });
            },
            // 点击查询
            onSubmit() {
                var that = this
                if (that.formInline.valueTime) {
                    for (var j = 0; j < that.formInline.valueTime.length; j++) {
                        that.formInline.start_time = that.formInline.valueTime[0]
                        that.formInline.end_time = that.formInline.valueTime[1]
                    }
                }
                var params = {
                    user_name: that.formInline.user_name,
                    mobile: that.formInline.mobile,
                    village_id: that.formInline.village_ids,
                    start_time: that.formInline.start_time,
                    end_time: that.formInline.end_time,
                    token: sessionStorage.getItem("setToken"),
                }
                axios.post(`${base.baseUrl}index.php/portal/order/orderList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.tableData = res.data.data;
                            that.total = res.data.count
                        } else {
                            that.total = 0;
                            that.tableData = [];
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
            //回车查询
            searchEnterFun(e) {
                var keyCode = window.event ? e.keyCode : e.which;
                if (keyCode == 13) {
                    this.onSubmit()
                }
            },
            //领取表
            editClickUp() {
                var params = this.formInline
                console.log(params);
                var a = document.createElement('a')
                a.href = `${base.baseUrl}index.php/portal/order/excelPay?user_name=${params.user_name}&mobile=${params.mobile}&village_id=${params.village_ids}&start_time=${params.start_time}&end_time=${params.end_time}&token=${sessionStorage.getItem("setToken")}`
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            },
            //分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.gettpl(this.pageSize)
            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                this.gettpl(this.currentPage4)
            },
            handleSizeChange3(val) {
                this.pageSize3 = val;
                this.gettpl(this.pageSize3)
            },
            handleCurrentChange3(val) {
                this.currentPage3 = val;
                this.gettpl(this.currentPage3)
            },
            row_key(row) {
                return row.id;
            },
            //点击缴费详情
            showInTable(row) {
                let that = this
                that.dialogFormVisibleGo = true
                var params = {
                    token: sessionStorage.getItem("setToken"),
                    id: row.id
                }
                axios.post(`${base.baseUrl}index.php/portal/order/orderDetail`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.tableDataIn = res.data.data;
                            that.total1 = res.data.data.length
                        } else {
                            that.total1 = 0;
                            that.tableDataIn = [];
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
            //新增确定
            okFunction() {
                var that = this
                if (this.formLabelAlign.send_date) {
                    this.formLabelAlign.send_date = this.formLabelAlign.send_date.join(",")
                }
                var params = this.formLabelAlign
                params.token = sessionStorage.getItem("setToken")
                axios.post(`${base.baseUrl}index.php/portal/order/addOrder`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.$message({
                                type: 'success',
                                message: res.data.msg
                            })
                            that.dialogFormVisibleGo = false
                            that.formLabelAlign = {}
                            that.gettpl(1, 0)
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
            //全选
            handleSelectionChange(data) {
                this.multipleSelection = data;
            },
            cellStyle({row, column, rowIndex, columnIndex}) {
                return "text-align:center"
            },
            //级联选择器
            handleChange(value) {
                this.formInline.village_id = value.join("/")
                if (this.childArray.length > 0) {
                    for (var i = 0; i < this.childArray.length; i++) {
                        if (this.childArray[i].length > 0) {
                            for (var j = 0; j < this.childArray[i].length; j++) {
                                if (this.childArray[i][j].name === value[2]) {
                                    this.formInline.village_ids = this.childArray[i][j].id
                                }
                            }
                        }
                    }
                }
            },
            //获取选项
            getSelect() {
                var that = this
                var params = {
                    token: sessionStorage.getItem("setToken"),
                }
                axios.post(`${base.baseUrl}index.php/portal/old/getList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.options = res.data.data;
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
            //初次加载数据
            gettpl(page, type) {
                var that = this
                var params = {
                    page: page,
                    token:sessionStorage.getItem("setToken"),
                    type: type
                }
                axios.post(`${base.baseUrl}index.php/portal/order/orderList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.tableData = res.data.data;
                            that.tableData.length > 0 ? that.total = that.tableData.length : that.total = 0;
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
        created() {

        },
        mounted() {
            this.gettpl(1, 0)
            this.getSelect()
        }
    }
</script>

<style lang="less" scoped>

.paystatus{
    display: block;
}
.paystatushide{
    display: none;
}
    .el-button--primary {
        height: 30px;
        padding: 0 10px;
        margin: 0;
        background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
    }

    .el-button {
        height: 30px;
        padding: 0 10px;
        margin-right: 10px
    }

    .box {
        .form_inline {
            /*.el-input {*/
            /*width: 274px;*/
            /*height: 54px;*/
            /*}*/
        }

        .percentage {
            width: 100px;
            margin: 0 10px;

        }

        .adminImg {
            text-align: center;
            align-items: center;
        }

        .el-col {
            border-radius: 2px;
            padding: 10px;
            box-sizing: border-box;

            img {
                width: 337px;
            }
        }

        .wrap {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;

            .el-main {
                display: flex;
                flex-direction: column;
            }


            .el-main {
                .demo-form-inline {
                    border-bottom: 1px solid rgba(0, 0, 0, .1);
                }

                /*.el-form-item .el-input, .el-select {*/
                /*width: 150px;*/
                /*}*/

                .demo-table-expand {
                    font-size: 0;
                }

                .demo-table-expand label {
                    width: 90px;
                    color: #99a9bf;
                }

                .demo-table-expand .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 50%;
                }

                .myReportD {
                    margin: 0;
                }
            }

        }
    }

    /deep/ .report_demo_form .el-form-item__content {
        width: 60% !important;
    }

    /deep/ .report_demo_form .el-form-item__content .el-date-editor, .report_demo_form .el-form-item__content, .report_demo_form .report_demo_form .el-form-item__content .el-select {
        width: 100% !important;
    }

    .foodout1 {
        position: relative;

    }

    .foodout1 .formLabelAlign {
        position: absolute;
        left: 0;
        top: 0;
        width: 80% !important;

    }

    .report_demo_form .el-form--inline .el-form-item {
        margin: 0;
    }

    .edit_dialog {
        overflow: hidden;
        padding: 100px 0;
    }

    /deep/ .edit_dialog .el-dialog {
        height: 100% !important;
        margin: 0 auto !important;
        overflow: hidden !important;
        display: flex;
        flex-direction: column;
    }

    /deep/ .edit_dialog .el-dialog .el-dialog__body {
        flex: 1 !important;
        overflow: hidden !important;
        padding: 20px;
    }

    /deep/ .edit_dialog .el-dialog .el-dialog__footer {
        padding: 0 20px 20px 20px;
    }

    .edit_dialog .edit_dialog_table {
        height: 100%;
        overflow-y: auto;
    }

    /deep/ .el-form {
        width: 100% !important;
    }

    .dialog_quickly {
        overflow: hidden;
        padding: 50px 0;
    }

    /deep/ .dialog_quickly .el-dialog {
        height: 100% !important;
        margin: 0 auto !important;
        overflow: hidden !important;
        display: flex;
        flex-direction: column;
    }

    /deep/ .dialog_quickly .el-dialog .el-dialog__body {
        flex: 1 !important;
        overflow: hidden !important;
        padding: 20px;
    }

    /deep/ .binding {
        width: 100%;
        height: 100%;
        padding: 100px 0;
        overflow: hidden;
    }

    /deep/ .binding .el-dialog {
        height: 100% !important;
        overflow: hidden !important;
        margin: 0 auto !important;
        display: flex;
        flex-direction: column;
    }

    /deep/ .binding .el-dialog .el-dialog__body {
        flex: 1 !important;
        overflow: hidden !important;
    }

    /deep/ .binding .el-dialog .el-dialog__body .bottom {
        height: 100% !important;
        overflow: hidden !important;
    }

    /deep/ .binding .el-dialog .el-dialog__body .bottom .archiverate_box {
        height: 100% !important;
        overflow: hidden !important;
        display: flex;
        flex-direction: column;
    }

    /deep/ .binding .el-dialog .el-dialog__body .bottom .roughly_tabel {
        flex: 1;
        overflow-y: auto;
    }

    .el-table {
        margin-bottom: 20px;
    }
</style>
