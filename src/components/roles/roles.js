export default {
  data () {
    return {
      roleData: [
        {
          roleName: '',
          roleDesc: ''
        }
      ],
      dialogRolesVisible: false,
      rightsdata: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: ''
    }
  },
  created () {
    this.loadRights()
    this.getRoles()
  },
  methods: {
    async getRoles () {
      let res = await this.$axios.get(
        'http://localhost:8888/api/private/v1/roles'
      )
      console.log(res)
      this.roleData = res.data.data
    },
    indexMethod (index) {
      // 通过返回值 把行号返回去,作为索引存在
      return index
    },
    showdialogRolesVisible (row) {
      this.roleId = row.id
      let keys = []
      this.dialogRolesVisible = true
      console.log(row)
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      this.$nextTick(() => {
        console.log(this.$refs.tree)
        // this.$refs.tree.setCheckedKeys(keys)
        this.$refs.tree.setCheckedKeys(keys)
        console.log(keys)
      })
    },

    async loadRights () {
      let res = await this.$axios.get(
        'http://localhost:8888/api/private/v1/rights/tree'
      )
      console.log(res)
      this.rightsdata = res.data.data
    },
    async assignRights () {
      console.log(this.roleId)
      let key1 = this.$refs.tree.getCheckedKeys()
      let key2 = this.$refs.tree.getHalfCheckedKeys()
      let keys = [...key1, ...key2]
      let res = await this.$axios.post(
        `http://localhost:8888/api/private/v1/roles/${this.roleId}/rights`,
        {
          rids: keys.join(',')
        }
      )
      console.log(res)
      if (res.data.meta.status === 200) {
        this.dialogRolesVisible = false
        this.$message({
          message: '分配权限成功',
          type: 'success',
          duration: 800
        })
        this.getRoles()
      }
    }
  }
}
