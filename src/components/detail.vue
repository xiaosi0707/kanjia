<template>
  <div>
    <div class="block">
      <el-carousel>
        <el-carousel-item v-for="item in detailData.pics" :key="item">
          <h3><img :src=" item.pic " alt=""></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      detailData: {}
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
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
