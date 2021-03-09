import {request} from "../network/request";
import {tip} from "./promptBox";
// 画布行，列
let line = 0
let col = 0
// 画布中的图形集合
// id:0,
// type:'0',
// x:100,
// y:100,
// rotate:0,
// high:20,
// wide:20,
const objArray = []
// 画布容器
let canvasContainer
// 网格显隐性.display
let gridShow
// 已定义的canvas元素
let canvasOne
let canvasTwo
let canvasThree
// 选择canvas
let canvas
// 获取画布在窗口的位置
let canvasPosition
// 创建图形
let ctx

// 获取画布容器
export function getCanvasContainer(canvasContainerId) {
    return canvasContainer = document.getElementById(canvasContainerId)
}

// 获取网格元素，画网格线
export function getGrid(gridId) {
    const grid = document.getElementById(gridId)
    if (grid.getContext) {
        const ctx = grid.getContext('2d')
        ctx.strokeStyle = '#DCDCDC'
        ctx.beginPath()
        // 横线
        for (let i = 1; i < 15; i++) {
            ctx.lineWidth = 1
            ctx.moveTo(0, i * 20)
            ctx.lineTo(300, i * 20)
            ctx.stroke()
        }
        // 竖线
        for (let i = 1; i < 15; i++) {
            ctx.lineWidth = 1
            ctx.moveTo(i * 20, 0)
            ctx.lineTo(i * 20, i * 300)
            ctx.stroke()
        }
    }
    // 返回元素，供显示隐藏使用
    return gridShow = grid
}

// 获取canvas1元素
export function getCanvasOne(id) {
    return canvasOne = document.getElementById(id)
}

// 获取canvas2元素
export function getCanvasTwo(id) {
    return canvasTwo = document.getElementById(id)
}

// 获取canvas3元素
export function getCanvasThree(id) {
    return canvasThree = document.getElementById(id)
}

// 创建绘图
function createContext() {
    canvas = canvasOne
    // 检测可行性
    if (canvas.getContext) {
        // 创建2d图形
        ctx = canvas.getContext('2d')
        ctx.fillStyle = '#87CEFA'
    }
}

// 鼠标事件
export function mouseEvent() {
    // 获取画布在窗口的位置
    canvasPosition = canvasOne.getBoundingClientRect()
    // 在图形上按下时，order变为>0的有效值
    let order = -1;
    // 鼠标按下时
    document.onmousedown = function (e) {
        // 规定事件发生的区域
        if (e.clientX - canvasPosition.left > 0 && e.clientX - canvasPosition.left < 300 &&
            e.clientY - canvasPosition.top > 0 && e.clientY - canvasPosition.top < 300) {
            // 遍历数组，查找与按下位置区域相同的行列
            for (let j = 0; j < objArray.length; j++) {
                // 判断行上距
                if ((objArray[j].line) * 20 < e.clientY - canvasPosition.top &&
                    // 判断行下距
                    e.clientY - canvasPosition.top < (objArray[j].line + 1) * 20 &&
                    // 判断列左距
                    (objArray[j].col) * 20 < e.clientX - canvasPosition.left &&
                    // 判断列右距
                    e.clientX - canvasPosition.left < (objArray[j].col + 1) * 20) {
                    canvasOne.style.cursor = 'move'
                    gridShow.style.display = 'block'
                    return order = j
                }
            }
        }
    }
    // 鼠标抬起时
    document.onmouseup = function (e) {
        // order为有效值时
        if (order >= 0) {
            // 规定事件发生的区域
            if (e.clientX - canvasPosition.left > 0 && e.clientX - canvasPosition.left < 300 &&
                e.clientY - canvasPosition.top > 0 && e.clientY - canvasPosition.top < 300) {
                canvas.style.cursor = 'default'
                gridShow.style.display = 'none'
                // 定义行列，即鼠标抬起时区域的行列
                let col = parseInt((e.clientX - canvasPosition.left) / 20)
                let line = parseInt((e.clientY - canvasPosition.top) / 20)
                // 遍历数组，查找与抬起位置区域相同的行列
                for (let j = 0; j < objArray.length; j++) {
                    // 判断行列
                    if (objArray[j].line === line && objArray[j].col === col) {
                        // 行列相同时
                        tip('此空间已被占用，移动无效。')
                    } else {
                        // 清除按下时区域内的图形
                        ctx.clearRect((objArray[order].col) * 20, (objArray[order].line) * 20, 20, 20)
                        // 暂时保存这个图形的形状id
                        let obj = objArray[order].obj
                        // 清除这个图形在数组内的信息
                        objArray.splice(order, 1)
                        // 调用绘图函数
                        createContext()
                        switch (obj) {
                            case 0:
                                ctx.beginPath()
                                ctx.arc(col * 20 + 10, line * 20 + 10, 10, 0, 2 * Math.PI)
                                ctx.fill()
                                objArray.push({line, col, obj})
                                break
                            case 1:
                                ctx.moveTo(col * 20 + 10, line * 20)
                                ctx.lineTo(col * 20, line * 20 + 20)
                                ctx.lineTo(col * 20 + 20, line * 20 + 20)
                                ctx.fill()
                                objArray.push({line, col, obj})
                                break
                            case 2:
                                ctx.fillRect(col * 20, line * 20, 20, 20)
                                objArray.push({line, col, obj})
                                break
                        }
                    }
                }
            }
            order=-1
        } else {
        }
    }
}

// 初始画图函数
function paint(obj) {
    if (col < 15) {
        switch (obj) {
            case 0:
                ctx.beginPath()
                ctx.arc(col * 20 + 10, line * 20 + 10, 10, 0, 2 * Math.PI)
                ctx.fill()
                objArray.push({line, col, obj})
                break
            case 1:
                ctx.moveTo(col * 20 + 10, line * 20)
                ctx.lineTo(col * 20, line * 20 + 20)
                ctx.lineTo(col * 20 + 20, line * 20 + 20)
                ctx.fill()
                objArray.push({line, col, obj})
                break
            case 2:
                ctx.fillRect(col * 20, line * 20, 20, 20)
                objArray.push({line, col, obj})
                break
        }
        col++
    } else {
        col = 0
        line++
        switch (obj) {
            case 0:
                ctx.beginPath()
                ctx.arc(col * 20 + 10, line * 20 + 10, 10, 0, 2 * Math.PI)
                ctx.fill()
                objArray.push({line, col, obj})
                break
            case 1:
                ctx.moveTo(col * 20 + 10, line * 20)
                ctx.lineTo(col * 20, line * 20 + 20)
                ctx.lineTo(col * 20 + 20, line * 20 + 20)
                ctx.fill()
                objArray.push({line, col, obj})
                break
            case 2:
                ctx.fillRect(col * 20, line * 20, 20, 20)
                objArray.push({line, col, obj})
                break
        }
        col++
    }
}

// 接收要画的图形
export function getObj(obj) {
    createContext()
    if (objArray.length > 0) {
        for (let i = 0; i < objArray.length; i++) {
            console.log('shuzu '+objArray[i].col,col)
            if (col === objArray[i].col && line === objArray[i].line) {
                col++
                paint(obj)
            }
        // else {
            //     paint(obj)
            // }
        }
    } else {
        paint(obj)
    }
}

/*public class BuildDto {
    private Long id;
    private String type;
    private float x;
    private float y;
    private float rotate;
    private float high;
    private float wide;
}*/
const buildDto = {
    id: 0,
    type: '0',
    x: 100,
    y: 100,
    rotate: 0,
    high: 20,
    wide: 20,
}

// 保存布局信息
export function saveCanvas() {
    new Promise((resolve, reject) => {
        request({
            method: 'post',
            url: '/build/saveOne',
            params: {
                build: buildDto,
                sid: 30,
            }
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}