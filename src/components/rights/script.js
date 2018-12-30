export default {
  data () {
    return {
      rightsTableData: [
        {
          authName: '',
          path: '',
          level: ''
        }
      ]
    }
  },
  async created () {
    const res = await this.$http.get('rights/list')
    console.log(res)
    const {meta, data} = res.data
    if (meta.status === 200) {
      // for (let key in this.rightsTableData) {
      //   this.rightsTableData[key] = data[key]
      // }
      this.rightsTableData = data
    }
  },
  methods: {
    // table 索引为0
    indexMethod (index) {
      return index
    }
  }

}
