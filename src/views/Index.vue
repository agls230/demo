<template>
    <div>
        <!--        导航栏-->
        <nav-bars/>
        <div class="">
            <div>
                <h3>这是首页</h3>
                <h3>这是首页</h3>
                <h3>这是首页</h3>
                <h3>这是首页</h3>
                <h3>这是首页</h3>
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

</style>