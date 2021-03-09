<template>
    <div>
        <!--        导航栏-->
        <nav-bars/>
        <!--        分类信息-->
        <div class="row no-gutters">
            <!--            口风琴菜单-->
<!--            <accordion/>-->
            <!--            右侧详情-->
            <div class="col-9 col-md-10">

            </div>
        </div>
        <canvas-painting/>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Accordion from "../components/Accordion";
    import CanvasPainting from "../components/CanvasPainting";

    export default {
        name: "Classify",
        components: {CanvasPainting, Accordion, NavBars}
    }
</script>

<style scoped>

</style>