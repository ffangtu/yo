<template>
  <div class="me flex-column">
    <el-form :label-position="labelPosition"
             class="box"
             label-width="150px"
             :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="注册手机号">
        <el-input disabled
                  v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        {{formLabelAlign.admin===1?'管理员':'用户'}}
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="formLabelAlign.address"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary"
               @click="updata">更新
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          name: this.$store.state.user.name,
          phone: this.$store.state.user.phone,
          admin: this.$store.state.user.admin,
          address: this.$store.state.user.address
        }
      }
    },
    methods: {
      updata() {
        this.$axios.post('/api/users/updata', this.formLabelAlign)
          .then(re => {
            console.log(re);
            if (re.data.message === 'success') {
              this.$message({
                message: '更新成功',
                type: 'success'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="less"
       scoped>
  .me {
    height: calc(100vh - 60px);

    .box {
      width: 500px;
    }
  }
</style>