<template>
    <div class="accordion">
        <div id="accordion">
            <div class="card">
                <div class="card-header">
                    <a class="card-link" data-toggle="collapse" href="#collapseOne">
                        功能1
                    </a>
                </div>
                <div id="collapseOne" class="collapse " data-parent="#accordion">
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
                        功能2
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
                        功能3
                    </a>
                </div>
                <div id="collapseThree" class="collapse" data-parent="#accordion">
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
    .accordion{
        width: 10%;
    }
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