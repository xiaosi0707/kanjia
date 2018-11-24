<template>
  <div class="list">
  <el-row>
    <el-col v-for="(item, index) in kanjiaList" :key="index">
      <router-link :to="{path: '/detail', query: { id: item.id }}" tag="div">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.pic" class="image">
        <div style="padding: 14px;">
          <span>{{ item.name }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">{{ item.characteristic }}</el-button>
          </div>
        </div>
      </el-card>
      </router-link>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      kanjiaList: []
    }
  },
  created () {
    Axios.get('https://api.it120.cc/small4/shop/goods/list').then(res => {
      console.log(res)
      let { data } = res.data
      this.kanjiaList = data.filter(item => {
        if (item.kanjia) {
          return item
        }
      })
    })
  }
}
</script>

<style scoped>

</style>
