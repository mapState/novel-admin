<template>
    <div class="main">
        <el-button type="primary" class="add" @click="dialogFormVisible=true">新增素材</el-button>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                align="center"
                label="素材编号"
                prop="date"
                width="400">
                </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                label="素材名称"
                width="400">
            </el-table-column>
            <el-table-column
                align="center"
                label="文件">
                <template slot-scope="scope">
                    <el-button @click="downLoad(scope.row)" type="text" size="medium">下载</el-button>
                </template>
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
                <el-form-item label="套餐名称">
                    <el-input v-model="signInForm.count" style="width:220px;"></el-input>
                </el-form-item>
                <el-form-item label="上传文件">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
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
                    img:''
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        mounted(){
            //this.getList()
        },
        methods:{
            //文件上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
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
            //下载文件
            downLoad(row){

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