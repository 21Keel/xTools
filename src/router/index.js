import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'hash',
  base: '/xTools',
  routes,
})

router.beforeEach((from, to, next) => {
  next()
})

export default router
