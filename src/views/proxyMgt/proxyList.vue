<template>
    <div class="main">
        <div class="searchBox">
            <el-button type="primary" class="add" @click="add">新增代理</el-button>
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
                    label="代理编号"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="代理名称"
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
                    width="200">
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
                    label="推广用户数"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="上级渠道"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="phone"
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
                    width="140"
                    fixed="right"
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
        <el-dialog title="新增代理" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="addForm">
                <el-form-item label="代理名称" 
                prop="name"
                :rules="{
                    required: true, message: '分类名称不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" 
                prop="id"
                :rules="{
                    required: true, message: '联系人不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" 
                prop="id"
                :rules="{
                    required: true, message: '联系方式不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证信息" 
                prop="img"
                :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上级渠道" 
                prop="name"
                :rules="{
                    required: true, message: '分类名称不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收款方式" 
                prop="name"
                :rules="{
                    required: true, message: '分类名称不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收款账号" 
                prop="id"
                :rules="{
                    required: true, message: '联系人不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form-item label="分成比例" 
                prop="name"
                :rules="{
                    required: true, message: '分类名称不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" 
                prop="id"
                :rules="{
                    required: true, message: '联系人不能为空', trigger: 'change'
                }"
                :label-width="formLabelWidth">
                    <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea">
                    </el-input>
                </el-form-item>
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
                 options: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                currentPage:1,
                formLabelWidth: '120px',//labelwidth
                dialogFormVisible: false,//控制dialog显示
                form:{name:'',id:'',img:''},
                imageUrl: '',//临时图片地址,
                searValue:'',
                date:''
            }
        },
        mounted(){
            //this.getList()
        },
        methods:{
            getList(){
                request({
                    url: '/system/orderDetail/list',
                    method: 'get',
                    params:{
                        startDate:this.date?this.date[0]:'',
                        endDate:this.date?this.date[1]:'',
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        type:2,//1渠道 2代理
                    }
                }).then((res)=>{
                    console.log(res)
                    // this.tableData=res.data
                    // this.total=res.count
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
            //新增分类
            add(){
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
            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(file)
                this.form.img=this.imageUrl
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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