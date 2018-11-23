<template>
    <div class="login">

        <el-card shadow="always">
          登录
        </el-card>

      <div>
        <el-input placeholder="请输入token" v-model="input3">
          <template slot="prepend">token</template>
        </el-input>
        <!--<el-input placeholder="请输入内容" v-model="input3">-->
          <!--<template slot="prepend">密码</template>-->
        <!--</el-input>-->
        <el-button type="danger">登录</el-button>
      </div>
    </div>
</template>

<script>
</script>

<style scoped>

</style>
