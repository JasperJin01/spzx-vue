const Layout = () => import('@/layout/index.vue')
const product = () => import('@/views/product/product.vue')
const category = () => import('@/views/product/category.vue')
const brand = () => import('@/views/product/brand.vue')
const categoryBrand = () => import('@/views/product/categoryBrand.vue')
const productSpec = () => import('@/views/product/productSpec.vue')


export default [
  {
    path: '/product', // 路由的URL路径
    name: 'product', // 路由名称，
    component: Layout, // 页面
    meta: {
      // 包含路由元信息的对象，可以包含任何你需要的数据，常用于存储权限信息、页面标题等
      title: '商品管理',
    },
    icon: 'Setting', // 小图标 https://element-plus.org/zh-CN/component/icon.html
    children: [
      // 子路由
      {
        path: '/product',
        name: 'product',
        component: product,
        meta: {
          title: '商品信息管理',
          affix: false,
        },
        icon: 'User',
      },
      {
        path: '/category',
        name: 'category',
        component: category,
        meta: {
          title: '分类管理',
          affix: false,
        },
        icon: 'EditPen',
      },
      {
        path: '/brand',
        name: 'brand',
        component: brand,
        meta: {
          title: '品牌管理',
          affix: false,
        },
        icon: 'Operation',
      },
      {
        path: '/categoryBrand',
        name: 'categoryBrand',
        component: categoryBrand,
        meta: {
          title: '分类品牌管理',
          affix: false,
        },
        icon: 'User',
      },
      {
        path: '/productSpec',
        name: 'productSpec',
        component: productSpec,
        meta: {
          title: '商品规格管理',
          affix: false,
        },
        icon: 'User',
      },
    ],
  },
]
