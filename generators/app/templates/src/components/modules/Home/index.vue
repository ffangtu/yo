<template>
    <div class="home">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from '../../common/Nav/index';
    export default {
        data() {
            return {}
        },
        components:{
            Header
        }
    }
</script>

<style lang="less" scoped>
    .home {
        padding-top: 60px;
    }
</style>