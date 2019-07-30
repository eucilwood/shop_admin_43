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
