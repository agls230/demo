<template>
    <div class="position-relative">
        <div>
            <baidu-map class="map" :double-click-zoom="false" :scroll-wheel-zoom="true" @ready="handler"
                       @click="getClickInfo" :center="center" :zoom="zoom"
                       :dragging="dragging">
                <!--            缩放-->
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" type="BMAP_NAVIGATION_CONTROL_ZOOM"
                               :showZoomInfo="false"></bm-navigation>
                <!--            定位-->
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false"
                                :autoLocation="true" @click="position"></bm-geolocation>
                <!--标记点-->
                <bm-marker :position="clickPoint" animation="BMAP_ANIMATION_BOUNCE">
                </bm-marker>
                <!--步行路线-->
                <bm-walking :start="center" :end="shopPoint" :auto-viewport="true"></bm-walking>
                <!--公交路线-->
                <bm-transit :start="center" :end="shopPoint" :auto-viewport="true"></bm-transit>
                <!--驾车路线-->
                <bm-driving :start="center" :end="shopPoint" :auto-viewport="true"></bm-driving>
            </baidu-map>
        </div>
        <!--        遮罩层，阻止操作-->
        <div class="position-absolute mask" id="mask" style="display: none"></div>
        <div>
            <!--            商家管理界面-->
            <div class="text-right">
                <p class="text-secondary small">注：地图标点以确定目标位置</p>
                <div id="shopLocation" style="display: none"><span>{{pageLocationText}}</span>
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
    import {error} from "../util/promptBox";

    export default {
        name: "Maps",
        data() {
            return {
                // 用户定位的经纬度
                center: {
                    lng: 116.404,
                    lat: 39.915
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
                shopId: 1
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
                this.clickPoint.lng = e.point.lng
                this.clickPoint.lat = e.point.lat
                document.getElementById('shopLocation').style.display = 'block'
            },
            // 点击保存店铺坐标位置
            saveShopLocation() {
                if (this.pageLocation === 'shop') {
                    request({
                        method: 'post',
                        url: '',
                        params: {
                        }
                    }).then(res => {
                        console.log(res.data)
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
                document.getElementById('shopLocation').style.display = 'none'
            },
            // 点击取消保存店铺坐标位置
            cancelShopLocation() {
                this.clickPoint.lng = ''
                this.clickPoint.lat = ''
                document.getElementById('shopLocation').style.display = 'none'
            }
        },
        mounted() {
            this.$bus.$on('pageType', data => {
                if (data.type === 'business') {
                    this.pageLocation = 'shop'
                    this.pageLocationText = '确定以此标记点作为店铺位置？'
                } else if (data.type === 'user') {
                    this.pageLocation = 'user'
                    this.pageLocationText = '确定以此标记点作为集结点？'
                } else if (data.type === 'showShopPage') {
                    document.getElementById('mask').style.display = 'block'
                } else if (data.type === 'showUserPage') {
                    document.getElementById('mask').style.display = 'block'
                }
            })
        }
    }
</script>

<style scoped>
    .map {
        width: 100%;
        height: 400px;
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