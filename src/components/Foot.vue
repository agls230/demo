<template>
    <div class="">
        <div class="w-100 bg-info text-light d-flex align-items-center foot">
            <div class="col-md-8 offset-md-2 h-75 text-center">页面底部信息</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Foot"
    }
</script>

<style scoped>
    .foot {
        height: 80px;
    }

    .foot .h-75 {
        background-color: rgba(255, 255, 255, 0.3);

    }
</style>