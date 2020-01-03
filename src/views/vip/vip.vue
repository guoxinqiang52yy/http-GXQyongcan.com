<template>
    <div class="box">
        <div class="wrap">
            <!-- IE 不支持 el-main因为vue底层会创建<main />标签 -->
            <div class="math">
                <bread></bread>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>用户管理</span>
                    </div>
                    <div style="width: 100%;">
                        <el-form label-width="90px" :inline="true" :model="formInline" class="report_demo_form">
                            <el-form-item label="用户姓名：" size="medium" style="width:19%">
                                <el-input v-model="formInline.taskCode" @keyup.enter.native="searchEnterFun"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号：" size="medium" style="width:19%">
                                <el-input v-model="formInline.companyCheck"
                                          @keyup.enter.native="searchEnterFun"></el-input>
                            </el-form-item>
                            <el-form-item label="选择日期：" size="medium" style="width:19%">
                                <el-input v-model="formInline.sampleName"
                                          @keyup.enter.native="searchEnterFun"></el-input>
                            </el-form-item>
                            <el-form-item label-width="150px" label="街道/居委会/小区：" size="medium" style="width:30%">
                                <el-cascader
                                        v-model="formInline.value"
                                        :options="options"
                                        @change="handleChange"></el-cascader>
                            </el-form-item>
                            <el-row class="myReportD">
                                <el-col :span="20" style="border: none;">
                                    <div class="grid-content bg-purple">
                                        <el-button size="mini"
                                                   style="margin-right: 10px"
                                                   type="primary"
                                                   @click="editClickUp">领取表
                                        </el-button>
                                        <el-button size="mini" type="primary" @click="filingRate">导出收据表</el-button>
                                    </div>
                                </el-col>
                                <el-col :span="4" style="border: none;padding:20px 0;">
                                    <div class="grid-content bg-purple">
                                        <el-button style="float: right" size="mini" type="primary"
                                                   @click="onSubmit(formInline,1,10)">查询
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div style="width: 100%;">
                            <div>
                                <!--表格-->
                                <el-table ref="table" class="form1"
                                          :row-key="row_key"
                                          :cell-style="cellStyle"
                                          :header-cell-style="{'background-color': '#F3F6FD','color': '#606266','padding': '10px 0','text-align':'center'}"
                                          border stripe highlight-current-row :data="tableData">
                                    <el-table-column type="selection" :resizable="false"></el-table-column>
                                    <el-table-column align="center" label="序号" :resizable="false">
                                        <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
                                    </el-table-column>
                                    <el-table-column label="姓名" prop="taskCode" :resizable="false"></el-table-column>
                                    <el-table-column label="身份证号" prop="checkTypeID"
                                                     :resizable="false"></el-table-column>
                                    <el-table-column label="年龄" prop="companyCheck"
                                                     :resizable="false"></el-table-column>
                                    <el-table-column label="性别" prop="sampleName" :resizable="false"></el-table-column>
                                    <el-table-column label="电话" prop="sampleType" :resizable="false">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.sampleType == null?"--":scope.row.sampleType}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="300px" :resizable="false">
                                        <template slot-scope="scope">
                                            <el-button type="text" style="color:#32AFF0;marginLeft:6px;"
                                                       @click="showInTable(scope.row)">缴费
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
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
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <!--缴费对话框-->
        <el-dialog title="缴费" :visible.sync="dialogFormVisibleGo">
            <el-form label-width="100px" :model="formLabelAlign">
                <el-form-item label="主食">
                    <el-select v-model="formLabelAlign.zjsign">
                        <el-option label="米饭" value="1"></el-option>
                        <el-option label="馒头" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标准">
                    <el-select v-model="formLabelAlign.zjsign">
                        <el-option label="12元" value="1"></el-option>
                        <el-option label="15元" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="配送方式">
                    <el-select v-model="formLabelAlign.zjsign">
                        <el-option label="自取" value=""></el-option>
                        <el-option label="送餐" value="1"></el-option>
                        <el-option label="堂食" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期选择器">
                    <el-date-picker
                            type="dates"
                            v-model="formLabelAlign.value"
                            placeholder="选择一个或多个日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleGo = false">取 消</el-button>
                <el-button type="primary" @click="okFunction()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import bread from "../../components/bread"
    import api from "../../api/index"

    export default {
        name: "vip",
        components: {bread},
        data() {
            return {
                dialogFormVisibleGo: false,
                hackReset: false,
                rows: {},
                options: [
                    {
                        value: 'zhinan',
                        label: '指南',
                        children: [{
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [{
                                value: 'yizhi',
                                label: '一致'
                            }]
                        }, {
                            value: 'daohang',
                            label: '导航',
                            children: [{
                                value: 'cexiangdaohang',
                                label: '侧向导航'
                            }, {
                                value: 'dingbudaohang',
                                label: '顶部导航'
                            }]
                        }]
                    }, {
                        value: 'zujian',
                        label: '组件',
                        children: [{
                            value: 'basic',
                            label: 'Basic',
                            children: [{
                                value: 'layout',
                                label: 'Layout 布局'
                            }]
                        }, {
                            value: 'form',
                            label: 'Form',
                            children: [{
                                value: 'radio',
                                label: 'Radio 单选框'
                            }]
                        }, {
                            value: 'navigation',
                            label: 'Navigation',
                            children: [{
                                value: 'menu',
                                label: 'NavMenu 导航菜单'
                            }, {
                                value: 'tabs',
                                label: 'Tabs 标签页'
                            }]
                        }, {
                            value: 'others',
                            label: 'Others',
                            children: [{
                                value: 'dialog',
                                label: 'Dialog 对话框'
                            }, {
                                value: 'tooltip',
                                label: 'Tooltip 文字提示'
                            }, {
                                value: 'popover',
                                label: 'Popover 弹出框'
                            }]
                        }]
                    }],
                currentPage4: 1, /*分页*/
                pageSize: 10,
                total: 0,
                tableData: [
                    {
                        taskCode: '颜色',
                        checkTypeID: 'red/blue/pink',
                        companyCheck: '2019-3-12',
                        province: '打野',
                        sampleName: "333"
                    },
                    {
                        taskCode: '颜色',
                        checkTypeID: 'red/blue/pink',
                        companyCheck: '2019-3-12',
                        province: '打野',
                        sampleName: "333"
                    },
                ], /*表格数据*/
                formInline: {
                    taskCode: '',
                    companyCheck: '',
                    sampleName: '',
                    searchdate: '',
                    sampleType: '',
                    zjsign: '',
                    itemscode: '',
                    value: [],
                }, /*查询的表单数据*/
                datasDatas: [], /*查询年份*/
                arrDate_: [{id: '', date: '全部'}], /*查询年份*/
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: '',
                    value: ''
                },/*缴费表单数据*/
                multipleSelection: [],
            }
        },
        methods: {
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

            //导出收据表
            filingRate() {
                // var a = document.createElement('a')
                // // a.href = 'http://60.247.58.105:19608/api/item/export'
                // a.href = `${base.baseUrl}/item/export`
                // document.body.appendChild(a);
                // a.click();
                // document.body.removeChild(a);
            },
            // 点击查询
            onSubmit(formInline, currentPage, pageSize) {

                this.currentPage4 = currentPage;
                this.pageSize = pageSize;
                formInline.currentPage = this.currentPage4;
                formInline.pageSize = this.pageSize;
                this.$api.myReport.queryProject(formInline).then(res => {
                    this.tableData = res.data.data;
                    this.tableData.length > 0 ? this.total = this.tableData[0].total : this.total = 0;
                    this.loadings = false;
                }).catch(error => {
                    this.$message({type: 'error', message: error.data.message, duration: 1500});
                    this.loadings = false;
                })
            },
            //回车查询
            searchEnterFun(e) {
                var keyCode = window.event ? e.keyCode : e.which;
                if (keyCode == 13) {
                    this.onSubmit(this.formInline, 1, 10)
                }
            },
            //获取用户信息//获取前10年查询年份
            userMSG() {
                //获取前10年年分
                var myDate = new Date();
                var thisYear = myDate.getFullYear();
                var thisYearid = thisYear - 9;
                var Section = thisYear - thisYearid;
                var Yearis = 0;
                for (var i = 0; i <= Section; i++) {
                    myDate = {
                        id: Yearis++, date: thisYear--
                    };
                    this.arrDate_.push(myDate)
                }
                this.datasDatas = this.arrDate_

            },
            //领取表
            editClickUp() {
                // var a = document.createElement('a')
                // // a.href = 'http://60.247.58.105:19608/api/item/export'
                // a.href = `${base.baseUrl}/item/export`
                // document.body.appendChild(a);
                // a.click();
                // document.body.removeChild(a);
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.onSubmit(this.formInline, this.currentPage4, this.pageSize)
            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                this.onSubmit(this.formInline, this.currentPage4, this.pageSize)
            },
            row_key(row) {
                return row.id;
            },
            //点击缴费
            showInTable(row) {
                let that = this
                that.dialogFormVisibleGo = true
            },
            //新增确定
            okFunction() {
                // api.vip.add(this.formLabelAlign).then(res=>{
                //     if (res.data.code == 200){
                //         this.$message({
                //             type:'success',
                //             message:'缴费成功'
                //         });
                //         this.dialogFormVisibleGo = false;
                //         this.gettpl();
                //         this.formLabelAlign = {}
                //     } else{
                //         this.$message({
                //             type:"error",
                //             message:'缴费失败'
                //         })
                //     }
                // }).catch(error=>{
                //     this.$message({
                //         type:"error",
                //         message:'缴费失败'
                //     })
                // })
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
                console.log(value);
            },
            //初次加载数据
            gettpl() {
                //获取表格数据
                // api.vip.get().then(res=>{
                //     this.tableData = res.data.data;
                // }).catch(err=>{
                //     this.$message({
                //         type:'error',
                //         message:'获取失败'
                //     })
                // })
                //获取input数据
                // api.vip.getInput().then(res=>{
                //     this.tableData = res.data.data;
                // }).catch(err=>{
                //     this.$message({
                //         type:'error',
                //         message:'获取失败'
                //     })
                // })
            },

        },
        created() {
            this.userMSG();
        },
        mounted() {
            this.gettpl()
        }
    }
</script>

<style lang="less" scoped>
    .table_pagination {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        overflow: hidden;
        padding: 0 20px 20px 20px;


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

    .el-button--primary {
        height: 30px;
        padding: 0 10px;
        margin: 0;
        background: linear-gradient(90deg, rgba(96, 157, 248, 1), rgba(84, 183, 235, 1));
    }

    .box {
        .form_inline {
            .el-input {
                width: 274px;
                height: 54px;
            }
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

                .el-form-item .el-input, .el-select {
                    width: 150px;
                }

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

    /deep/ .report_demo_form .el-form-item__content .el-date-editor, .report_demo_form .el-form-item__content .el-input, .report_demo_form .el-form-item__content .el-input__inner, .report_demo_form .el-form-item__content .el-select {
        width: 100% !important;
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
    .el-table{
        margin-bottom: 20px;
    }
</style>
