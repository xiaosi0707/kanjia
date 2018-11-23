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
    </div>
</template>

<script>
export default {
  data () {
    return {
      currentDate: new Date()
    }
  }
}
</script>

<style scoped>

</style>
