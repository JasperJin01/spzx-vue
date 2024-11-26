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
// sysRole.js

const Layout = () => import('@/layout/index.vue')
const sysUser = () => import('@/views/system/sysUser.vue')
const sysRole = () => import('@/views/system/sysRole.vue')
const sysMenu = () => import('@/views/system/sysMenu.vue')

export default [
  {
    path: '/system', // 路由的URL路径
    name: 'system', // 路由名称，
    component: Layout, // 页面
    meta: {
      // 包含路由元信息的对象，可以包含任何你需要的数据，常用于存储权限信息、页面标题等
      title: '系统管理',
    },
    icon: 'Setting', // 小图标 https://element-plus.org/zh-CN/component/icon.html
    children: [
      // 子路由
      {
        path: '/sysUser',
        name: 'sysUser', // TODO path,name是匹配数据库的
        component: sysUser,
        meta: {
          title: '用户管理',
          affix: false,
        },
        icon: 'User',
      },
      {
        path: '/sysRole',
        name: 'sysRole',
        component: sysRole,
        meta: {
          title: '角色管理',
          affix: false,
        },
        icon: 'EditPen',
      },
      {
        path: '/sysMenu',
        name: 'sysMenu',
        component: sysMenu,
        meta: {
          title: '菜单管理',
          affix: false,
        },
        icon: 'Operation',
      },
    ],
  },
]
