<template>
  <div class="manage-food">

    <div class="title">
      饱了么食品信息
    </div>

    <div class="box">

      <div class="flex-column img-box">
        <p>食品图片：</p>
        <el-upload
            class="avatar-uploader"
            action="string"
            :http-request="upImg"
            :show-file-list="false">
          <img v-if="ruleForm.FoodImg"
               :src="ruleForm.FoodImg"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="食品名称"
                      prop="FoodName">
          <el-input v-model="ruleForm.FoodName"></el-input>
        </el-form-item>

        <el-form-item label="食品类型"
                      prop="FoodType">
          <el-select v-model="ruleForm.FoodType"
                     placeholder="请选择食品类型">
            <el-option label="饮料"
                       value="饮料"></el-option>
            <el-option label="盖浇饭"
                       value="盖浇饭"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="食品价格"
                      prop="FoodPrice">
          <el-input v-model="ruleForm.FoodPrice"></el-input>
        </el-form-item>

        <el-form-item label="食品介绍"
                      prop="desc">
          <el-input type="textarea"
                    v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">立即添加
          </el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          FoodName: '',
          FoodNumber: '',
          FoodType: '',
          FoodPrice: '',
          desc: '',
          FoodImg: ''
        },
        rules: {
          FoodName: [
            {required: true, message: '请输入食品名称', trigger: 'blur'},
            {min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'}
          ],
          FoodNumber: [
            {required: true, message: '请选择食品类型', trigger: 'change'}
          ],

          FoodType: [
            {required: true, message: '请选择食品种类', trigger: 'change'}
          ],
          FoodPrice: [
            {required: true, message: '请输入食品价格', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请填写食品描述', trigger: 'blur'}
          ]
        }
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        to.params.data ? vm.ruleForm = to.params.data : '';
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {};
            this.ruleForm.FoodNumber = new Date().getTime();
            params = JSON.parse(JSON.stringify(this.ruleForm));
            this.$axios.post('/api/food/save', params)
              .then(re => {
                console.log(re);
                if (re.data.message === 'success') {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.resetForm('ruleForm');
                  this.ruleForm.FoodImg = '';
                }
              })
              .catch(err => {
                console.log(err)
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      upImg(item) {
        let formData = new FormData();
        formData.append('avatar', item.file);
        this.$axios.post('/api/foodimg/img', formData).then(re => {
          this.ruleForm.FoodImg = 'http://' + window.location.hostname + ':5000' + re.data.path;
        }).catch(err => {
          console.log(err)
        })
      },
      socket(){
        alert('连接');
        let socket = this.$io.connect('ws://172.0.0.1:5000')
      }
    }
  }
</script>

<style lang="less">
  .manage-food {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 36px;
      color: #2395ff;
      text-align: center;
    }

    .box {
      margin-top: 100px;
      width: 600px;

      .img-box {
        font-size: 20px;
        color: #2395ff;
        text-align: center;
      }
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
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

  }
</style>