<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="bread"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="rightsData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index='indexMethod'
      ></el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级"
      >
        <template slot-scope='scope'>
          <span v-if='scope.row.level==0'>一级</span>
          <span v-else-if='scope.row.level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsData: [{
        authName: '2016-05-02',
        path: '王小虎',
        level: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created () {
    this.getRights()
  },
  methods: {
    async getRights () {
      let res = await this.$axios.get('http://localhost:8888/api/private/v1/rights/list')
      console.log(res)
      this.rightsData = res.data.data
    },
    indexMethod (index) {
      // 通过返回值 把行号返回去,作为索引存在
      return index
    }
  }
}
</script>

<style scoped lang='less'>
.bread {
  height: 40px;
  background: #d4dae0;
  line-height: 40px;
  padding-left: 20px;
}
</style>
