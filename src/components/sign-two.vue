<template>
    <div class="sign" >
        <div class="signBox" v-for="v in arr">
            <div class="signBox-img" :style="v.actives">

            </div>
            <h5>{{v.title}}</h5>
            <h3>{{v.num}}</h3>
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
                        url:'',
                        actives:{background:"url('http://121.42.234.123:8080/public/static/images/admin-icon.png')",backgroundPosition:'-224px -214px'},
                        num:22,
                        title:'今日订单总数'
                    },
                    {
                        url:'',
                        actives:{background:"url('http://121.42.234.123:8080/public/static/images/admin-icon.png')",backgroundPosition:'-168px -214px'},
                        num:33,
                        title:'今日订单总数'
                    },
                    {
                        url:'',
                        actives:{background:"url('http://121.42.234.123:8080/public/static/images/admin-icon.png')",backgroundPosition:'-112px -214px'},
                        num:11,
                        title:'今日订单总数'
                    },
                    {
                        url:'',
                        actives:{background:"url('http://121.42.234.123:8080/public/static/images/admin-icon.png')",backgroundPosition:'0 -214px'},
                        num:5,
                        title:'今日订单总数'
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
        .signBox:hover{
            box-shadow: 5px 5px 5px #888888;
            transform: translate(1px,1px);
            transition: all .3s;
        }
        .signBox:hover h5{
            color:#ec5151;
        }
        .signBox{
            width: 255px;
            height:223px;
            border-radius: 5px;
            background-color: #FFFFFF;
            display: flex;
            flex-direction: column;
            padding: 40px 0;
            box-sizing: border-box;
            justify-content: center;
            align-items: center;
            margin-top: 40px;

            .signBox-img{
                width: 55px;
                height: 55px;
            }
                h3{
                    font-size: 30px;
                    color:#ec5151;
                    margin-top: 10px;
                }
                h5{
                    font-size: 16px;
                    color:black;
                    margin-top: 15px;
                }


        }
    }

</style>