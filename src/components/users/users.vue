<template >
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="bread"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click=" startSearch"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button>添加用户</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      > </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      > </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
      > </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
      > </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="2"
      :current-page="pagenum"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>

</template>

<script >
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [
        {
          name: '王小虎',
          email: '12345@qq.com',
          number: '123456'
        }
      ],
      total: 1,
      pagenum: 1,
      input1: '',
      input2: '',
      input3: '',
      select: ''
    }
  },
  created () {
    this.getupdate()
  },
  methods: {
    getupdate (pagenum = 1, query = '') {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query,
            pagenum, // 当前页
            pagesize: 2 // 每一页显示2个
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data.users
          this.total = res.data.data.total
        })
    },
    currentChange (curPage) {
      console.log('点击了', curPage)
      this.getupdate(curPage, this.input3)
    },
    startSearch () {
      this.getupdate(1, this.input3)
    }
  }
}

</script>

<style scoped lang='less' >
.bread {
  height: 40px;
  background: #d4dae0;
  line-height: 40px;
  padding-left: 20px;
}
</style>
