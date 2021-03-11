<template>
    <div>
        <!--        导航栏-->
        <nav-bars/>
        <div class="">
            <div>
                <div id="demo" class="carousel slide col-12 mt-3 mb-3 carouselPhoto" data-ride="carousel">

                    <!-- 指示符 -->
                    <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>

                    <!-- 轮播图片 -->
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://static.runoob.com/images/mix/img_fjords_wide.jpg">
                        </div>
                        <div class="carousel-item">
                            <img src="https://static.runoob.com/images/mix/img_nature_wide.jpg">
                        </div>
                        <div class="carousel-item">
                            <img src="https://static.runoob.com/images/mix/img_mountains_wide.jpg">
                        </div>
                    </div>

                    <!-- 左右切换按钮 -->
                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>

                </div>
            </div>
        </div>
        <!--        底部-->
        <foot/>
        <!--        返回顶部按钮-->
        <to-top/>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";

    export default {
        name: "Index",
        components: {ToTop, Foot, NavBars}
    }
</script>

<style scoped>
    .carousel-inner img {
        width: 100%;
        height: 100%;
    }
    .carouselPhoto{
        height: 200px;
        overflow: hidden;
    }
</style>