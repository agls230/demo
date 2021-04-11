<template>
    <div>
        <nav-bars/>
        <div class=" d-flex justify-content-center">
            <!--            修改角色-->
            <div class="mt-md-5 mb-md-5 col-md-6 col-12">
                <div class="col-md-12 mb-3">
                    修改角色信息：
                </div>
                <table class="table table-hover text-secondary small col-12">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>角色名</th>
                        <th>描述</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="text" v-model="id" disabled></td>
                        <td><input type="text" v-model="name"></td>
                        <td><input type="text" v-model="description"></td>
                    </tr>
                    </tbody>
                </table>
                <div class="col-12 text-right">
                    <button class="btn btn-success" @click="submit">完成</button>
                </div>
            </div>
        </div>
        <div>
        </div>
<!--        <foot class="foot"></foot>-->
        <to-top/>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";
    import {request} from "../network/request";
    import {error, success} from "../util/promptBox";
    import {delayedBack} from "../util/delayedBack";

    export default {
        name: "RoleUpdate",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                id: '',
                name: '',
                description: ''
            }
        },
        methods: {
            // 提交修改
            submit() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/role/changeSimple',
                        params: {
                            id: this.id,
                            name: this.name,
                            description: this.description
                        }
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        delayedBack()
                    } else {
                        error()
                    }
                })
            }
        },
        mounted() {
            this.id = this.$route.query.id
            this.name = this.$route.query.name
            this.description = this.$route.query.description
        }
    }
</script>

<style scoped>
    input {
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
        border: none;
    }

    /*.foot {*/
    /*    position: fixed;*/
    /*    bottom: 0;*/
    /*    width: 100%;*/
    /*}*/

    th, td {
        white-space: nowrap;
    }
</style>