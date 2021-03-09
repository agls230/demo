<template>
    <div>
        <nav-bars/>
        <div class="col-md-8 offset-md-2 mt-3 mb-3 col-12">
            <!--            基本信息行-->
            <div class="col-12 border bg-light mt-3">
                <div class="row mt-3 mb-3">
                    <div class="col-12 mb-3 border-bottom text-secondary">基本信息<i class="fa fa-info-circle"></i></div>
                </div>
                <div class="row d-flex align-items-center mb-3">
                    <div class="col-md-4 col-12 mb-3 mb-md-0">
                        <!--            头像-->
                        <div class="border" style="width: 100px;height: 100px;margin: 0 auto">
                            <img src="../assets/logo.png" style="width: 100%;height: 100%" alt="">
                        </div>
                    </div>
                    <div class="col-md-8 col-12">
                        <table class="table table-hover table-sm mb-0">
                            <tbody>
                            <tr>
                                <td>用户名：</td>
                                <td>Doe</td>
                            </tr>
                            <tr>
                                <td>邮箱：</td>
                                <td>Moe</td>
                            </tr>
                            <tr>
                                <td>真实姓名：</td>
                                <td>Dooley</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12 text-right mt-3">
                        <button class="btn btn-sm btn-primary">修改</button>
                    </div>
                </div>
            </div>

            <!--            账号状态行-->
            <div class="col-12 border bg-light mt-3">
                <div class="row  mt-3 mb-3">
                    <div class="col-12 mb-3 border-bottom text-secondary">账号状态<i class="fa fa-info-circle"></i></div>
                </div>
                <div class="col-12 mb-3">
                    <table class="table table-hover table-sm">
                        <tbody>
                        <tr>
                            <td>是否启用：</td>
                            <td>Doe</td>
                        </tr>
                        <tr>
                            <td>是否锁定：</td>
                            <td>Moe</td>
                        </tr>
                        <tr>
                            <td>是否过期：</td>
                            <td>Dooley</td>
                        </tr>
                        <tr>
                            <td>凭证过期：</td>
                            <td>Dooley</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <foot/>
        <to-top/>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";

    export default {
        name: "ProFile",
        components: {ToTop, Foot, NavBars}
    }
</script>

<style scoped>

</style>