<template>
  <div class="p-center">
    <van-nav-bar title="应用中心" class="header mb-10">
      <template #right>
        <van-popover v-model="showPopover" trigger="click" placement="left-start" :actions="actions" @select="onSelect">
          <template #reference>
            <van-icon name="add-o" size="24" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <!-- 应用列表 -->
    <van-grid class="main ml-10 mr-10">
      <van-grid-item
        class="app-list"
        v-for="item in appListData"
        :key="item.id"
        :text="item.name"
        :icon="item.icon || 'photo-o'"
        @click="openApp(item)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'Center',
  data() {
    const disabled = true
    return {
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: '退出登录' },
        { text: '修改密码', disabled },
        { text: '管理应用', disabled },
        { text: '更新日志' },
        { text: '问题反馈' },
      ],
      // 应用列表数据
      appListData: [
        {
          id: 'work-time-rec',
          name: '工时记录',
          path: '/workTime',
          icon: 'clock-o',
        },
      ],
    }
  },
  methods: {
    // 打开扩展功能
    onSelect(action) {
      Toast(`${action.text}还在开发中`)
    },
    // 打开应用
    openApp(data) {
      this.$router.push(data.path)
    },
  },
}
</script>
<style lang="less">
.p-center {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
  overflow: hidden;
}
</style>
