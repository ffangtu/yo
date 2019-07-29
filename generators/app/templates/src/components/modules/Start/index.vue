<template>
    <div class="start flex-column">
        <div class="title">
            饱了么
            <p>饱不饱都上饱了么</p>
        </div>
        <div class="router-box">
            <router-view></router-view>
        </div>
        <div class="router-list flex-row">
            <router-link tag="div" active-class="active" to="/Login">登录</router-link>
            <router-link tag="div" active-class="active" to="/Register">注册</router-link>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less" scoped>
    .start {
        height: 100vh;

        .title {
            font-size: 36px;
            color: #2395ff;
            text-align: center;

            > p {
                font-size: 18px;
                margin-bottom: 20px;
            }
        }

        .router-box {
            width: 300px;
        }

        .router-list {
            position: fixed;
            bottom: 20px;
            right: 20px;

            > div {
                margin-left: 20px;

                &:hover {
                    cursor: pointer;
                }
            }

            .active {
                color: #2395ff;
            }
        }
    }
</style>