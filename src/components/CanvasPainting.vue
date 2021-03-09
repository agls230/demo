<template>
    <div>
        <div class="row no-gutters">
            <!--            整个区域-->
            <div class="col-md-4 offset-md-4 col-12">
                <!--菜单栏-->
                <div>
                    <button @click="save">保存布局</button>
                </div>
                <div>图形库：
                    <i class="mr-1" v-for="(icon,index) in icons" :class="icon" @click="obj(index)"></i>
                </div>
                <!--                canvas容器-->
                <div id="canvasContainer" class="bg-light">
                    <!--                    网格-->
                    <canvas width="300" height="300" id="grid"></canvas>
                    <!--                    画布-->
                    <canvas class="canvas" width="300" height="300" id="canvasOne"></canvas>
                    <canvas width="300" height="300" id="canvasTwo"></canvas>
                    <canvas width="300" height="300" id="canvasThree"></canvas>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {
        getCanvasContainer,
        getCanvasOne,
        getCanvasThree,
        getCanvasTwo,
        getGrid,
        getObj,
        mouseEvent,
        saveCanvas
    } from "../util/canvas";

    export default {
        name: "CanvasPainting",
        data() {
            return {
                icons: [
                    'bi-circle',
                    'bi-triangle',
                    'bi-square'
                ],
            }
        },
        methods: {
            // 获取canvas,要画的图形
            obj(index) {
                getObj(index)
            },
            // 保存
            save() {
                saveCanvas()
            }
        },
        mounted() {
            // 获取canvas容器、网格元素
            getCanvasContainer('canvasContainer')
            // 获取网格元素
            getGrid('grid')
            // 获取canvas1元素
            getCanvasOne('canvasOne')
            // 获取canvas2元素
            getCanvasTwo('canvasTwo')
            // 获取canvas3元素
            getCanvasThree('canvasThree')
            // 鼠标事件
            mouseEvent()
        }
    }
</script>

<style scoped>
    #canvasContainer {
        width: 300px;
        height: 300px;
        position: relative;
        box-shadow: 0 0 0 1px #DCDCDC;
    }

    #grid {
        position: absolute;
        z-index: 0;
        display: none;
    }

    .canvas {
        position: absolute;
        background-color: rgba(255, 255, 255, 0);
        z-index: 1;
    }
</style>