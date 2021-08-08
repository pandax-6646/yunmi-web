import Layout from '@/views/layout'
export default [

  // 首页
  {
    path: '/',
    meta: {
      title: "首页",
      icon: 'icon-liuliangyunpingtaitubiao02'
    },
    component: Layout,
    redirect: '/home',

    children: [{
      name: "Home",
      path: "home",
      meta: {
        title: "首页",
      },
      component: () => import('@/views/home/index.vue')
    }]
  },


  // 品牌
  {
    name: 'brand',
    path: '/brand',
    component: Layout,
    redirect: '/brand/list',
    meta: {
      title: "品牌管理",
      icon: "icon-brand"
    },

    children: [{
      name: 'BrandList',
      path: 'list',
      component: () => import("@/views/brand/list.vue"),
      meta: {
        title: '品牌列表',
        icon: 'icon-liebiao'
      }
    },
    {
      name: 'BrandAdd',
      path: 'add',
      component: () => import("@/views/brand/add.vue"),
      meta: {
        title: '添加品牌',
        icon: 'icon-tianjia'
      }
    },
    {
      name: 'BrandEdit',
      path: 'edit',
      component: () => import("@/views/brand/edit.vue"),
      meta: {
        title: '编辑品牌',
        icon: 'icon-bianji',

        // 该路由不在页面显示
        hidden: true
      }
    },
    ]
  },


  // 产品管理
  {
    name: 'product',
    path: '/product',
    meta: {
      title: "产品管理",
      icon: 'icon-shangpingouwudai2'
    },
    component: Layout,
    redirect: '/product/list',

    children: [{
      name: 'ProductList',
      path: 'list',
      meta: {
        title: '产品列表',
        icon: 'icon-liebiao'
      },
      component: () => import('@/views/product/list')
    },
    {
      name: 'ProductAdd',
      path: 'add',
      meta: {
        title: '添加产品',
        icon: 'icon-tianjia'
      },
      component: () => import('@/views/product/add')
    },
    {
      name: 'ProductEdit',
      path: 'edit',
      meta: {
        title: '编辑产品',
        icon: 'icon-bianji',
        hidden: true
      },
      component: () => import('@/views/product/edit')
    }
    ]
  },

  // 分类
  {
    name: 'type',
    path: '/type',
    meta: {
      title: "分类管理",
      icon: "icon-leimupinleifenleileibie2",
    },
    component: Layout,
    redirect: '/type/list',
    children: [

      // 一级分类页的路由
      {
        name: 'TypeList',
        path: 'list',
        meta: {
          title: '分类列表',
          icon: 'icon-liebiao'
        },
        component: () => import("@/views/type/list")
      },
      {
        name: 'TypeEdit',
        path: 'edit',
        meta: {
          title: "分类编辑",
          icon: 'icon-bianji',
          hidden: true
        },
        component: () => import("@/views/type/edit"),

      },
      {
        name: "TypeAdd",
        path: 'add',
        meta: {
          title: "添加分类",
          icon: "icon-tianjia"
        },
        component: () => import("@/views/type/add")
      },

      // 二级分类页路由
      {
        name: 'SubTypeList',
        path: 'subList',
        meta: {
          title: "二级分类列表",
          icon: 'icon-liebiao',
          hidden: true
        },
        component: () => import("@/views/type/subList")
      },
      {
        name: 'SubTypeEdit',
        path: 'subEdit',
        meta: {
          title: "二级分类编辑",
          icon: 'icon-bianji',
          hidden: true
        },
        component: () => import("@/views/type/subEdit")
      },
      {
        name: 'SubTypeAdd',
        path: 'subAdd',
        meta: {
          title: "二级分类添加",
          icon: 'icon-tianjia',
          hidden: true
        },
        component: () => import("@/views/type/subAdd")
      },
    ]
  },



  // 调试组件使用
  // {
  //   path: '/demo',
  //   meta: {
  //     title: 'demo',
  //     icon: 'el-icon-loading',
  //   },
  //   name: 'demo',
  //   component: Layout,
  //   redirect: '/demo/index',
  //   children: [{
  //     path: 'index',
  //     meta: {
  //       title: 'index'
  //     },
  //     name: 'demo-index',
  //     component: () => import('@/views/demo/index.vue')
  //   }]
  // }
]