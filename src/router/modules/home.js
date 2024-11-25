/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2022-09-24 19:27:21
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
// home.js

// 动态导入，利用箭头函数返回一个 Promise 对象的表达式，这个 Promise 将异步地解析为一个 Vue 组件。
// 这种语法是实现路由懒加载的常见方式，在 Vue Router 中广泛使用。
// 当路由被访问时，对应的组件才会被加载，有助于减少应用的初始加载时间。
const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')

export default [
  {
    path: '/home', // 路由的URL路径
    component: Layout, // 当导航到该路径时，Vue Router 将渲染的组件
    name: 'Dashboard', // 路由的名字，可以用于编程式导航
    meta: {
      // 包含路由元信息的对象，可以包含任何你需要的数据，常用于存储权限信息、页面标题等
      title: 'menu.dashboard',
    },
    icon: 'icon-home', // 可能用于显示在 UI 导航元素上的图标
    children: [
      // 嵌套路由的数组，表示这个路由下的子路由
      {
        path: '',
        name: 'home',
        component: Home,
        meta: {
          title: 'menu.homepage',
          affix: true,
        },
      },
    ],
  },
]
