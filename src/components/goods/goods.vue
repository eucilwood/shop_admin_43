<template>
  <div>
    <el-button @click='addgoods'>添加商品</el-button>
    <el-table
      :data="goodsData"
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名字"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | dataFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {

  data () {
    return {
      goodsData: [{
        goods_name: '2016-05-02',
        goods_price: '王小虎',
        goods_weight: '上海市普陀区金沙江路 1518 弄',
        add_time: ''
      }],
      filters: {
        dataFilter (res) {
          return moment(res).format('YYYY-MM-DD')
        }
      }
    }
  },
  created () {
    this.loadgoods()
  },
  methods: {
    async loadgoods () {
      let res = await this.$axios.get('goods', {
        params: {
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res)
      this.goodsData = res.data.data.goods
    },
    addgoods () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
