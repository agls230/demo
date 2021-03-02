<template>
    <div class="accordion col-3 col-md-2">
        <div id="accordion">
            <div class="card">
                <div class="card-header">
                    <a class="card-link" data-toggle="collapse" href="#collapseOne">
                        热门
                    </a>
                </div>
                <div id="collapseOne" class="collapse" data-parent="#accordion">
                    <div class="card-body border-bottom">
                        条目1
                    </div>
                    <div class="card-body border-bottom">
                        条目2
                    </div>
                    <div class="card-body border-bottom">
                        条目3
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="card-link" data-toggle="collapse" href="#one">
                        美食
                    </a>
                </div>
                <div id="one" class="collapse " data-parent="#accordion">
                    <div class="card-body border-bottom">
                        条目1
                    </div>
                    <div class="card-body border-bottom">
                        条目2
                    </div>
                    <div class="card-body border-bottom">
                        条目3
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
                        娱乐
                    </a>
                </div>
                <div id="collapseTwo" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#collapseThree">
                        出行
                    </a>
                </div>
                <div id="collapseThree" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#two">
                        学习
                    </a>
                </div>
                <div id="two" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#three">
                        周边
                    </a>
                </div>
                <div id="three" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Accordion"
    }
</script>

<style scoped>
    .card-body {
        font-size: small;
        cursor: pointer;
        padding: 10px;
        text-align: center;
    }

    .card-body:hover {
        text-decoration: underline #6c757d;
    }
</style>