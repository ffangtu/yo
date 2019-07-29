<template>
  <div class="login flex-column">
    <el-form :model="ruleForm"
             class="form-box"
             :rules="rules">
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
            @keyup.enter.native="submit"
            placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submit">立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          phone: '',
          password: '',
        },
        rules: {
          phone: [
            {required: true, message: '请输入正确的电话号码', trigger: 'blur'},
            {min: 11, max: 11, message: '长度为11位', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '密码最短为6位', trigger: 'blur'}
          ],
        }
      }
    },
    computed: {
      isPhone() {
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return myreg.test(this.ruleForm.phone);
      },
    },
    methods: {
      submit() {
        if (this.isPhone) {
          this.$axios.post('/api/users/login', {phone: this.ruleForm.phone, password: this.ruleForm.password})
            .then(re => {
              if (re.data.phone) {
                localStorage.setItem('user', JSON.stringify(re.data));
                this.$store.commit('changelogin', re.data);
                this.$router.push({path: '/HomePage'});
              } else {
                this.$notify.info({
                  title: '失败',
                  message: re.data.message
                });
              }
            })
            .catch(err => {
              this.$notify.info({
                title: '失败',
                message: '登录失败'
              });
            })
        } else {
          this.$notify.info({
            title: '失败',
            message: '手机号码格式错误'
          });
        }
      },
    }
  }
</script>

<style lang="less"
       scoped>
  .login {
    height: 200px;
    justify-content: space-between;

    .form-box {
      width: 100%;

      button {
        width: 100%;
      }
    }

  }
</style>