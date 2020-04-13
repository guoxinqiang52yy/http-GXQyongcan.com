<template>
    <div class="recomDetails">
        <bread></bread>
        <!--卡片-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>月统计表</span>
            </div>
            <div style="width: 100%;">
                <el-form :inline="true" :model="formLabelAlign" class="report_demo_form">
                    <el-form-item label="选择日期：" size="medium" style="width:50%" prop="date">
                        <el-date-picker
                                v-model="formLabelAlign.date"
                                value-format="yyyy-MM"
                                format="yyyy 年 MM 月 dd 日"
                                type="month"
                                start-placeholder="开始"
                                end-placeholder="结束">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="老人类别" size="medium">
                        <el-select v-model="formLabelAlign.type" placeholder="请选择">
                            <el-option
                                    v-for="item in optionsType"
                                    :key="item.id"
                                    :label="item.type_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-row class="myReportD">
                        <el-col :span="4" style="border: none;padding:20px 0;">

                        </el-col>
                        <el-col :span="20" style="border: none;">
                            <div class="grid-content bg-purple">
                                <div class="grid-content bg-purple">
                                    <el-button style="float: right" size="mini" type="primary"
                                               @click="onSubmit(1)">查询
                                    </el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <!--表格-->
                <div class="table_pagination">
                    <div class="tableClass">
                        <el-table ref="table" class="form1"
                                  :cell-style="cellStyle"
                                  :header-cell-style="{'background-color': '#F3F6FD','color': '#606266','padding': '10px 0','text-align':'center'}"
                                  border stripe highlight-current-row :data="tableData">
                            <el-table-column type="selection" :resizable="false"></el-table-column>
                            <el-table-column align="center" label="序号" :resizable="false">
                                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
                            </el-table-column>
                            <el-table-column label="小区名称" prop="village_name" :resizable="false"></el-table-column>
                            <el-table-column label="馒头数" prop="mantou" :resizable="false"></el-table-column>
                            <el-table-column label="米饭数" prop="mifan" :resizable="false"></el-table-column>
                            <el-table-column label="13元标准数" prop="twstand" :resizable="false">

                            </el-table-column>
                            <el-table-column label="15元标准数" prop="fifstand" :resizable="false">

                            </el-table-column>

                        </el-table>
                    </div>
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
</template>

<script>
    import bread from "../../components/bread"
    import base from '../../api/base'
    import axios from "axios";

    export default {
        name: "recomDetails",
        components: {bread},
        data() {
            return {
                currentPage4: 1, /*分页*/
                pageSize: 20,
                total: 0,
                tableData: [], /*表格数据*/
                formLabelAlign: {
                    date: '',
                    type: -1
                },
                optionsType: [
                    {id: -1, type_name: "全部"},
                    {id: 0, type_name: "普通"},
                    {id: 1, type_name: "高龄"},
                    {id: 2, type_name: "残疾"},
                    {id: 3, type_name: "困难"}
                ],
            }
        },
        methods: {
            // 点击查询
            onSubmit(page) {
                var that = this
                var params = {
                    month:that.formLabelAlign.date,
                    token: sessionStorage.getItem("setToken"),
                    page:page,
                    type: that.formLabelAlign.type,
                }
                if ( params.month != "") {
                    axios.post(`${base.baseUrl}index.php/portal/order/allVillageMonth`, params)
                        .then(function (res) {
                            if (res.data.code === 1) {
                                that.tableData = res.data.data;
                                that.total = res.data.count
                            } else {
                                that.total = 0
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
                }else{
                    if (params.month == ""){
                        that.$message({
                            type: 'info',
                            message: "请选择时间"
                        })
                    }
                }

            },
            //回车查询
            searchEnterFun(e) {
                var keyCode = window.event ? e.keyCode : e.which;
                if (keyCode == 13) {
                    this.onSubmit()
                }
            },
            //分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.onSubmit(this.pageSize)
            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                this.onSubmit(this.currentPage4)
            },
            //表格样式
            cellStyle({row, column, rowIndex, columnIndex}) {
                return "text-align:center"
            },
        },
        mounted() {}
    }
</script>

<style scoped lang="less">
    .recomDetails {
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