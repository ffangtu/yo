<template>
    <div id="app">
        <el-scrollbar style="height: 100%">
            <router-view></router-view>
        </el-scrollbar>
    </div>
</template>

<script>

    export default {
        name: 'app',
    }
</script>

<style lang="less">
    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
    }

    li {
        list-style: none;
    }

    span, a {
        display: inline-block;
    }

    .flex-row {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #app {
        height: 100%;

        .el-scrollbar__wrap {
            overflow-x: hidden;
        }
    }

</style>
