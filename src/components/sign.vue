<template>
    <div class="sign" >
        <div class="signBox" v-for="v in arr" :style="{backgroundColor:v.actives}">
            <div class="signBox-img">
                <img :src="v.url" alt="">
            </div>
            <div class="signBox-font">
                <h3>{{v.num}}</h3>
                <h5>{{v.title}}</h5>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "sign",
        data(){
            return{
                arr:[
                    {
                        url:'http://121.42.234.123:8080/public/static/images/1.png',
                        actives:'#32cc7f',
                        num:0,
                        title:'今日订单总数'
                    },
                    {
                        url:'http://121.42.234.123:8080/public/static/images/2.png',
                        actives:"#707070",
                        num:1,
                        title:'今日会员总数'
                    },
                    {
                        url:'http://121.42.234.123:8080/public/static/images/3.png',
                        actives:"#e4eaec",
                        num:0,
                        title:'今日待审评论数'
                    },
                    {
                        url:'http://121.42.234.123:8080/public/static/images/4.png',
                        actives:"#6c6fbf",
                        num:1,
                        title:'今日访问量'
                    },
                ],
            }
        }
    }
</script>

<style scoped lang="less">
    .sign{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .signBox{
            width: 260px;
            height:150px;
            border-radius: 5px;
            display: flex;
            padding: 40px 10px;
            box-sizing: border-box;
            justify-content: space-between;
            margin-top: 10px;

            .signBox-img{
                width: 71px;
                height: 74px;
                img{
                    width: 100%;
                }
            }
            .signBox-font{
                display: flex;
                flex-direction: column;
                h3{
                    font-size: 30px;
                    color:white;
                    margin-bottom: 15px;
                }
                h5{
                    font-size: 16px;
                    color:white;
                }
            }

        }
    }

</style>