<template>
    <div class="main">
        <h3>活动设置</h3>
        <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="邀请好友奖励金额">
                <el-input v-model="form.a" style="width:200px;" placeholder="（书币）"></el-input>
                <el-button type="success" @click="save">保存</el-button>
            </el-form-item>
            <el-form-item label="新用户注册赠送" label-width="180px">
                <el-input v-model="form.b" style="width:200px;" placeholder="（书币）"></el-input>
                <el-button type="success" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import request from '@/utils/request'
  export default {
    data() {
      return {
        form:{
            a:1,
            b:1
        }
      }
    },
    mounted(){
      
    },
    methods: {
      setActivity(){
        request({
          url: '/system/dayData/list',
          method: 'get'
        }).then((res)=>{
            console.log(res)
        })
      },
      save(){

      }
    }
  }
</script>
<style lang="scss" scoped> 
    .main{
      padding:30px;
     
    }
</style>