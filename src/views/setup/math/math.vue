<template>
    <div class="math">
        <bread></bread>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户管理</span>
            </div>
            <el-form label-width="80px" :inline="true" :model="formInline"
                     class="report_demo_form">
                <el-form-item label="用户名" size="medium" style="width:19%">
                    <el-input type="text" v-model="formInline.user_name"
                              clearable @keyup.enter.native="searchEnterFun"></el-input>
                </el-form-item>
                <el-form-item label="手机号" size="medium" style="width:19%">
                    <el-input type="number" v-model="formInline.mobile"
                              clearable @keyup.enter.native="searchEnterFun"></el-input>
                </el-form-item>
                <el-form-item label="生日" size="medium" style="width:19%">
                    <el-input type="text" placeholder="格式 (11月21日)" v-model="formInline.birth"
                              @keyup.enter.native="searchEnterFun"></el-input>
                </el-form-item>
                <el-form-item class="foodout1" label="小区：" size="medium" style=""
                >
                    <el-cascader
                            clearable
                            :props="props"
                            placeholder="街道/居委会/小区"
                            v-model="formInline.village_id"
                            :options="options"
                            @change="handleChange">
                    </el-cascader>
                    <el-input :disabled="true" class="formLabelAlign"
                              v-model="formInline.village_id">
                    </el-input>
                </el-form-item>
                <el-form-item label="老人类别" size="medium">
                    <el-select v-model="formInline.type" placeholder="请选择">
                        <el-option
                                v-for="item in optionsType"
                                :key="item.id"
                                :label="item.type_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row class="myReportD">
                    <el-col :span="20" style="border: none;">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" icon="el-icon-circle-plus-outline"
                                       @click="dialogFormVisible = true" class="aaa" size="small">添加用户
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
                        prop="user_name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="birth"
                        label="生日">
                </el-table-column>
                <el-table-column
                        prop="card_number"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        prop="age"
                        label="年龄">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex === 0?"男":"女"}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="用户类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.type === 0?"普通":scope.row.type === 1?"高龄":scope.row.type === 2?"残疾":"困难"}}</span>
                    </template>
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
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
        <!--新增对话框-->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form label-width="100px" :model="formLabelAlign">
                <el-form-item label="所在街道">
                    <el-select v-model="formLabelAlign.street_id" placeholder="请选择"
                               @change="streetChange(formLabelAlign.street_id,JSON.parse(JSON.stringify(formLabelAlign)))">
                        <el-option
                                v-for="item in optionsV"
                                :key="item.id"
                                :label="item.street_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在居委会">
                    <el-select filterable v-model="formLabelAlign.nbc_id" placeholder="请选择"
                               @change="nbcChange(formLabelAlign.nbc_id,JSON.parse(JSON.stringify(formLabelAlign)))">
                        <el-option
                                v-for="item in optionsNbc"
                                :key="item.id"
                                :label="item.nbc_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在小区">
                    <el-select filterable v-model="formLabelAlign.village_id" placeholder="请选择">
                        <el-option
                                v-for="item in optionsVill"
                                :key="item.id"
                                :label="item.village_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="老人类别">
                    <el-select v-model="formLabelAlign.type" placeholder="请选择">
                        <el-option
                                v-for="item in optionsType"
                                :key="item.id"
                                :label="item.type_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formLabelAlign.user_name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input type="text" v-model="formLabelAlign.card_number"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input type="number" v-model="formLabelAlign.mobile"></el-input>
                </el-form-item>
                <el-form-item label="户籍住址">
                    <el-input v-model="formLabelAlign.address"></el-input>
                </el-form-item>
                <el-form-item label="现住址">
                    <el-input v-model="formLabelAlign.now_address"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input type="number" placeholder="社保卡" v-model="formLabelAlign.bank_card"></el-input>
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
                    <el-select v-model="formLabelAlignEdit.street_id" placeholder="请选择"
                               @change="streetChange(formLabelAlignEdit.street_id,JSON.parse(JSON.stringify(formLabelAlignEdit)))">
                        <el-option
                                v-for="item in optionsV"
                                :key="item.id"
                                :label="item.street_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在居委会">
                    <el-select filterable v-model="formLabelAlignEdit.nbc_id" placeholder="请选择"
                               @change="nbcChange(formLabelAlignEdit.nbc_id,JSON.parse(JSON.stringify(formLabelAlignEdit)))">
                        <el-option
                                v-for="item in optionsNbc"
                                :key="item.id"
                                :label="item.nbc_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在小区">
                    <el-select filterable v-model="formLabelAlignEdit.village_id" placeholder="请选择"
                               @change="villageChange">
                        <el-option
                                v-for="item in optionsVill"
                                :key="item.id"
                                :label="item.village_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="老人类别">
                    <el-select v-model="formLabelAlignEdit.type" placeholder="请选择">
                        <el-option
                                v-for="item in optionsType"
                                :key="item.id"
                                :label="item.type_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formLabelAlignEdit.user_name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input type="text" v-model="formLabelAlignEdit.card_number"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input type="number" v-model="formLabelAlignEdit.mobile"></el-input>
                </el-form-item>
                <el-form-item label="户籍住址">
                    <el-input v-model="formLabelAlignEdit.address"></el-input>
                </el-form-item>
                <el-form-item label="现住址">
                    <el-input v-model="formLabelAlignEdit.now_address"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input type="number" placeholder="社保卡" v-model="formLabelAlignEdit.bank_card"></el-input>
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
                    <el-select v-model="formLabelAlignDetails.street_id" placeholder="请选择"
                               @change="streetChange(formLabelAlignDetails.street_id)">
                        <el-option
                                v-for="item in optionsV"
                                :key="item.id"
                                :label="item.street_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在居委会">
                    <el-select filterable v-model="formLabelAlignDetails.nbc_id" placeholder="请选择"
                               @change="nbcChange(formLabelAlignDetails.nbc_id)">
                        <el-option
                                v-for="item in optionsNbc"
                                :key="item.id"
                                :label="item.nbc_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在小区">
                    <el-select filterable v-model="formLabelAlignDetails.village_id" placeholder="请选择">
                        <el-option
                                v-for="item in optionsVill"
                                :key="item.id"
                                :label="item.village_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="老人类别">
                    <el-select v-model="formLabelAlignDetails.type" placeholder="请选择">
                        <el-option
                                v-for="item in optionsType"
                                :key="item.id"
                                :label="item.type_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formLabelAlignDetails.user_name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input type="text" v-model="formLabelAlignDetails.card_number"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input type="number" v-model="formLabelAlignDetails.mobile"></el-input>
                </el-form-item>
                <el-form-item label="户籍住址">
                    <el-input v-model="formLabelAlignDetails.address"></el-input>
                </el-form-item>
                <el-form-item label="现住址">
                    <el-input v-model="formLabelAlignDetails.now_address"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input type="number" placeholder="社保卡" v-model="formLabelAlignDetails.bank_card"></el-input>
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
                formInline: {
                    user_name: '',
                    mobile: '',
                    birth: '',
                    village_id: null,
                    village_ids: null,
                    type: -1
                },
                optionsType: [
                    {id: 0, type_name: "普通"},
                    {id: 1, type_name: "高龄"},
                    {id: 2, type_name: "残疾"},
                    {id: 3, type_name: "困难"},
                    {id: -1, type_name: "全部"},
                ],
                formLabelAlign: {
                    street_id: null,
                    village_id: null,
                    nbc_id: null,
                    user_name: '',
                    card_number: '',
                    bank_card: '',
                    address: '',
                    type: '',
                    mobile: '',
                    now_address: ''
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
                optionsNbc: [],
                optionsVill: [],
                optionsV: [],
                childArray: [],
                childrenData: [],
                props: {
                    value: "name",
                    label: "name",
                    children: "child",
                },
                currentPage4: 1, /*分页*/
                pageSize: 20,
                total: 0,
            }
        },
        methods: {
            //删除
            deleteFunction(index, row) {
                this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this
                    var params = {id: row.id, token: sessionStorage.getItem("setToken")}
                    axios.post(`${base.baseUrl}index.php/portal/old/deleteUser`, params)
                        .then(function (res) {
                            if (res.data.code === 1) {
                                that.$message({
                                    type: 'success',
                                    message: res.data.msg
                                })
                                that.gettpl(1)
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
                    type: that.formInline.type,
                    user_name: that.formInline.user_name,
                    mobile: that.formInline.mobile,
                    birth: that.formInline.birth,
                    village_id: that.formInline.village_ids
                }
                axios.post(`${base.baseUrl}index.php/portal/old/userList`, params)
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
            //详情确定
            okFunction2() {
                let that = this
                that.dialogFormVisibleDetails = false
            },
            //详情
            detailsFunction(index, row) {
                let that = this
                that.dialogFormVisibleDetails = true
                var params = {id: row.id, token: sessionStorage.getItem("setToken")}
                axios.post(`${base.baseUrl}index.php/portal/old/getUser`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.formLabelAlignDetails = res.data.data
                            var formLabelAlignEdit = JSON.parse(JSON.stringify(that.formLabelAlignDetails))
                            that.getSelectNbc(that.formLabelAlignDetails.street_id, formLabelAlignEdit)
                            that.getSelectVill(that.formLabelAlignDetails.nbc_id, formLabelAlignEdit)
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
            //新增确定
            okFunction() {
                var that = this
                var params = this.formLabelAlign
                params.token = sessionStorage.getItem("setToken")
                axios.post(`${base.baseUrl}index.php/portal/old/addUser`, params)
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

                axios.post(`${base.baseUrl}index.php/portal/old/editUser`, params)
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
                var params = {id: row.id, token: sessionStorage.getItem("setToken")}
                axios.post(`${base.baseUrl}index.php/portal/old/getUser`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.formLabelAlignEdit = res.data.data
                            var formLabelAlignEdit = JSON.parse(JSON.stringify(that.formLabelAlignEdit))
                            that.getSelectNbc(that.formLabelAlignEdit.street_id, formLabelAlignEdit)
                            that.getSelectVill(that.formLabelAlignEdit.nbc_id, formLabelAlignEdit)

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
            //选择街道时
            streetChange(id, formLabelAlignEdit) {
                this.getSelectNbc(id, formLabelAlignEdit)
            },
            //选择居委会时
            nbcChange(id, formLabelAlignEdit) {
                var formData = JSON.parse(JSON.stringify(formLabelAlignEdit))
                this.$set(formData, formData.nbc_id, id)
                this.getSelectVill(id, formLabelAlignEdit)
            },
            //选择小区时
            villageChange(val) {
                var formData = JSON.parse(JSON.stringify(this.formLabelAlignEdit))
                this.$set(formData, formData.village_id, val)
            },
            //获取街道选项
            getSelect() {
                var that = this
                var params = {
                    token: sessionStorage.getItem("setToken"),
                    type: 1,
                }
                axios.post(`${base.baseUrl}index.php/portal/old/streetList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.optionsV = res.data.data;
                        } else {
                            that.optionsV = []
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
            //获取居委会选项
            getSelectNbc(street_id, formLabelAlignEdit) {
                formLabelAlignEdit.nbc_id = null
                var that = this
                var params = {
                    token: sessionStorage.getItem("setToken"),
                    type: 1,
                    street_id: street_id
                }
                axios.post(`${base.baseUrl}index.php/portal/old/nbcList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.optionsNbc = res.data.data;
                            for (var j = 0; j < that.optionsNbc.length; j++) {
                                if (that.optionsNbc[j].id === formLabelAlignEdit.nbc_id) {
                                    formLabelAlignEdit.nbc_id = that.optionsNbc[j].id
                                }
                            }
                        } else {
                            formLabelAlignEdit.nbc_id = null
                            that.optionsNbc = []
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
            //获取小区选项
            getSelectVill(nbc_id, formLabelAlignEdit) {
                formLabelAlignEdit.village_id = null
                var that = this
                var params = {
                    token: sessionStorage.getItem("setToken"),
                    type: 1,
                    nbc_id: nbc_id
                }
                axios.post(`${base.baseUrl}index.php/portal/old/villageList`, params)
                    .then(function (res) {
                        if (res.data.code === 1) {
                            that.optionsVill = res.data.data;
                            for (var a = 0; a < that.optionsVill.length; a++) {
                                if (that.optionsVill[a].id === formLabelAlignEdit.village_id) {
                                    formLabelAlignEdit.village_id = that.optionsVill[a].id
                                }
                            }
                        } else {
                            formLabelAlignEdit.village_id = null
                            that.optionsVill = []
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
            getSelectlist() {
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
        },
        created() {
            var that = this
            that.getSelectlist()
        },
        mounted() {
            this.gettpl(1)
            this.getSelect()

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