<template>
    <div>
        <div class="row no-gutters">
            <!--            整个区域-->
            <div class="col-md-4 offset-md-4 col-12">
                <!--菜单栏-->

                <!--                canvas-->
                <div ref="canvas" style="width:500px; height:350px; background-color: #DAE4E4;"></div>
            </div>

        </div>
    </div>
</template>

<script>
    import '../util/canvas'

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
            init() {
                const canvas = this.$refs.canvas
                var $ = go.GraphObject.make;
                // 第一步：创建图表，用于在页面上画图
                var myDiagram = $(go.Diagram, canvas);
                // 第二步：创建一个节点，内容为donner
                var node = $(go.Node, $(go.TextBlock, {text: "donner"}));
                // 第三步：将节点添加到div区域中
                myDiagram.add(node)
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>

</style>