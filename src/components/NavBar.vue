<template>
    <div class="row">
        <nav class="col-12 col-md-12 navbar navbar-expand-md bg-dark navbar-dark">
            <a class="navbar-brand">后台页面</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav row" style="width: 100%">
                    <li class="nav-item dropdown">
                        <a @click="toUser" class="nav-link dropdown-toggle" data-toggle="dropdown">
                            用户信息
                        </a>
                        <div class="dropdown-menu bg-dark" style="border: none">
                            <a class="dropdown-item">当前用户</a>
                            <a class="dropdown-item">所有用户</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a @click="toRole" class="nav-link dropdown-toggle" data-toggle="dropdown">
                            角色信息
                        </a>
                        <div class="dropdown-menu bg-dark" style="border: none">
                            <a class="dropdown-item">当前角色</a>
                            <a class="dropdown-item">所有角色</a>
                            <a class="dropdown-item">添加角色</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a @click="toPer" class="nav-link dropdown-toggle" data-toggle="dropdown">
                            权限信息
                        </a>
                        <div class="dropdown-menu bg-dark" style="border: none">
                            <a class="dropdown-item">角色权限</a>
                            <a class="dropdown-item">所有权限</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        data() {
            return {}
        },
        methods: {
            toUser() {
                this.$router.push('/backstage/user')
            },
            toRole() {
                this.$router.push('/backstage/role')
            },
            toPer() {
                this.$router.push('/backstage/permission')
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .dropdown-menu a {
        color: #f8f9fa;
    }

    .dropdown-menu a:hover {
        background-color: rgba(255, 255, 255, 0);
        color: #007bff;
        cursor: pointer;
    }

    .nav-item {
        margin: 0 20px;
    }

    .nav-item a {
        cursor: pointer;
    }
</style>