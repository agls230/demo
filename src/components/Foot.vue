<template>
    <div class="w-100 bg-info text-light d-flex align-items-center foot">
        <div class="col-8 offset-2 h-75">页面底部信息</div>
    </div>
</template>

<script>
    export default {
        name: "Foot"
    }
</script>

<style scoped>
    .foot {
        height: 200px;
    }

    .foot .h-75 {
        background-color: rgba(255, 255, 255, 0.5);

    }
</style>