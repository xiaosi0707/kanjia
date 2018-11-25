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
            <img :src=" basicInfo.pic " class="image">
            <div style="padding: 14px;">
              <span>{{ basicInfo.name }}</span>
              <div class="bottom clearfix">
                <p>
                  <i>底价 ¥{{ floorPrice }}</i>
                  <u>原价 ¥{{ basicInfo.originalPrice }}</u>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      <div class="price">
        当前价 {{ curPrice }}元，已砍{{ basicInfo.originalPrice - curPrice }}元
      </div>
      <div class="kanjia-btn">
        <el-button class="kan-btn-active" @click="friendKan(uid)">帮好友砍一刀{{ uid }}</el-button>
        <el-button class="kan-btn-request">我要发起砍价</el-button>
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
      floorPrice: '',
      curPrice: '',
      name: '',
      pic: '',
      uid: '',
      basicInfo: {}
    }
  },
  // friend
  created () {
    // let myToken = window.localStorage.getItem('myToken')
    let { kanJiaId, floorPrice, myToken } = this.$route.query
    this.floorPrice = floorPrice
    Axios.post(`https://api.it120.cc/small4/shop/goods/kanjia/join?kjid=${kanJiaId}&token=${myToken}`).then(res => {
      console.log(res)
      let { code } = res.data
      let { helpNumber, curPrice, uid, goodsId } = res.data.data
      this.helpNumber = helpNumber
      this.curPrice = curPrice
      this.uid = uid
      if (!code && !res.data.data.statusStr) {
        this.open6()
      }
      if (goodsId) {
        Axios.post(`https://api.it120.cc/small4/shop/goods/detail?id=${goodsId}`).then(res => {
          console.log(res)
          let { basicInfo } = res.data.data
          this.basicInfo = basicInfo
          console.log(this.basicInfo.originalPrice)
        })
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
    // 好友砍
    friendKan (uid) {
      let friendToken = window.localStorage.getItem('friendToken')
      let { kanJiaId, floorPrice, myToken } = this.$route.query
      if (!friendToken) {
        this.$router.push({
          path: 'login',
          query: { kanJiaId: kanJiaId, floorPrice: floorPrice, myToken: myToken }
        })
        return false
      }
      console.log(uid)
      Axios.post(`https://api.it120.cc/small4/shop/goods/kanjia/help?token=${friendToken}&kjid=${kanJiaId}&joinerUser=${uid}`).then(res => {
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
            window.location.reload()
          }, 2000)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
