<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <!--<el-breadcrumb-item :to="{ path:'/index' }">首页</el-breadcrumb-item>-->
            <el-breadcrumb-item v-for="v in $route.matched" :to="{ path:v.path}">{{v.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        created() {
            // console.log(this.$route);
        }
    }
</script>

<style scoped>

</style>