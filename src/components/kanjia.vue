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
            <img :src=" pic " class="image">
            <div style="padding: 14px;">
              <span>{{ name }}</span>
              <div class="bottom clearfix">
                <p>
                  <i>底价 ¥{{ floorPrice }}</i>
                  <u>原价 ¥{{ originalPrice }}</u>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      <div class="price">
        当前价 {{ curPrice }}元，已砍{{ originalPrice - curPrice }}元
      </div>
      <div class="kanjia-btn">
        <el-button class="kan-btn-active" @click="kanOwn">自己先砍一刀</el-button>
        <el-button class="kan-btn-request">邀请好友砍价</el-button>
      </div>
    </div>
  <div class="friend-list">
    <header v-if="helpNumber">{{ helpNumber }}名好友帮砍</header>
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
      helpNumber: 0,
      originalPrice: '',
      floorPrice: '',
      curPrice: '',
      name: '',
      pic: '',
      uid: ''
    }
  },
  created () {
    console.log(this.$route.query)
    // let token = window.localStorage.getItem('token')
    let { floorPrice, kanJiaId, name, pic, originalPrice } = this.$route.query
    this.floorPrice = floorPrice
    this.name = name
    this.pic = pic
    this.originalPrice = originalPrice
    Axios.post(`https://api.it120.cc/small4/shop/goods/kanjia/join?kjid=${kanJiaId}&token=c005d7cf-38b4-4bc3-a9c1-cf30852de7bb`).then(res => {
      console.log(res)
      let { code } = res.data
      let { helpNumber, curPrice, uid } = res.data.data
      this.helpNumber = helpNumber
      this.curPrice = curPrice
      this.uid = uid
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
    open5 () {
      this.$message({
        showClose: true,
        message: '恭喜你，砍价成功！',
        type: 'success'
      })
    },
    open4 () {
      this.$message({
        showClose: true,
        message: '不要太贪心哦，你已砍过了^_^！',
        type: 'success'
      })
    },
    // 自己砍
    kanOwn () {
      let token = window.localStorage.getItem('token')
      let { kanJiaId } = this.$route.query
      if (token) {
        Axios.post(`https://api.it120.cc/small4/shop/goods/kanjia/help?token=${token}&kjid=${kanJiaId}&joinerUser=${this.uid}`).then(res => {
          console.log(res)
          let { code } = res.data
          let { dateAdd } = res.data.data
          if (dateAdd) {
            this.open4()
            return
          }
          if (!code) {
            this.open5()
            setTimeout(() => {
              // window.location.reload()
            }, 2000)
          }
        })
      }
    }
    // friendKan () {
    //
    // }
  }
}
</script>

<style scoped>

</style>
