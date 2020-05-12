<template>
    <div class="main">
        <el-button type="primary" class="add" @click="add">新增用户</el-button>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                align="center"
                label="昵称"
                prop="loginName"
                width="200">
            </el-table-column>
            <el-table-column
                align="center"
                label="账号"
                prop="password"
                width="200">
            </el-table-column>
            <el-table-column
                align="center"
                label="身份"
                prop="type"
                width="200">
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,0)" type="text" size="medium">编辑</el-button>
                    <el-button @click="handleClick(scope.row,1)" type="text" size="medium">重置密码</el-button>
                    <el-button @click="handleClick(scope.row,2)" type="text" size="medium">禁用</el-button>
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
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
            <el-form :model="signInForm" ref="addForm" label-width="80px">
                <el-form-item label="用户名称">
                    <el-input v-model="signInForm.name" style="width:220px;"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="signInForm.name" style="width:220px;"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-radio-group v-model="signInForm.radio">
                        <el-radio-button label="管理员"></el-radio-button>
                        <el-radio-button label="运营"></el-radio-button>
                        <el-radio-button label="推广"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确认</el-button>
            </div>
        </el-dialog>
        <!-- 弹框 授权管理 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible1">
            <div class="list">
                a
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
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
                dialogFormVisible1:false,
                signInForm:{
                    name:1,
                    count:10,
                    radio:'管理员'
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
            //禁用用户
            delUser(userId){
                 request({
                    url: '/system/back/remove',
                    method: 'get',
                    params:{
                       userId
                    }
                }).then((res)=>{
                    console.log(res.data)
                })
            },
             getList(){
                request({
                    url: '/system/back/list',
                    method: 'get',
                    params:{
                        pageNo:this.pageNo,
                        pageSize:this.pageSize
                    }
                }).then((res)=>{
                    console.log(res.data)
                    this.tableData=res.data
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
                    this.dialogFormVisible1=true
                }else if(index===2){//拒绝
                this.$confirm('是否禁用?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            this.delUser(row.id)
                        this.$message({
                            type: 'success',
                            message: '已禁用!'
                        });
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });          
                    });
                }else{//重置密码

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