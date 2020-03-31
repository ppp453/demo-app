<template>
  <div class="login">
        <div class="from-wrap">
            <h2>登录</h2>
            <Form ref="login-data" :model="loginData" :rules="ruleInLine" :label-width="80">
                <Form-item prop="username">
                    <Input type="text" placeholder="请输入账号" v-model="loginData.username">
                        <Icon type="md-person" slot="prepend"/>
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" placeholder="请输入密码" v-model="loginData.password" @keyup.enter.native="login('login-data')">
                        <Icon type="md-lock" slot="prepend"/>
                    </Input>
                </Form-item>
                <FormItem class="form-footer">
                    <i-button type="primary" @click="login('login-data')" :loading="isLoading">Submit</i-button>
                    <i-button type="dashed" style="margin-left: 30px" @click="signIn">Sign In</i-button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import api from '@/api/api'
export default {
    data() {
        return {
            loginData:{
                username:'',
                password:'',
            },
            ruleInLine:{
                username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            },
            isLoading:false,
        }
    },
    methods: {
        login:function(name){
            var _this = this;
            _this.isLoading=true;
            _this.$refs[name].validate((valid) => {
                    if (valid) {
                        api.requestLogin(_this.loginData).then(response=>{
                            _this.$Message.success('登录成功!');
                            localStorage.setItem('token', response.data);
                            this.$router.go(-1);
                        }).catch(error=>{
                            _this.$Message.error(error.msg);
                            _this.isLoading = false;
                            });
                    } else {
                        _this.$Message.error('表单验证失败!');
                        _this.isLoading = false;
                    }
                });
        },
        signIn:function(){
            this.$router.push('/regist');
        }
    },
}
</script>

<style>
.login {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
    position: absolute;
}
.login .from-wrap{
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 400px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
}
.login h2 {
    text-align: center;
    margin-bottom: 20px;
}
.login FormItem {
    margin-bottom: 15px;
}
.login .form-footer {
    display: flex;
    margin-top: 20px;
}
.ivu-form-item-required .ivu-form-item-label:before {
    display: none;
}
.login input{
    display: inline;
}
</style>