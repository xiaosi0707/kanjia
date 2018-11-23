<template>
    <div class="login">
        <el-card shadow="always">
          登录
        </el-card>
      <div>
        <el-input placeholder="请输入token" v-model="input3">
          <template slot="prepend">token</template>
        </el-input>
        <!--<el-input placeholder="请输入内容" v-model="input3">-->
          <!--<template slot="prepend">密码</template>-->
        <!--</el-input>-->
        <el-button type="danger" @click="login" :loading="isLoading">登录</el-button>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    open6 () {
      this.$message({
        showClose: true,
        message: '恭喜你，登陆成功！',
        type: 'success'
      })
    },
    login () {
      this.isLoading = true
      setTimeout(() => {
        this.open6()
        setTimeout(() => {
          this.$router.push({
            path: 'kanjia'
          })
        }, 2000)

      }, 2000)
    }
  }
}
</script>

<style scoped>

</style>
