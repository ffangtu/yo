<template>
  <div class="header flex-row">
    <div class="content flex-row">
      <div class="left flex-row">
        <div class="logo-box">
          饱了么
        </div>
        <el-menu :default-active="'1'"
                 class="content-nav"
                 mode="horizontal"
                 background-color="#1e89e0"
                 text-color="#fff"
                 active-text-color="#ffd04b">

          <el-menu-item index="1">
            <router-link
                active-class="active"
                tag="div"
                to="/HomePage">首页
            </router-link>
          </el-menu-item>

          <el-menu-item index="2">
            <router-link
                active-class="active"
                tag="div"
                to="/MyOrders">订单管理
            </router-link>
          </el-menu-item>

          <el-menu-item index="3">
            <router-link v-if="this.user.admin === 1"
                         active-class="active"
                         tag="div"
                         to="/ManageFood">
              商品管理
            </router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <el-menu :default-active="'1'"
               class="content-nav"
               mode="horizontal"
               background-color="#1e89e0"
               text-color="#fff"
               active-text-color="#ffd04b">
      </el-menu>

      <el-dropdown class="my"
                   @command="exit">
                <span class="el-dropdown-link">
                {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
          <el-dropdown-item divided
                            command="exit">退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      user() {
        return this.$store.state.user
      },
    },
    methods: {
      exit(common) {
        if (common === 'exit') {
          localStorage.removeItem('user');
          this.$store.commit('changelogin', {});
          this.$router.push({path: '/Login'})
        } else if (common === 'personalCenter') {
          this.$router.push({name: 'Me'})
        }
      }
    }
  }
</script>

<style lang="less"
       scoped>
  .header {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    background: #1e89e0;
    color: #fff;

    .content {
      width: 1200px;
      height: 100%;
      justify-content: space-between;

      .logo-box {
        font-size: 33px;
        white-space: nowrap;

        &:hover {
          cursor: default;
        }
      }

      .content-nav {
        background: transparent;
        margin-left: 20px;

      }

      .my {
        color: #fff;
      }

    }
  }
</style>