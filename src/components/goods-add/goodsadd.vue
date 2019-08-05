<template>
  <div>
    <el-steps
      :active="activeIndex"
      finish-status="success"
    >
      <el-step title="已完成"></el-step>
      <el-step title="进行中"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-tabs
      :tab-position="tabPosition"
      style="height: 200px;"
      v-model="activeName"
    >
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabPosition: 'left',
      activeIndex: 2,
      activeName: '0'

    }
  }

}
</script>

<style>
</style>
