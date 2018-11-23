<template>
  <div>
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
        <el-button class="kan-btn-active" @click="kanOwn">自己先砍一刀</el-button>
        <el-button class="kan-btn-request">邀请好友砍价</el-button>
      </div>
    </div>
  <div class="friend-list">
    <header>{{ helpNumber }}名好友帮砍</header>
    <dl>
      <img src="https://avatars2.githubusercontent.com/u/21288681?s=460&v=4" alt="">
      <dt>
        小四<br />2018-11-12
      </dt>
      <dd>
        砍掉13.98元
      </dd>
    </dl>
  </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      currentDate: new Date(),
      helpNumber: 0
    }
  },
  created () {
    Axios.post('https://api.it120.cc/small4/shop/goods/kanjia/join?kjid=642&token=a295c26c-c616-4388-9931-3dc86781a7b8').then(res => {
      console.log(res)
      let { code } = res.data
      let { helpNumber } = res.data.data
      this.helpNumber = helpNumber
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
    },
    kanOwn () {
      Axios.post('https://api.it120.cc/small4/shop/goods/kanjia/help?token=a29c96fc-3e47-42f1-8f70-73a2303a96b4&kjid=642&joinerUser=614030').then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
