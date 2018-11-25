<template>
    <div class="login">
        <el-card shadow="always">
          登录
        </el-card>
      <div>
        <el-input placeholder="请输入token" v-model="token">
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
      isLoading: false,
      token: ''
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

      // 身份校验（是我？还是friend？）
      let { is } = this.$route.query
      if (is) {
        window.localStorage.setItem('friendToken', this.token)
      } else {
        window.localStorage.setItem('myToken', this.token)
      }
      setTimeout(() => {
        // if (!window.localStorage.getItem('myToken') || !window.localStorage.getItem('friendToken')) return
        this.open6()
        setTimeout(() => {
          this.$router.push({
            path: '/'
          })
        }, 2000)
      }, 2000)
    }
  }
}
</script>

<style scoped>

</style>
