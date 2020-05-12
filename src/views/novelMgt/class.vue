<template>
    <div class="main">
        <el-button type="primary" class="add" @click="addClass">新增分类</el-button>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="name"
                    label="分类名称"
                    align="center"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="编号"
                    align="center"
                    width="500">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row,0)" type="text" size="medium">删除</el-button>
                        <el-button type="text" size="medium" @click="handleClick(scope.row,1)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>
        <!-- 弹框 -->
        <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="addForm">
                <el-form-item label="分类名称" 
                prop="name"
                :rules="{
                    required: true, message: '分类名称不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="编号" 
                prop="id"
                :rules="{
                    required: true, message: '编号不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData: [{
                    id: '1',
                    name: '都市',
                }, {
                    id: '2',
                    name: '都市',
                }, {
                    id: '3',
                    name: '情感',
                }],
                currentPage:1,
                formLabelWidth: '120px',//labelwidth
                dialogFormVisible: false,//控制dialog显示
                form:{name:'',id:''}
            }
        },
        mounted(){

        },
        methods:{
            //row
            handleClick(row,index) {
                console.log(row,index);
                if(index===0){//删除
                    this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                        });          
                    });
                }else{//编辑
                    this.form=row
                    this.dialogFormVisible=true
                }
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //新增分类
            addClass(){
                this.dialogFormVisible=true
            },
            //提交新增分类
            submit(){
                //校验
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible=false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
     .main{
        padding:30px;
        .add{
            margin-bottom:30px;
        }
        .pagination{
            float:right;
            margin-top:30px;
        }
    }
</style>