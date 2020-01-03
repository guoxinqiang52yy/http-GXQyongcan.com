<template>
    <div class="recom">
        <bread></bread>
        <!--卡片-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>推荐库</span>
            </div>
            <div class="shopclass">
                <!--添加按钮-->
                <el-button type="success"  icon="el-icon-plus" @click="dialogFormVisible = true" size="small">添加类库</el-button>
                <el-input placeholder="请输入内容" v-model="input2">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!--表格-->
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="ID"
                        prop="id"
                        width="80"
                >
                </el-table-column>
                <el-table-column
                        label="库名"
                        width="400">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="日期"
                        width="400">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.create_time | date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <router-link :to="{name:'parameter',params:{id:scope.row.id}}">
                            <el-button
                                    style="margin-left: 10px"
                                    size="mini"
                                    type="success"
                                    @click="handleAdd(scope.$index, scope.row)">添加规格</el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--对话框-->
        <el-dialog title="添加类库" :visible.sync="dialogFormVisible">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="模型名称">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addspecsFrom">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑对话框-->
        <el-dialog title="编辑类库" :visible.sync="dialogFormVisible1">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign1">
                <el-form-item label="模型名称">
                    <el-input v-model="formLabelAlign1.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addspecsFrom1(id,data)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import bread from "../../components/bread"
    import api from "../../api/index"
    export default {
        name: "shopclass",
        components:{bread},
        data(){
            return{
                labelPosition: 'left',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                formLabelAlign1: {},
                dialogFormVisible: false,
                dialogFormVisible1: false,
                tableData: [],
                input1: '',
                input2: '',
                input3: '',
                select: ''
            }
        },
        methods: {
            /*添加*/
            addspecsFrom(){
                api.recom.add(this.formLabelAlign).then(res=>{
                    if (res.data.code == 200){
                        this.$message({
                            type:'success',
                            message:'添加成功'
                        });
                        this.dialogFormVisible = false;
                        this.gettpl();
                        this.formLabelAlign = {}
                    } else{
                        this.$message({
                            type:"error",
                            message:'添加失败'
                        })
                    }
                }).catch(error=>{
                    this.$message({
                        type:"error",
                        message:'添加失败'
                    })
                })
            },
            //重载表格封装
            gettpl(){
                api.recom.get().then(res=>{
                    this.tableData = res.data.data;
                }).catch(err=>{
                    this.$message({
                        type:'error',
                        message:'获取失败'
                    })
                })
            },
            handleAdd(index, row) {
                console.log(index, row);
            },
            //点击修改
            handleEdit(index, row) {
                // console.log(row);
                this.dialogFormVisible1 = true;
                this.formLabelAlign1 = JSON.parse(JSON.stringify(row))
            },
            //修改提交
            addspecsFrom1(){
                var data = {
                    name:this.formLabelAlign1.name,
                    create_time:this.formLabelAlign1.create_time,
                };
                var ids =this.formLabelAlign1.id;
                api.recom.update(data,ids).then(res=>{
                    console.log(res);
                    if (res.data.code == 200){
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        })
                    }else{
                        this.$message({
                            type:'error',
                            message:'添加失败'
                        })
                    }
                }).catch(error=>{
                    this.$message({
                        type:"error",
                        message:'修改失败'
                    })
                })
            },
            //删除
            handleDelete(index, row) {
                // console.log(index, row);
                this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //执行删除
                    // console.log(row);
                    this.tableData.id = row.id;
                    api.recom.delete(this.tableData.id).then(res=>{
                        if (res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.gettpl();
                        } else{
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        }
                    }).catch(err=>{
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted() {
            this.gettpl();
        }
    }
</script>

<style scoped lang="less">
    .recom{


        .box-card {
            width: 100%;
            .shopclass{
                width: 100%;
                display: flex;
                justify-content: space-between;
                .el-input{
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