
export default {
  data () {
    return {
      rolseTableData: []
    }
  },
  async created () {
    const res = await this.$http.get('roles')

    const {meta, data} = res.data
    if (meta.status === 200) {
      this.rolseTableData = data
    }
    console.log(res)
  },
  methods: {
    indexMethod (index) {
      return index
    }
  }
}
