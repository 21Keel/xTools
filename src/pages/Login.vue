<template>
  <div class="p-login">
    <article>
      <div>Hello World</div>
      <div class="desc">From small beginning come great things.</div>
    </article>
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        autocomplete="off"
      />
      <van-field
        v-model="formData.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="mt-20 line-center">
        <van-button type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      setTimeout(() => {
        Toast('登录成功')
        this.$router.push('/center')
      }, 1000)
    },
  },
}
</script>
<style lang="less">
.p-login {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
  article {
    position: relative;
    height: 70px;
    line-height: 70px;
    font-size: 24px;
    text-align: center;
    .desc {
      position: absolute;
      top: 20px;
      left: 0;
      width: 100%;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
