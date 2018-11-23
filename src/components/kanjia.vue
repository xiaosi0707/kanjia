<template>
    <div class="kanjia">
      <div class="header">
        <img src="https://avatars2.githubusercontent.com/u/21288681?s=460&v=4" alt="">
        <span>小四</span>
        <p>我发现一件好货，来帮我砍到最低价吧O(∩_∩)O哈哈~</p>
      </div>
        <el-col >
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://i3.meishichina.com/attachment/recipe/2018/11/23/2018112315429398985579702111.jpg?x-oss-process=style/c320" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <p>
                  <i>底价 ¥79</i>
                  <u>原价 ¥269</u>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      <div class="price">
        当前价 259元，已砍0.00元
      </div>
      <div class="kanjia-btn">
        <el-button class="kan-btn-active">自己先砍一刀</el-button>
        <el-button class="kan-btn-request">邀请好友砍价</el-button>
      </div>

    </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      currentDate: new Date()
    }
  },
  created () {
    Axios.post('https://api.it120.cc/small4/shop/goods/kanjia/join?kjid=642&token=a295c26c-c616-4388-9931-3dc86781a7b8').then(res => {
      console.log(res)
      let { code } = res.data
      if (!code && !res.data.data.statusStr) {
        this.open6()
      }
    })
  },
  methods: {
    open6 () {
      this.$message({
        showClose: true,
        message: '恭喜你，砍价发起成功！',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>

</style>
