<template>
    <div class="main">
        <el-button type="primary" class="add" @click="dialogFormVisible=true">新增套餐</el-button>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                align="center"
                label="编号"
                prop="id"
                width="180">
                </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                label="套餐名称"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="giveAmout"
                label="权益描述">
            </el-table-column>
            <el-table-column
                align="center"
                prop="amount"
                label="套餐价格"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="time"
                label="套餐时长">
            </el-table-column>
            <el-table-column
                align="center"
                prop="createDate"
                label="创建时间">
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,0)" type="text" size="medium">下架</el-button>
                    <el-button @click="handleClick(scope.row,1)" type="text" size="medium">编辑</el-button>
                    <el-button @click="handleClick(scope.row,2)" type="text" size="medium">删除</el-button>
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

        <el-dialog title="新增套餐" :visible.sync="dialogFormVisible">
            <el-form :model="addForm">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="addForm.a"></el-input>
                </el-form-item>
                <el-form-item label="权益描述" :label-width="formLabelWidth">
                    <el-input v-model="addForm.a" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="套餐价格" :label-width="formLabelWidth">
                    <el-input v-model="addForm.a">
                        <template slot="append">(书币)</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="套餐时长" :label-width="formLabelWidth">
                    <el-radio-group v-model="addForm.time">
                        <el-radio-button label="月"></el-radio-button>
                        <el-radio-button label="季度"></el-radio-button>
                        <el-radio-button label="年"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
                 formLabelWidth: '80px',
                addForm:{
                    a:1,
                    time:'月'
                }
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
             getList(){
                request({
                    url: '/system/billMenu/list',
                    method: 'get',
                    params:{
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        billType:1//套餐类型 1会员 2书币套餐
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
            handleClick(row,index){
                if(index===0){//下架
                    
                }else if(index===2){//删除
                this.$confirm('是否删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '已删除!'
                        });
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });          
                    });
                }else{//编辑
                    
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