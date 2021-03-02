import $ from 'jquery'
import '../assets/js/message'

export function success(info) {
    $.message({
        message: info || '操作成功！',
        duration: '3000',
        showClose: true,
        center: false,
        type: 'success'
    })
}

export function error(info) {
    $.message({
        message: info || '操作失败！',
        duration: '3000',
        showClose: true,
        center: false,
        type: 'error'
    })
}

export function tip(info) {
    $.message({
        message: info,
        duration: '3000',
        showClose: true,
        center: false,
        type: 'info'
    })
}

$('.btn-success').on('click', function () {
    $.message({
        message: '成功提示',
        type: 'success'
    });
})
$('.btn-warning').on('click', function () {
    $.message({
        message: '警告提示',
        type: 'warning',
        duration: 0,
        showClose: true,
        center: true,
        onClose: function () {
            alert('知道了')
        }
    });
})

/**
 message:' 操作成功',    //提示信息
 duration:'5000',       //显示时间（默认：5s）
 type:'info',           //显示类型，包括4种：success.error,info,warning 默认info
 showClose:false,       //显示关闭按钮（默认：否）
 center:true,           //页面竖直居中（默认：否）
 onClose:function,      //点击关闭回调函数
 **/