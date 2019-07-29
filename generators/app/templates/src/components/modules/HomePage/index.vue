<template>
  <div class="home-page flex-column">
    <div class="type flex-row">
      <div>
        <el-radio-group v-model="FoodType"
                        @change="getData">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="饮料">饮料</el-radio-button>
          <el-radio-button label="盖浇饭">盖浇饭</el-radio-button>
          <el-radio-button label="粥">粥</el-radio-button>
          <el-radio-button label="素菜">素菜</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="list">
      <el-card class="card"
               v-for="(item, index) in dataList"
               :key="item._id"
               :body-style="{ padding: '0px' }">
        <img :src="item.FoodImg"
             class="image">
        <div style="padding: 14px;">
          <el-tag>{{item.FoodName}}</el-tag>
          <el-tag type="danger">{{'￥'+item.FoodPrice}}</el-tag>

          <div class="desc">
            <el-scrollbar style="height: 100%">
              {{item.desc}}
            </el-scrollbar>
          </div>
          <div class="bottom clearfix">
            <time class="time"></time>
            <el-button type="text"
                       class="button"
                       v-if="user.admin===0">买！
            </el-button>
            <div v-else="user.admin===0">
              <el-button type="danger"
                         @click="remove(item)"
                         class="button">删除
              </el-button>
              <el-button type="primary"
                         @click="edit(item)"
                         class="button">编辑
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        FoodType: '',
        dataList: []
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      getData(type) {
        this.$axios.post('/api/food/getFood', {
          FoodType: this.FoodType
        })
          .then(re => {
            this.dataList = re.data;
            console.log(re);
            console.log(this.dataList)
          })
          .catch(err => {
            console.log(err)
          })
      },
      remove(item) {
        this.$axios.post('/api/food/remove', {
          _id: item._id
        }).then(re => {
          if (re.data.message === 'success') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          }
          this.getData(this.FoodType)
        }).catch(err => {
          console.log(err)
        })
      },
      edit(item) {
        this.$router.push({name: 'ManageFood', params: {data: item}})
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
      })
    }
  }
</script>

<style lang="less"
       scoped>
  .home-page {

    .type {
      width: 1200px;
      margin: 50px 0;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      .card {
        width: 250px;
        height: 500px;
        margin: 20px;

        .desc {
          margin-top: 15px;
          height: 100px;
          color: #F56C6C;
        }

        img {
          width: 250px;
          height: 250px;
        }
      }
    }

    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
      font-size: 36px;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }
  }
</style>