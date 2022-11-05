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
        @click="item.path ? openApp(item.path) : Toast('维护中，暂不可用')"
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
        { text: '退出登录', action: () => this.logout() },
        { text: '修改密码' },
        { text: '管理应用', disabled },
        { text: '更新日志', action: () => this.openApp('/system/log') },
        { text: '问题反馈' },
        { text: '用户配置' },
      ],
      // 应用列表数据
      appListData: [
        {
          id: 'work-time-rec',
          name: '工时记录',
          path: '/work-time',
          icon: 'clock-o',
        },
        {
          id: 'get-box',
          name: '收集箱',
          path: '',
          icon: 'comment-o',
        },
      ],
    }
  },
  methods: {
    Toast,
    // 打开扩展功能
    onSelect(item) {
      if (item.action) {
        item.action()
      } else {
        Toast(`${item.text}还在开发中`)
      }
    },
    // 打开应用
    // @param traceless { Boolean } 无痕模式
    openApp(path, traceless = false) {
      traceless ? this.$router.replace(path) : this.$router.push(path)
    },
    // 登出
    logout() {
      localStorage.setItem('token', '')
      this.$store.commit('setToken', '')
      this.$router.replace('/login')
    }
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
