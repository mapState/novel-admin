<template>
    <div class="main">
        <el-button type="primary" class="add" @click="addNovel">新增小说</el-button>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange1"
            :file-list="fileList">
            <el-button type="primary" class="">批量导入</el-button>
            <div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过500kb</div>
        </el-upload>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="id"
                    label="编号"
                    align="center"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="bookName"
                    label="书名"
                    align="center"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="bookImage"
                    label="封面图"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="bookAuthor"
                    label="作者"
                    align="center"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="bookIntroduce"
                    label="简介"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="freeRead"
                    label="章节"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="分类"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="频道"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="bookAmount"
                    label="价格"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="freeRead"
                    label="试读章节"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="setTop"
                    label="首页置顶"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                        <el-radio-group v-model="setTopRadio" size="small">
                            <el-radio-button label="是"></el-radio-button>
                            <el-radio-button label="否"></el-radio-button>
                        </el-radio-group>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="amwaySex"
                    label="性别推荐"
                    align="center"
                    width="100">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    align="center"
                    width="180"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row,3)" type="text" size="medium">新增章节</el-button>
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
        <el-dialog title="新增书籍" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="addForm" label-suffix=":">
                <el-form-item label="书名" 
                prop="name"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="封面图" 
                prop="id"
                :label-width="formLabelWidth">
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
                <el-form-item label="作者" 
                prop="id"
                :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" 
                prop="name"
                :label-width="formLabelWidth">
                    <el-checkbox-group v-model="checkboxGroup1">
                        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="分类" 
                prop="name"
                :label-width="formLabelWidth">
                    <el-checkbox-group v-model="checkboxGroup1">
                        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="频道" 
                prop="name"
                :label-width="formLabelWidth">
                    <el-checkbox-group v-model="checkboxGroup1">
                        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="价格" 
                prop="name"
                :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off">
                         <template slot="append">元</template>
                     </el-input>
                </el-form-item>
                <el-form-item label="试读章节" 
                prop="name"
                :label-width="formLabelWidth">
                     前<el-input-number v-model="form.num" :min="1"></el-input-number>章
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
    import request from '@/utils/request'
    export default {
        data(){
            return{
                tableData: [{
                    id: '1',
                    bookName: '都市',
                    bookImage:'',
                    bookAuthor:'1',
                    bookUrl:'',
                    bookIntroduce:'',
                    bookAmount:'1',
                    freeRead:'1',
                    amwaySex:1,
                    setTop:1,
                    type:'1'
                }, {
                    id: '1',
                    bookName: '都市',
                    bookImage:'1',
                    bookAuthor:'1',
                    bookUrl:'',
                    bookIntroduce:'',
                    bookAmount:'',
                    freeRead:'',
                    amwaySex:1,
                    setTop:1,
                    type:'1'
                }, {
                    id: '1',
                    bookName: '都市',
                    bookImage:'',
                    bookAuthor:'1',
                    bookUrl:'',
                    bookIntroduce:'',
                    bookAmount:'1',
                    freeRead:'1',
                    amwaySex:1,
                    setTop:1,
                    type:'1'
                }],
                currentPage:1,
                formLabelWidth: '120px',//labelwidth
                dialogFormVisible: false,//控制dialog显示
                form:{name:'',id:''},
                setTopRadio:'是',
                fileList:[{
                    name:'',
                    url:''
                }],
                dialogImageUrl: '',
                dialogVisible: false,
                checkboxGroup1: ['上海'],
                cities: ['上海', '北京', '广州', '深圳']
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
             getList(){
                request({
                    url: '/system/book/list',
                    method: 'get',
                    params:{
                        pageNo:this.pageNo,
                        pageSize:this.pageSize
                    }
                    }).then((res)=>{
                        this.count=res.count
                        this.tableData=res.data
                        console.log(res.data)
                })
            },
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
                }else if(index==2){//编辑
                    this.form=row
                    this.dialogFormVisible=true
                }else{//新增章节
                     
                }
            },
             handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //新增小说
            addNovel(){
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
            //批量上传
            handleChange1(file, fileList) {
                this.fileList = fileList;
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
        .add{
            margin-bottom:30px;
        }
        .pagination{
            float:right;
            margin-top:30px;
        }
    }
</style>