<template>
  <div class="p-system-log">
    <!-- 导航栏 -->
    <van-nav-bar title="更新记录" left-arrow @click-left="$router.push('/center')" class="header mb-10"></van-nav-bar>
    <!-- 更新记录-->
    <div>
      <div class="item-title">2022/11/06</div>
      <van-panel title="工时记录模块 v0.2" desc="导出JSON、切换月份"> </van-panel>
      <div class="item-title">2022/11/05</div>
      <van-panel title="工时记录模块 v0.1" desc="基础功能、统计、本地缓存"> </van-panel>
      <van-panel title="应用基础框架 v0.1" desc="应用中心、更新日志"> </van-panel>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'SystemLog',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style lang="less">
.p-system-log {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
  overflow: hidden;
  .item-title {
    margin: 10px;
    font-size: 14px;
  }
}
</style>
