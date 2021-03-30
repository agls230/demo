<template>
    <div>
        <!--        展示区-->
        <div class="position-relative">
            <!--        模型操作层-->
            <div class="row no-gutters  ">
                <!--        模型块-->
                <div class="col-12 col-md-1 border">
                    <h6>模型块:</h6>
                    <div id="myPaletteSmall" style="width: 100%; height: 70px"></div>
                </div>
                <!--        画布展示-->
                <div class="col-12 col-md-11">
                    <div id="myDiagramDiv"></div>
                </div>
            </div>
            <!--        遮罩层，阻止操作-->
            <div class="position-absolute mask" id="mask"></div>
        </div>
        <!--        提交修改按钮-->
        <div class="text-right mt-3">
            <button class="btn btn-sm btn-danger mr-1" id="clearModelInfo">清除</button>
            <button class="btn btn-sm btn-warning mr-1" id="resetModelInfo">重置</button>
            <button class="btn btn-sm btn-primary mr-1" id="updateModelInfo">修改</button>
            <button class="btn btn-sm btn-success" id="successModelInfo">完成</button>
        </div>
    </div>
</template>

<script>
    import go from 'gojs'

    const AllowTopLevel = false
    const $ = go.GraphObject.make
    let modelInfo
    export default {
        name: "Model",
        data() {
            return {
                modelInfo: '',
                modelInfoBackup: ''
            }
        },
        methods: {
            init() {
                // 定义格子大小
                const CellSize = new go.Size(20, 20);
                // 创建一个实例
                const myDiagram = $(go.Diagram, 'myDiagramDiv', {
                    grid: $(go.Panel, "Grid",
                        {gridCellSize: CellSize},
                        $(go.Shape, "LineH", {stroke: "lightgray"}),
                        $(go.Shape, "LineV", {stroke: "lightgray"})
                    ),
                    // 在拖动和调整大小时支持网格对齐
                    "draggingTool.isGridSnapEnabled": true,
                    "draggingTool.gridSnapCellSpot": go.Spot.Center,
                    "resizingTool.isGridSnapEnabled": true,
                    // 对于此样本，在页面上自动显示图模型的状态
                    "ModelChanged": function (e) {
                        if (e.isTransactionFinished) {
                            // modelInfo = myDiagram.model.toJson()
                        }
                    },
                    "animationManager.isEnabled": false,
                    "undoManager.isEnabled": true
                })
                // 常规节点表示要放在架子上的物品
                // 节点当前可调整大小，但是如果不需要，只需将resizable设置为false。
                myDiagram.nodeTemplate =
                    $(go.Node, "Auto",
                        {
                            resizable: true, resizeObjectName: "SHAPE",
                            // 因为gridSnapCellSpot是Center，所以偏移了Node的位置
                            locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2),
                            // 提供有关将任何物品掉落到“物品”上的视觉警告
                            mouseDragEnter: function (e, node) {
                                e.handled = true;
                                node.findObject("SHAPE").fill = "red";
                                e.diagram.currentCursor = "not-allowed";
                                highlightGroup(node.containingGroup, false);
                            },
                            mouseDragLeave: function (e, node) {
                                node.updateTargetBindings();
                            },
                            // 禁止将任何东西放到“物品”上
                            mouseDrop: function (e, node) {
                                node.diagram.currentTool.doCancel();
                            }
                        },
                        // 始终保存/加载节点左上角的点，而不是位置
                        new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                        // 这是人们看到的主要东西
                        $(go.Shape, "Rectangle",
                            {
                                name: "SHAPE",
                                fill: "white",
                                minSize: CellSize,
                                // 最初的1x1单元格
                                desiredSize: CellSize
                            },
                            new go.Binding("fill", "color"),
                            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                        // 中间有文字键
                        $(go.TextBlock,
                            {alignment: go.Spot.Center, font: 'bold 16px sans-serif'},
                            new go.Binding("text", "key"))
                    );  // 终端节点

                // 组代表可以放置项目（节点）的机架。
                // 目前它们是可移动且可调整大小的，但是您可以更改它
                // 如果您希望机架保持“固定”状态。
                // 当用户将节点拖到组上时，组会提供反馈。

                function highlightGroup(grp, show) {
                    if (!grp) return false;
                    // 检查下降是否确实发生在集团内
                    const tool = grp.diagram.toolManager.draggingTool;
                    grp.isHighlighted = show && grp.canAddMembers(tool.draggingParts);
                    return grp.isHighlighted;
                }

                const groupFill = "rgba(128,128,128,0.2)";
                const groupStroke = "gray";
                const dropFill = "rgba(128,255,255,0.2)";
                const dropStroke = "red";

                myDiagram.groupTemplate =
                    $(go.Group,
                        {
                            layerName: "Background",
                            resizable: true, resizeObjectName: "SHAPE",
                            // 因为gridSnapCellSpot为Center，所以偏移了组的位置
                            locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2)
                        },
                        // 始终保存/加载节点左上角的点，而不是位置
                        new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
                        { //群组上发生拖曳或拖曳时该怎么办
                            mouseDragEnter: function (e, grp, prev) {
                                if (!highlightGroup(grp, true)) e.diagram.currentCursor = "not-allowed"; else e.diagram.currentCursor = "";
                            },
                            mouseDragLeave: function (e, grp, next) {
                                highlightGroup(grp, false);
                            },
                            mouseDrop: function (e, grp) {
                                const ok = grp.addMembers(grp.diagram.selection, true);
                                if (!ok) grp.diagram.currentTool.doCancel();
                            }
                        },
                        $(go.Shape, "Rectangle",  // 成员周围的矩形
                            {
                                name: "SHAPE",
                                fill: groupFill,
                                stroke: groupStroke,
                                minSize: new go.Size(CellSize.width * 2, CellSize.height * 2)
                            },
                            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                            new go.Binding("fill", "isHighlighted", function (h) {
                                return h ? dropFill : groupFill;
                            }).ofObject(),
                            new go.Binding("stroke", "isHighlighted", function (h) {
                                return h ? dropStroke : groupStroke;
                            }).ofObject())
                    );

                // 决定可以添加到组中的零件的种类
                myDiagram.commandHandler.memberValidation = function (grp, node) {
                    if (grp instanceof go.Group && node instanceof go.Group) return false;  // cannot add Groups to Groups
                    // but dropping a Group onto the background is always OK
                    return true;
                };

                // 在图表的背景中发生拖放时该怎么办
                myDiagram.mouseDragOver = function (e) {
                    if (!AllowTopLevel) {
                        // 单击确定以将组拖放到任何位置或作为拖动组成员的任何节点
                        const tool = e.diagram.toolManager.draggingTool;
                        if (!tool.draggingParts.all(function (p) {
                            return p instanceof go.Group || (!p.isTopLevel && tool.draggingParts.contains(p.containingGroup));
                        })) {
                            e.diagram.currentCursor = "not-allowed";
                        } else {
                            e.diagram.currentCursor = "";
                        }
                    }
                };

                myDiagram.mouseDrop = function (e) {
                    if (AllowTopLevel) {
                        // 当选择在图表的背景被删除
                        // 确保所选零件不再属于任何组
                        if (!e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true)) {
                            e.diagram.currentTool.doCancel();
                        }
                    } else {
                        // 禁止将任何常规节点拖放到后台，但允许丢弃“机架”，
                        // 包括任何选定的成员节点
                        if (!e.diagram.selection.all(function (p) {
                            return p instanceof go.Group || (!p.isTopLevel && p.containingGroup.isSelected);
                        })) {
                            e.diagram.currentTool.doCancel();
                        }
                    }
                };

                // 开始
                if (modelInfo === '' || modelInfo === null) {
                    myDiagram.model = new go.GraphLinksModel([
                        {key: "G1", isGroup: true, pos: "0 0", size: "400 400"},
                    ])
                } else {
                    myDiagram.model = go.Model.fromJson(localStorage.getItem('modelInfo'))
                }

                // 该示例不使用任何链接
                //
                // jQuery("#accordion").accordion({
                //     // document.getElementById("accordion").accordion({
                //     activate: function (event, ui) {
                //         myPaletteSmall.requestUpdate();
                //         myPaletteTall.requestUpdate();
                //         myPaletteWide.requestUpdate();
                //         myPaletteBig.requestUpdate();
                //     }
                // });

                // 初始化一个调色板
                const myPaletteSmall =
                    $(go.Palette, "myPaletteSmall",
                        { // 与主图共享模板
                            nodeTemplate: myDiagram.nodeTemplate,
                            groupTemplate: myDiagram.groupTemplate
                        });

                const desk = '#DCDCDC';
                const chair = '#DCDCDC';
                const cabinet = '#DCDCDC';
                const door = '#DCDCDC';

                // 指定面板的内容
                myPaletteSmall.model = new go.GraphLinksModel([
                    {key: "桌", color: desk},
                    {key: "椅", color: chair},
                    {key: "柜", color: cabinet},
                    {key: "门", color: door}
                ])

                // 清空
                document.getElementById('clearModelInfo').addEventListener("click", function () {
                    myDiagram.model = new go.GraphLinksModel([
                        {key: "G1", isGroup: true, pos: "0 0", size: "400 400"},
                    ])
                    document.getElementById('mask').style.display = 'none'
                })
                // 重置
                document.getElementById('resetModelInfo').addEventListener("click", function () {
                    myDiagram.model = go.Model.fromJson(localStorage.getItem('modelInfo'))
                    document.getElementById('mask').style.display = 'none'
                })
                // 修改
                document.getElementById('updateModelInfo').addEventListener("click", function () {
                    document.getElementById('mask').style.display = 'none'
                })
                // 完成
                document.getElementById('successModelInfo').addEventListener("click", function () {
                    localStorage.removeItem('modelInfo')
                    localStorage.setItem('modelInfo', myDiagram.model.toJson())
                    document.getElementById('mask').style.display = 'block'
                    // request({
                    //     method:'get',
                    //     url: '',
                    //     params: {
                    //         model: localStorage.getItem('modelInfo')
                    //     },
                    // }).then(res => {
                    //     console.log(res.data)
                    // }).catch(err => {
                    //     console.log(err)
                    //     error()
                    // })
                })
            },
            // 初始时请求布局数据
            initialModelInfo() {
                //     request({
                //         method:'get',
                //         url: '',
                //         params: {},
                //     }).then(res => {
                //         console.log(res.data)
                //         modelInfo = res.data.model
                //     }).catch(err => {
                //         console.log(err)
                //         error()
                //     })
                modelInfo = `{
                    "class": "GraphLinksModel",
                    "nodeDataArray": [
                        {"key": "G1", "isGroup": true, "pos": "0 -80", "size": "400 400"},
                        {"key": "柜", "color": "#DCDCDC", "pos": "140 0", "group": "G1", "size": "200 20"},
                        {"key": "门", "color": "#DCDCDC", "pos": "260 300", "group": "G1", "size": "100 20"},
                        {"key": "柜2", "color": "#DCDCDC", "pos": "340 20", "group": "G1", "size": "20 160"},
                        {"key": "椅", "color": "#DCDCDC", "pos": "160 40", "group": "G1", "size": "20 20"},
                        {"key": "桌", "color": "#DCDCDC", "pos": "160 60", "group": "G1", "size": "40 20"},
                        {"key": "桌2", "color": "#DCDCDC", "pos": "220 60", "group": "G1", "size": "40 20"}
                    ],
                    "linkDataArray": []
                }`
                localStorage.setItem('modelInfo', modelInfo)
            }
        },
        mounted() {
            this.initialModelInfo()
            this.init()
        }
    }
</script>

<style scoped>
    #myDiagramDiv {
        width: 100%;
        height: 410px;
    }

    .mask {
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
    }
</style>