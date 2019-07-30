<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span=8><img
            src='../../assets/logo.png'
            alt=""
          ></el-col>
        <el-col :span=8>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          :span=8
          class="col3"
        >恭喜上海43期前端0就业率
          <a
            @click.prevent='logout'
            href="#"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">

          <el-col :span="24">

            <el-menu
              :router='true'
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>

                <el-menu-item index="/users">用户列表</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>

                <el-menu-item index="/roles">角色列表</el-menu-item>
                <el-menu-item index="/rights">权限列表</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>

      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('你将退出用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800

        })
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 800
        })
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      console.log('开了')
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    getPath () {
      return this.$router.path
    }
  }

}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
}
.el-header {
  /* background-color: red; */
  background: #b3c1cd;
  h1 {
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .col3 {
    text-align: right;
    line-height: 60px;
    a {
      color: yellow;
    }
  }
}
.el-aside {
  background: #545c64;
}
.el-main {
  background: #eaeef1;
}
</style>
