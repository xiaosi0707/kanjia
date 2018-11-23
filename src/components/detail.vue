<template>
  <div>
    <div class="block">
      <el-carousel>
        <el-carousel-item v-for="item in detailData.pics" :key="item">
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
        <span><i>底价<b>¥{{ detailData.basicInfo.originalPrice }}</b></i>原价¥{{ detailData.basicInfo.originalPrice }}</span>
        <span>库存 {{ detailData.basicInfo.stores }}</span>
      </div>
    </el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品介绍" name="first" v-html="detailData.content"></el-tab-pane>
      <el-tab-pane label="商品评价" name="second">暂无评价</el-tab-pane>
    </el-tabs>
    <el-row>
      <el-button type="danger">立即发起砍价</el-button>
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      detailData: {},
      activeName: 'first'
    }
  },
  created () {
    Axios.post(`https://api.it120.cc/small4/shop/goods/detail?id=99766`).then(res => {
      console.log(res)
      let { basicInfo, category, content, pics, properties } = res.data.data
      this.detailData = {
        basicInfo,
        category,
        content,
        pics,
        properties
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
