<template>
    <div class="signBox">
        <span>{{title}}</span>
        <h5>{{num}}</h5>
    </div>
</template>

<script>
    export default {
        props:['title','num']
    }
</script>

<style scoped lang="less">
    .signBox{
        width: 163px;
        height:90px;
        background:#5B91C5 url(../assets/logo_4.png) bottom/auto no-repeat;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-top: 10px;
        span{
            font-size: 24px;
            color: white;
            font-weight: 600;
        }
        h5{
            font-size: 16px;
            color: white;
            font-weight: 600;
        }
    }
</style>