<template>
    <div class="system">
        <bread></bread>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>街道管理</span>
            </div>
            <el-form label-width="80px" :inline="true" :model="formInline"
                     class="report_demo_form">
                <el-form-item label="街道名称" size="medium" style="width:30%">
                    <el-input clearable v-model="formInline.street_name"
                              @keyup.enter.native="searchEnterFun"></el-input>
                </el-form-item>
                <el-row class="myReportD">
                    <el-col :span="20" style="border: none;">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" icon="el-icon-circle-plus-outline"
                                       @click="dialogFormVisible = true" class="aaa"
                                       size="small">添加街道
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="4" style="border: none">
                        <div class="grid-content bg-purple">
                            <el-button style="float: right" size="mini" type="primary"
                                       @click="onSubmit()">查询
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>

            <!--表格-->
            <el-table
                    :cell-style="cellStyle"
                    :header-cell-style="{'background-color': '#F3F6FD','color': '#606266','padding': '10px 0','text-align':'center'}"
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column align="center" label="序号" :resizable="false">
                    <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
                </el-table-column>
                <el-table-column
                        prop="street_name"
                        :show-overflow-tooltip="true"
                        label="街道名称">
                </el-table-column>

                <el-table-column
                        prop="remark"
                        :show-overflow-tooltip="true"
                        label="备注">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFunction(scope.$index, scope.row)">
                            <i class="el-icon-edit-outline"></i>编辑
                        </el-button>
                        <el-button type="text" size="small" @click="deleteFunction(scope.$index, scope.row)">
                            <i class="el-icon-delete"></i>删除
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
        </el-card>
        <!--新增对话框-->
        <el-dialog title="添加街道" :visible.sync="dialogFormVisible">
            <el-form label-width="80px" :model="formLabelAlign">
                <el-form-item label="街道名称">
                    <el-input v-model="formLabelAlign.street_name"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="formLabelAlign.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="okFunction()">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑对话框-->
        <el-dialog title="编辑街道" :visible.sync="dialogFormVisibleEdit">
            <el-form label-width="80px" :model="formLabelAlignEdit">
                <el-form-item label="街道名称">
                    <el-input v-model="formLabelAlignEdit.street_name"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="formLabelAlignEdit.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="okFunction1()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import bread from "../../../components/bread"
    import api from "../../../api/index"
    import base from '../../../api/base'
    import axios from "axios";

    export default {
        name: "system",
        components: {bread},
        data() {
            return {
                activeName: '1',
                formInline: {
                    street_name: "",
                },
                optionsType: [
                    {id: 0, type_name: "普通"},
                    {id: 1, type_name: "高龄"},
                    {id: 2, type_name: "残疾"},
                    {id: 3, type_name: "困难"}
                ],
                formLabelAlign: {
                    remark: '',
                    street_name: '',
                },/*新增data*/
                formLabelAlignEdit: {},/*编辑data*/
                dialogFormVisible: false,
                dialogFormVisibleEdit: false,
                formLabelWidth: '80px',
                tableData: [],
                status: '100',
                input1: '',
                input2: '',
                input3: '',
                select: '',
                currentPage4: 1, /*分页*/
                pageSize: 20,
                total: 0,
            };
        },
        methods: {
            //新增确定
            okFunction() {
                var that = this
                var params = this.formLabelAlign
                params.token = sessionStorage.getItem("setToken")
                axios.post(`${base.baseUrl}index.php/portal/old/addStreet`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.$message({
                                type: 'success',
                                message: res.data.msg
                            })
                            that.dialogFormVisible = false
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
            //编辑确定
            okFunction1() {
                var that = this
                var params = that.formLabelAlignEdit
                params.token = sessionStorage.getItem("setToken")
                axios.post(`${base.baseUrl}index.php/portal/old/editStreet`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.$message({
                                type: 'success',
                                message: res.data.msg
                            })
                            that.dialogFormVisibleEdit = false
                            that.formLabelAlignEdit = {}
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
            //点击编辑
            editFunction(index, row) {
                let that = this
                that.dialogFormVisibleEdit = true
                that.formLabelAlignEdit = JSON.parse(JSON.stringify(row))
            },
            //删除
            deleteFunction(index, row) {
                this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this
                    var params = {id: row.id, token: sessionStorage.getItem("setToken")}
                    axios.post(`${base.baseUrl}index.php/portal/old/deleteStreet`, params)
                        .then(function (res) {
                            console.log(res);
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
                        message: '已取消删除'
                    });
                });
            },
            //表格样式
            cellStyle({row, column, rowIndex, columnIndex}) {
                return "text-align:center"
            },
            //重载表格封装
            gettpl(page, type) {
                var that = this
                var params = {
                    page: page,
                    token: sessionStorage.getItem("setToken"),
                    street_name: that.formInline.street_name,
                }
                axios.post(`${base.baseUrl}index.php/portal/old/streetList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.tableData = res.data.data;
                            that.total = res.data.count
                        } else {
                            that.total = 0;
                            that.tableData = []
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
            //分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.gettpl(this.pageSize)
            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                this.gettpl(this.currentPage4)
            },
            //回车查询
            searchEnterFun(e) {
                var keyCode = window.event ? e.keyCode : e.which;
                if (keyCode == 13) {
                    this.onSubmit()
                }
            },
            // 点击查询
            onSubmit() {
                this.gettpl(1)
            },

        },
        mounted() {
            this.gettpl(1)
        }
    }
</script>

<style scoped lang="less">
    .system {
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

        .box-card {
            .aaa, .el-table {
                margin-bottom: 20px;
            }

            .el-button--primary {
                margin-bottom: 20px;
                height: 30px;
                padding: 0 10px;
                background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
            }

            .pagination_clumun {
                margin-top: 20px;
                box-sizing: border-box;
                width: 100%;
                background: #ffffff;
                align-items: center;
                display: flex;

                span {
                    font-size: 13px;
                    font-weight: 400;
                    color: #606266;
                }
            }
        }
    }
</style>