<template>
  <div v-if="detailData.basicInfo.name">
    <div class="block">
      <el-carousel>
        <el-carousel-item v-for="(item, index) in detailData.pics" :key="index">
          <h3><img :src=" item.pic " alt=""></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-card class="box-card">
      <div class="text item">
        {{ detailData.basicInfo.name }}
      </div>
      <div class="text item">
        {{ detailData.basicInfo.characteristic }}
      </div>
      <div class="text item">
        <span><i>底价<b>¥{{ detailData.basicInfo.kanjiaPrice }}</b></i>原价¥{{ detailData.basicInfo.originalPrice }}</span>
        <span>库存 {{ detailData.basicInfo.stores }}</span>
      </div>
    </el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品介绍" name="first" v-html="detailData.content"></el-tab-pane>
      <el-tab-pane label="商品评价" name="second">暂无评价</el-tab-pane>
    </el-tabs>
    <el-row>
      <el-button type="danger">
        <router-link :to="{ path: '/kanjia', query: { name: detailData.basicInfo.name, floorPrice: detailData.basicInfo.kanjiaPrice, kanJiaId: kanJiaId, pic: detailData.basicInfo.pic, originalPrice: detailData.basicInfo.originalPrice }}" tag="span">立即发起砍价</router-link>
      </el-button>
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      detailData: {},
      activeName: 'first',
      kanJiaId: '',
      originalPrice: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    let myToken = window.localStorage.getItem('myToken')
    if (!myToken) {
      next()
      this.$router.push({
        path: 'login'
      })
    } else {
      next()
      // this.$router.push({
      //   path: 'kanjia'
      // })
    }
  },
  created () {
    let { id } = this.$route.query
    Axios.post(`https://api.it120.cc/small4/shop/goods/detail?id=${id}`).then(res => {
      let { basicInfo, category, content, pics, properties } = res.data.data
      this.detailData = {
        basicInfo,
        category,
        content,
        pics,
        properties
      }
    })
    // 根据当前商品的goodsId找到当前商品的kanjiaId，然后传递给砍价详情页
    Axios.get('https://api.it120.cc/small4/shop/goods/kanjia/list').then(res => {
      let { result } = res.data.data
      this.kanJiaId = result.filter(item => {
        if (item.goodsId === Number(id)) {
          return item.id
        }
      })[0].id
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
