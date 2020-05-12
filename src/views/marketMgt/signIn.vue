<template>
    <div class="main">
        <el-button type="primary" class="add" @click="add">添加签到</el-button>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                align="center"
                label="签到天数"
                prop="date"
                width="400">
                </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                label="签到奖励"
                width="400">
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,0)" type="text" size="medium">编辑</el-button>
                    <el-button @click="handleClick(scope.row,1)" type="text" size="medium">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 40, 100]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 弹框 -->
        <el-dialog title="添加签到" :visible.sync="dialogFormVisible">
            <el-form :model="signInForm" ref="addForm" label-width="80px">
                <el-form-item label="签到时间">
                    第
                    <el-input-number v-model="signInForm.num" @change="handleChange"></el-input-number>
                    天
                </el-form-item>
                <el-form-item label="签到奖励">
                    <el-input v-model="signInForm.count" style="width:220px;"></el-input>(书币)
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import request from '@/utils/request'
    export default {
        data(){
            return{
                tableData: [{
                    date: '2016-05-02',
                    name: '11',
                    address: '32'
                    }, {
                    date: '2016-05-04',
                    name: '11',
                    address: '3'
                    }, {
                    date: '2016-05-01',
                    name: '2',
                    address: '222'
                    }, {
                    date: '2016-05-03',
                    name: '23',
                    address: '33'
                }],
                total:0,
                currentPage:1,
                pageNo:1,
                pageSize:10,
                dialogFormVisible:false,
                signInForm:{
                    num:1,
                    count:10
                }
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
            submit(){

            },
            //添加公告
            add(){
                this.dialogFormVisible=true
            },
            handleChange(value){
                console.log(value);
            },
             getList(){
                request({
                    url: '/system/message/list',
                    method: 'get',
                    params:{
                        pageNo:this.pageNo,
                        pageSize:this.pageSize
                    }
                }).then((res)=>{
                    console.log(res)
                    // this.tableData=res.data
                    // this.total=res.count
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNo=val
            },
            //删除提现列表
            delListItem(ids){
                request({
                    url: '/system/cashOut/delete',
                    method: 'POST',
                    data:{
                        ids
                    }
                }).then((res)=>{
                    console.log(res)
                })
            },
            handleClick(row,index){
                if(index===0){//通过
                    this.$confirm('是否确认审核通过?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '审核通过!'
                        });
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });          
                    });
                }else{//拒绝
                this.$confirm('是否拒绝该审核?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '已拒绝!'
                        });
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });          
                    });
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
     .main{
        padding:30px;
        .add{
            margin-bottom:20px;
        }
        .pagination{
            float:right;
            margin-top:30px;
        }

    }
</style>