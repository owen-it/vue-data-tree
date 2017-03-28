const Component = require('./src/index.vue')
module.exports = Component

Component.install = Vue => Vue.component(Component.name, Component)
Component.version = proccess.env.VERSION

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Component)
}
