<template>
  <div>
      <Table border :columns="nameList" :data="userList" :loading="loading"></Table>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
    data() {
        return {
            userList:[
                {
                    id:Number,
                    username:String,
                    salt:Number,
                    phone:Number,
                    emailAddress:String,
                    roleId:Number,
                    roleName:String,
                    createDate:Date,
                    modifyDate:Date,
                    img:String
                }
            ],
            nameList:[
                {
                    title:'用户名',
                    key:'username'
                },
                {
                    title:'电话',
                    key:'phone'
                },
                {
                    title:'电子邮件',
                    key:'emailAddress',
                },
                {
                    title:'角色',
                    key:'roleName',
                },
            ],
            loading:true,
        }
    },

    created() {
        this.getData();
    },
    methods: {
        getData:function(){
            api.helloWorldData().then(resp=>{
                this.userList = resp.data;
                this.loading = false;
            }).catch(err=>err)
        }
    },
}
</script>

<style>

</style>