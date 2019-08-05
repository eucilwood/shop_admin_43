export default {
  data () {
    return {
      categoriesTableData: [
        {
          cat_name: '',
          cat_deleted: '',
          cat_level: ''
        }
      ],
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      defaultProps1: {
        label: 'cat_name',
        value: 'cat_id'
      },
      dialogFormVisible: false,

      addCategoriesForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      formLabelWidth: '120px',
      options: [
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.getCategories()
    this.getCategories2()
  },
  methods: {
    /* eslint-disable */

    async getCategories() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res)
      this.categoriesTableData = res.data.data.result
    },
    async getCategories2() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      this.options = res.data.data
    },
    async AddCategories() {
      const { cat_name, cat_pid_arr } = this.addCategoriesForm
      console.log(cat_name)
      let res = await this.$axios.post('categories', {
        //   cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name,
        cat_level: 2
      })
      console.log(res)
      if (res.data.meta.status == 201) {
        this.dialogFormVisible = false
        this.getCategories()
      }
    },
    addfenlei() {
      this.dialogFormVisible = true
    }
  }
}
