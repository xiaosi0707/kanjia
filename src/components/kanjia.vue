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
        <el-button class="kan-btn-request" @click="friendKan">好友砍价</el-button>
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
import $ from 'jquery'
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
    let myToken = window.localStorage.getItem('myToken')
    let { floorPrice, kanJiaId, name, pic, originalPrice } = this.$route.query
    this.floorPrice = floorPrice
    this.name = name
    this.pic = pic
    this.originalPrice = originalPrice
    Axios.post(`https://api.it120.cc/small4/shop/goods/kanjia/join?kjid=${kanJiaId}&token=${myToken}`).then(res => {
      console.log(res)
      let { code } = res.data
      let { helpNumber, curPrice, uid } = res.data.data
      this.helpNumber = helpNumber
      this.curPrice = curPrice
      this.uid = uid
      if (!code && !res.data.data.statusStr) {
        this.open6()
      }
      this.share()
    })
  },
  methods: {
    // 分享到朋友圈和好友
    share () {
      let myToken = window.localStorage.getItem('myToken')
      let { floorPrice, kanJiaId, name, pic } = this.$route.query
      let url = location.href.split('#')[0]
      $.ajax({
        url: 'http://www.wyunfei.com/tp/WeChat/',
        type: 'get',
        data: {
          url: url
        },
        success (res) {
          wx.config({
            debug: true,
            appId: res.appId,
            timestamp: res.timestamp,
            signature: res.sign,
            nonceStr: res.nonceStr,
            jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
              'onMenuShareTimeline', // 分享到朋友圈接口
              'onMenuShareAppMessage'
            ]
          })
          wx.ready(function () {
            // 分享到朋友圈
            wx.onMenuShareTimeline({
              title: `一款"${name}"，千军万马来相见，帮我砍“死”他，O(∩_∩)O哈哈~`, // 商品标题
              desc: '不好好写代码，只有帮别人砍价的份儿...', // 商品描述
              link: `http://www.wyunfei.com/students/wangyunfei/index.html#/friend?kanJiaId=${kanJiaId}&floorPrice=${floorPrice}&myToken=${myToken}`, // 好友从朋友圈点进去的页面
              imgUrl: `${pic}`, // 商品图片
              success: function (res) {
                alert('分享成功')
              }
            })
            // 分享给好友
            wx.onMenuShareAppMessage({
              title: `hi，亲爱的小伙伴，还记得我吗？"${name}"等你O(∩_∩)O哈哈~`,
              desc: '不好好写代码，只有帮别人砍价的份儿...',
              link: `http://www.wyunfei.com/students/wangyunfei/index.html#/friend?kanJiaId=${kanJiaId}&floorPrice=${floorPrice}&myToken=${myToken}`,
              imgUrl: `${pic}`, // 商品图片
              success: function (res) {
                alert('分享成功')
              }
            })
          })
        }
      })
    },
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
      let myToken = window.localStorage.getItem('myToken')
      let { kanJiaId } = this.$route.query
      if (myToken) {
        Axios.post(`https://api.it120.cc/small4/shop/goods/kanjia/help?token=${myToken}&kjid=${kanJiaId}&joinerUser=${this.uid}`).then(res => {
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
    // friendKan () {
    //   let friendToken = window.localStorage.getItem('friendToken')
    //   let { kanJiaId } = this.$route.query
    //   if (!friendToken) {
    //     this.$router.push({
    //       path: 'login',
    //       query: { is: 'friend' }
    //     })
    //     return false
    //   }
    //   Axios.post(`https://api.it120.cc/small4/shop/goods/kanjia/help?token=${friendToken}&kjid=${kanJiaId}&joinerUser=${this.uid}`).then(res => {
    //     console.log(res)
    //     let { code } = res.data
    //     let { dateAdd } = res.data.data
    //     if (dateAdd) {
    //       this.open4()
    //       return
    //     }
    //     if (!code) {
    //       this.open5()
    //       setTimeout(() => {
    //         window.location.reload()
    //       }, 2000)
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
