<template>
    <div class="register flex-column">
        <el-form :model="ruleForm" class="form-box" :rules="rules">
            <el-form-item prop="name">
                <el-input v-model="ruleForm.name"
                          autofocus
                          placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item prop="phone">
                <el-input
                        v-model="ruleForm.phone"
                        prop="phone"
                        placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                        v-model="ruleForm.password"
                        type="password"
                        placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item prop="surepassword">
                <el-input v-model="ruleForm.surepassword"
                          type="password"
                          placeholder="请再次输入密码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">立即注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    phone: '',
                    password: '',
                    surepassword: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入正确的电话号码', trigger: 'blur'},
                        {min: 11, max: 11, message: '长度为11为', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, message: '密码最短为6位', trigger: 'blur'}
                    ],
                    surepassword: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {min: 6, message: '密码最短为6位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submit() {
                if (this.ruleForm.password !== this.ruleForm.surepassword) {
                    this.error('两次密码不一致')
                } else if (!this.isPhone(this.ruleForm.phone)) {
                    this.error('手机号格式错误')
                } else {
                    {
                        this.$axios.post("/api/users/register", {
                            name: this.ruleForm.name,
                            phone: this.ruleForm.phone,
                            password: this.ruleForm.password
                        }).then(re => {
                            if (re.data.type === 'success') {
                                this.success();
                                this.$router.push({path: '/login'})
                            } else if (re.data.phone === '电话号码已被注册') {
                                this.usedphone();
                            } else {
                                this.error();
                            }
                        }).catch(err => {
                            this.error();
                        })
                    }
                }

            },

            isPhone(phone) {
                let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                return myreg.test(phone);
            },

            success() {
                this.$notify({
                    title: '成功',
                    message: '注册成功',
                    type: 'success'
                });
            },

            usedphone() {
                this.$notify.info({
                    title: '失败',
                    message: '手机号码已被注册'
                });
            },

            error(mes) {
                this.$notify.error({
                    title: '错误',
                    message: mes || '注册异常'
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .register {
        height: 350px;
        justify-content: space-between;

        .form-box {
            width: 100%;

            button {
                width: 100%;
            }
        }

    }
</style>