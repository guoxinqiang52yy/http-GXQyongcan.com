<template>
    <div class="math">
        <bread></bread>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户管理</span>
            </div>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true" class="aaa"
                       size="small">添加用户
            </el-button>
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
                        label="所在街道">
                </el-table-column>
                <el-table-column
                        prop="nbc_name"
                        :show-overflow-tooltip="true"
                        label="所在居委会">
                </el-table-column>
                <el-table-column
                        prop="village_name"
                        :show-overflow-tooltip="true"
                        label="所在小区">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="年龄">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="性别">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="老人类别">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editFunction(scope.$index, scope.row)">
                            <i class="el-icon-edit-outline"></i>编辑
                        </el-button>
                        <el-button type="text" size="small" @click="detailsFunction(scope.$index, scope.row)">
                            <i class="el-icon-delete"></i>详情
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
                        :page-sizes="[10,20,30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
        <!--新增对话框-->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form label-width="100px" :model="formLabelAlign">
                <el-form-item label="所在街道">
                    <el-select v-model="formLabelAlign.street_id" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.street_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在居委会">
                    <el-select v-model="formLabelAlign.nbc_id" placeholder="请选择">
                        <el-option
                                v-for="item in optionsNbc"
                                :key="item.id"
                                :label="item.nbc_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在小区">
                    <el-select v-model="formLabelAlign.village_id" placeholder="请选择">
                        <el-option
                                v-for="item in optionsVill"
                                :key="item.id"
                                :label="item.village_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="老人类别">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="户籍住址">
                    <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input placeholder="社保卡" v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="okFunction()">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑对话框-->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
            <el-form label-width="100px" :model="formLabelAlignEdit">
                <el-form-item label="所在街道">
                    <el-select v-model="formLabelAlignEdit.street_id" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.street_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在居委会">
                    <el-select v-model="formLabelAlignEdit.nbc_id" placeholder="请选择">
                        <el-option
                                v-for="item in optionsNbc"
                                :key="item.id"
                                :label="item.nbc_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在小区">
                    <el-select v-model="formLabelAlignEdit.village_id" placeholder="请选择">
                        <el-option
                                v-for="item in optionsVill"
                                :key="item.id"
                                :label="item.village_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formLabelAlignEdit.region"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="formLabelAlignEdit.region"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formLabelAlignEdit.region"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="formLabelAlignEdit.region"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formLabelAlignEdit.region"></el-input>
                </el-form-item>
                <el-form-item label="老人类别">
                    <el-input v-model="formLabelAlignEdit.region"></el-input>
                </el-form-item>
                <el-form-item label="户籍住址">
                    <el-input v-model="formLabelAlignEdit.region"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input placeholder="社保卡" v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="okFunction1()">确 定</el-button>
            </div>
        </el-dialog>
        <!--详情对话框-->
        <el-dialog title="查看用户" :visible.sync="dialogFormVisibleDetails">
            <el-form :disabled="true" label-width="100px" :model="formLabelAlignDetails">
                <el-form-item label="所在街道">
                    <el-select v-model="formLabelAlignDetails.name" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在居委会">
                    <el-select v-model="formLabelAlignDetails.name" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在小区">
                    <el-select v-model="formLabelAlignDetails.name" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
                <el-form-item label="老人类别">
                    <el-input v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
                <el-form-item label="户籍住址">
                    <el-input v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input placeholder="社保卡" v-model="formLabelAlignDetails.region"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleDetails = false">取 消</el-button>
                <el-button type="primary" @click="okFunction2()">确 定</el-button>
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
        name: "shopguige",
        components: {bread},
        data() {
            return {
                activeName: '1',
                formLabelAlign: {
                    street_id: '',
                    village_id: '',
                    nbc_id: '',
                },/*新增数据*/
                formLabelAlignEdit: {},/*编辑数据*/
                formLabelAlignDetails: {},/*编辑数据*/
                dialogFormVisible: false,
                dialogFormVisibleEdit: false,
                dialogFormVisibleDetails: false,
                formLabelWidth: '80px',
                tableData: [],
                status: '100',
                input1: '',
                input2: '',
                input3: '',
                select: '',
                options: [],
                optionsNbc:[],
                optionsVill:[],
                currentPage4: 1, /*分页*/
                pageSize: 10,
                total: 0,
            }
        },
        methods: {
            //详情确定
            okFunction2() {
                let that = this
                that.dialogFormVisibleDetails = false
            },
            //详情
            detailsFunction(index, row) {
                let that = this
                that.dialogFormVisibleDetails = true
                that.formLabelAlignDetails = JSON.parse(JSON.stringify(row))
            },
            //新增确定
            okFunction() {
                var that = this
                var params = this.formLabelAlign
                params.token = "wch1228310"
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
                params.token = "wch1228310"
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
                    var params = {id: row.id,token:"wch1228310"}
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
                    token: "wch1228310",
                    type: type
                }
                axios.post(`${base.baseUrl}index.php/portal/old/streetList`, params)
                    .then(function (res) {
                        that.tableData = res.data.data;
                        if (res.data.code === 1) {
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
            //分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.gettpl(this.pageSize, 1)
            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                this.gettpl(this.currentPage4, 1)
            },
        },
        mounted() {
            this.gettpl(1,0)
        }
    }
</script>

<style scoped lang="less">
    .math {
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
            .el-input {
                width: 40%;
                float: right;
                margin-top: 20px;
            }

            .operation {
                .el-icon-thumb {
                    margin-right: 5px;
                    color: orangered;
                    font-size: 16px;
                }

                span, p {
                    display: block;
                    color: #4FC0E8;
                }

                h6 {
                    font-weight: 600;
                    color: orangered;
                }
            }

            .el-table {
                margin-top: 10px;
            }

            .clearfix {
                p {
                    font-size: 14px;
                    color: #a6a9ad;
                    margin-left: 20px;
                    display: inline;
                }
            }

            .el-pagination {
                margin-top: 10px;
            }
        }

        .box-card:after {
            clear: both;
        }
    }

</style>