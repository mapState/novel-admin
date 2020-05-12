<template>
    <div class="main">
        <div class="searchBox">
            <el-button type="primary" @click="add">新增渠道</el-button>
            <el-button type="primary" class="fr sBtn" @click="searchBook">搜索</el-button>
            <el-input
                class='fr sInput'
                size="smail"
                placeholder="请输入渠道名称、手机号"
                v-model.trim="searValue"
                clearable>
            </el-input>
        </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="id"
                    label="渠道编号"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="渠道名称"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="联系人"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="联系方式"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="userImg"
                    label="身份证信息"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <a :href="scope.row.userImg" target="_blank">
                            <img :src="scope.row.userImg" alt="" class="img"/>
                        </a>
                        <a :href="scope.row.userImg" target="_blank">
                            <img :src="scope.row.userImg" alt="" class="img"/>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="推广代理数"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="分红"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="a"
                    label="收款方式"
                    align="center"
                    width="100">
                </el-table-column> 
                 <el-table-column
                    prop="a"
                    label="收款账号"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="提现记录">
                    <template slot-scope="scope">
                         <el-button @click="look(scope.row)" type="text" size="medium">查看</el-button>
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="a"
                    label="备注"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row,0)" type="text" size="medium">编辑</el-button>
                        <el-button type="text" size="medium" @click="handleClick(scope.row,1)">充值密码</el-button>
                        <el-button type="text" size="medium" @click="handleClick(scope.row,2)">删除</el-button>
                        <el-button type="text" size="medium" @click="handleClick(scope.row,2)">禁用</el-button>
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
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 弹框 -->
        <el-dialog title="新增书籍" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="addForm" label-suffix=":">
                <el-form-item label="渠道名称" 
                prop="name"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" 
                prop="id"
                :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" 
                prop="name"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off">
                     </el-input>
                </el-form-item>
                <el-form-item label="身份证(正反)" 
                prop="id"
                :label-width="formLabelWidth">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible1">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="收款方式" 
                prop="name"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off">
                     </el-input>
                </el-form-item>
                <el-form-item label="收款账号" 
                prop="name"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off">
                         <template slot="append">元</template>
                     </el-input>
                </el-form-item>
                <el-form-item label="分成比例" 
                prop="name"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off">
                         <template slot="append">%</template>
                     </el-input>
                </el-form-item>
                <el-form-item label="备注" 
                prop="name"
                :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.num">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
    </div>
</template>

<script>
import request from '@/utils/request'
    export default {
        data(){
            return{
                pageNo:1,
                pageSize:10,
                total:0,
                tableData: [{
                    id: '1',
                    userName: '都市',
                    userImg:'https://hbimg.huabanimg.com/d456b512b67ddc09e6246d44470d1e79c10e138ce44b-D9auW9_fw658',
                    phone:'11111111111',
                    money:'11',
                    a:'11',
                    createUserId:'1',
                    region:'1',
                }],
                currentPage:1,
                formLabelWidth: '120px',//labelwidth
                dialogFormVisible: false,//控制dialog显示
                form:{name:'',id:'',img:''},
                searValue:'',
                form:{name:'',id:''},
                setTopRadio:'是',
                fileList:[{
                    name:'',
                    url:''
                }],
                dialogImageUrl: '',
                dialogVisible: false,
                 dialogVisible1: false,
                checkboxGroup1: ['上海'],
                cities: ['上海', '北京', '广州', '深圳']

            }
        },
        mounted(){
            //this.getList()
        },
        methods:{
            getList(){
                request({
                    url: '/system/back/list',
                    method: 'get',
                    params:{
                        pageNo:this.pageNo,
                        pageSize:this.pageSize
                    }
                }).then((res)=>{
                    console.log(res)
                    this.tableData=res.data
                    this.total=res.count
                })
            },
            searchBook(){
                console.log(this.searValue)
            },
            //row
            look(row){//查看
                
            },
            handleClick(row,index) {
                console.log(row,index);
                if(index===2){//禁用
                    this.$confirm('此操作将禁用该会员, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '禁用成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                        });          
                    });
                }else if(index==0){//设置会员
                    
                }else{//充值书币

                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNo=val
            },
            //新增小说
            add(){
                this.dialogFormVisible=true
            },
            import1(){
                
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
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>
<style lang="scss" scoped>
     .main{
        padding:30px;
        .searchBox{
            width:100%;
            height: 40px;
            padding-bottom:60px;
            .sInput{
                width:300px;
                margin-right: 10px;
            }
            .sBtn{
                height: 40px;
            }
            .fr{
                float: right;
            }
        }
        .add{
            margin-bottom:30px;
        }
        .pagination{
            float:right;
            margin-top:30px;
        }
        .img{
            width:50px;
            height:50px;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
            border: 1px dashed #d9d9d9;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>