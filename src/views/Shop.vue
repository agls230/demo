<template>
    <div>
        <!--        导航栏-->
        <nav-bars/>
        <!--        分类信息-->
        <div class="row no-gutters">
            <!--            口风琴菜单-->
            <accordion/>
            <!--            右侧详情-->
            <div class="col-9 col-md-10">
                <ul>
                    <li v-for="(list,index) in allInfo">
                        <div>
                            <img src="../assets/shop.jpg" width="100%" height="100%">
                        </div>
                        <div>
                            <span class="small name">{{list.name}}</span>
                            <span class="text-right float-right small text-secondary"><i
                                    class="bi-star-fill text-warning"></i>{{list.star}}</span>
                        </div>
                        <div class="small text-secondary">{{list.content}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Accordion from "../components/Accordion";
    import {request} from "../network/request";
    import {error} from "../util/promptBox";

    export default {
        name: "Shop",
        components: {
            NavBars,
            Accordion
        },
        data() {
            return {
                allInfo: []
            }
        },
        methods: {},
        mounted() {
            this.$bus.$on('sign', data => {
                if (data === 'ok') {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'get',
                            url: '/shop/findAll'
                        }).then(res => {
                            resolve(res)
                        }).catch(err => {
                            reject(err)
                        })
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            this.allInfo = []
                            this.allInfo = res.data.shops
                        } else {
                            error('加载错误，请刷新重试。')
                        }
                    }).catch(err => {
                        error('加载错误，请刷新重试。')
                    })
                }
            })
        }

    }
</script>

<style scoped>
    ul {
        list-style-type: none;
        margin: 0;
    }

    li {
        width: 16%;
        display: inline-block;
        padding: 20px;
    }

    li div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .name:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>