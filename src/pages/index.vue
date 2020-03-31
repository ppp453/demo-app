<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-right{
    float: right;
}
.layout-right-center{
    width: auto;
    padding: 0 12px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-right">
                        <div class="layout-right-center">
                            <Submenu name="1">
                            <template slot="title">
                                <Avatar style="color: #f56a00;background-color: #fde3cf">{{theFirstOfUserName}}</Avatar>
                            </template>
                            <MenuItem name="1-1">我的</MenuItem>
                            <MenuItem name="1-2">控制中心</MenuItem>
                            <MenuItem name="1-3" @click.native="modal1=true">
                                登出
                                <Modal
                                    v-model="modal1"
                                    title="提示"
                                    @on-ok="logout">
                                    <p>是否确定需要登出？</p>
                                </Modal>
                            </MenuItem>
                            </Submenu>
                        </div>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu :active-name="path.name" theme="light" width="auto" :open-names="['1']" accordion>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="testData" :to="{name:'testData'}">测试数据</MenuItem>
                            <MenuItem name="workorder" :to="{name:'workorder'}">工单</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                            <MenuItem name="3-3">Option 3</MenuItem>
                            <MenuItem name="3-4">Option 4</MenuItem>
                            <MenuItem name="3-5">Option 5</MenuItem>
                            <MenuItem name="3-6">Option 6</MenuItem>
                            <MenuItem name="3-7">Option 7</MenuItem>
                            <MenuItem name="3-8">Option 8</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 4
                            </template>
                            <MenuItem name="4-1">Option 1</MenuItem>
                            <MenuItem name="4-2">Option 2</MenuItem>
                            <MenuItem name="4-3">Option 3</MenuItem>
                            <MenuItem name="4-4">Option 4</MenuItem>
                            <MenuItem name="4-5">Option 5</MenuItem>
                            <MenuItem name="4-6">Option 6</MenuItem>
                            <MenuItem name="4-7">Option 7</MenuItem>
                            <MenuItem name="4-8">Option 8</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem v-for="p in paths" :key="p" :to="{name:p}">{{p}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import api from '@/api/api'
    export default {
        data() {
            return {
                user:{
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
                },
                modal1:false,
                path:{},
            }
        },

        created() {
            this.getUser();
            this.path = this.$router['currentRoute']
        },

        methods: {
            getUser:function(){
                api.getUser('/auth').then(resp=>{
                    this.user = resp.data;
                }).catch(err=>{
                    this.$Message.error(err.msg);
                })
            },
            logout:function(){
                localStorage.removeItem('token');
                this.$router.push({name:'login'});
            },
        },

        computed: {
            theFirstOfUserName:function(){
                return String(this.user.username).charAt(0);
            },
            paths:function(){
                return this.path.path.split('/');
            }
        },

        watch: {
            $route:{
                handler:function(val,oldVal){
                    this.path = val;
                }
            }
        },
    }
</script>