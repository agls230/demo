<template>
    <div class="position-relative">
        <div>
            <baidu-map class="map" :style="{height:height,width:width}" :double-click-zoom="false"
                       :scroll-wheel-zoom="true"
                       @ready="handler"
                       @click="getClickInfo" :center="center" :zoom="zoom"
                       :dragging="dragging">
                <!--            缩放-->
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" type="BMAP_NAVIGATION_CONTROL_ZOOM"
                               :showZoomInfo="false"></bm-navigation>
                <!--            定位-->
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false"
                                :autoLocation="true" @click="position"></bm-geolocation>

                <!--标记点-->
                <bm-marker ref="marker" :position="clickPoint" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
                <!--步行路线-->
                <bm-walking v-show="walk" :start="center" :end="shopPoint" :auto-viewport="true"></bm-walking>
                <!--                &lt;!&ndash;公交路线&ndash;&gt;-->
                <!--                <bm-transit v-show="bus" :start="center" :end="shopPoint" :auto-viewport="true"></bm-transit>-->
                <!--                &lt;!&ndash;驾车路线&ndash;&gt;-->
                <!--                <bm-driving v-show="taxi" :start="center" :end="shopPoint" :auto-viewport="true"></bm-driving>-->
            </baidu-map>
        </div>
        <!--        遮罩层，阻止操作-->
        <!--        <div class="position-absolute mask" ref="mask" style="display: none"></div>-->
        <div>
            <!--            商家管理界面-->
            <div ref="maps" class="text-right">
                <p class="text-secondary small">注：地图标点以确定目标位置</p>
                <div ref="shopLocation" style="display: none"><span>{{pageLocationText}}</span>
                    <button class="btn btn-sm btn-outline-primary mr-1" @click="saveShopLocation">确认</button>
                    <button class="btn btn-sm btn-outline-danger" @click="cancelShopLocation">取消</button>
                </div>
            </div>
            <!--            用户组队标记界面-->
            <div></div>
        </div>
    </div>
</template>

<script>
    import {request} from "../network/request";
    import {error, success} from "../util/promptBox";

    export default {
        name: "Maps",
        data() {
            return {
                // 用户定位的经纬度
                center: {
                    lng: '',
                    lat: ''
                },
                zoom: 15,

                dragging: true,
                // 用户点击的标记点的经纬度
                clickPoint: {
                    lng: 0,
                    lat: 0
                },
                // 商家店铺的经纬度
                shopPoint: {
                    lng: 0,
                    lat: 0
                },
                // 在哪一个页面？商家修改页/用户组队页
                pageLocation: '',
                // 在哪一个页面的文本？商家修改页/用户组队页
                pageLocationText: '',
                shopId: localStorage.getItem('shopId'),
                height: '400px',
                width: '100%',
                walk: false,
                bus: false,
                taxi: false,
            }
        },
        methods: {
            handler({BMap, map}) {
                // 页面初始时定位
                const geolocation = new BMap.Geolocation()
                geolocation.enableSDKLocation()
                geolocation.getCurrentPosition(res => {
                    // ip地址定位得到的经纬度赋值给用户定位
                    this.center.lng = res.point.lng
                    this.center.lat = res.point.lat
                })
                // 手机端点击事件
                map.addEventListener('touchmove', (e) => {
                    map.enableDragging()
                })
                map.addEventListener('touchend', (e) => {
                    map.disableDragging()
                })
                this.init()
            },
            // 点击定位时，获得当前经纬度
            position() {
                const geolocation = new BMap.Geolocation()
                geolocation.enableSDKLocation()
                geolocation.getCurrentPosition(res => {
                    this.center.lng = res.point.lng
                    this.center.lat = res.point.lat
                })
            },
            // 地图上点击事件
            getClickInfo(e) {
                // 点击的位置的经纬度标记为点
                if (this.pageLocation === 'shop') {
                    // 显示确定商铺位置的对话按钮
                    this.clickPoint.lng = e.point.lng
                    this.clickPoint.lat = e.point.lat
                    this.$refs.shopLocation.style.display = 'block'
                }
            },
            // 点击保存店铺坐标位置
            saveShopLocation() {
                if (this.pageLocation === 'shop') {
                    const shopId = this.$store.state.shopId
                    request({
                        method: 'post',
                        url: '/shop/addAddress',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            "sid": shopId,
                            "address": this.clickPoint.lng + ',' + this.clickPoint.lat
                        })
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            success()
                        } else {
                            error()
                        }
                    }).catch(err => {
                        console.log(err)
                        error()
                    })
                } else if (this.pageLocation === 'user') {
                    request({
                        method: 'post',
                        url: '',
                        params: {}
                    }).then(res => {
                        console.log(res.data)
                    }).catch(err => {
                        console.log(err)
                        error()
                    })
                }
                this.$refs.shopLocation.style.display = 'none'
            },
            // 点击取消保存店铺坐标位置
            cancelShopLocation() {
                this.clickPoint.lng = ''
                this.clickPoint.lat = ''
                this.$refs.shopLocation.style.display = 'none'
            },
            init() {
                request({
                    url: '/shop/getAddress',
                    method: 'post',
                    params: {
                        sid: this.$store.state.shopId
                    }
                }).then(res => {
                    this.clickPoint.lng = res.data.address.split(',')[0]
                    this.clickPoint.lat = res.data.address.split(',')[1]
                    this.shopPoint.lng = this.clickPoint.lng
                    this.shopPoint.lat = this.clickPoint.lat
                })
            }
        },
        mounted() {
            this.$bus.$on('pageType', data => {
                if (data.type === 'business') {
                    // 商铺管理者页面
                    this.pageLocation = 'shop'
                    this.pageLocationText = '确定以此标记点作为店铺位置？'
                } else if (data.type === 'user') {
                    this.pageLocation = 'user'
                    this.pageLocationText = '确定以此标记点作为集结点？'
                } else if (data.type === 'showShopLocation') {
                    // 商铺详情页面
                    this.height = '200px'
                    this.width = '90%'
                    this.pageLocation = 'show'
                    this.$refs.maps.style.display = 'none'
                    this.$refs.marker.style.display = 'none'
                    this.walk = true
                    this.bus = true
                    this.taxi = true
                } else if (data.type === 'showUserPage') {
                    // this.$refs.mask.style.display = 'block'
                }
            })
        }
    }
</script>

<style scoped>
    .map {
        /*width: 100%;*/
        /*height: 400px;*/
        margin: 0 auto;
    }

    .mask {
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
    }
</style>