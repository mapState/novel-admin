import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path:'/',
    name:'dataMgt',
    component:Layout,
    redirect:'/dataMgt/mgtShow',
    meta:{title:'数据管理',icon:'documentation'},
    children:[
      { name:'mgtShow',
        path:'/dataMgt/mgtShow',
        component: () => import('@/views/dataMgt/mgtShow'),
        meta:{title:'数据展示',icon:'edit'}
      },
      { name:'mgtPool',
        path:'/dataMgt/mgtPool',
        component: () => import('@/views/dataMgt/mgtPool'),
        meta:{title:'数据汇总',icon:'list'}
      }
    ]
  },
  {
    path:'/novelMgt',
    name:'novelMgt',
    component:Layout,
    redirect:'/novelMgt/class',
    meta:{title:'小说管理',icon:'education'},
    children:[
      { name:'class',
        path:'/novelMgt/class',
        component: () => import('@/views/novelMgt/class'),
        meta:{title:'分类管理',icon:'form'}
      },
      { name:'mgtPool',
        path:'/novelMgt/channel',
        component: () => import('@/views/novelMgt/channel'),
        meta:{title:'频道管理',icon:'list'}
      },
      { name:'mgtPool',
      path:'/novelMgt/novel',
        component: () => import('@/views/novelMgt/novel'),
        meta:{title:'小说管理',icon:'list'}
      }
    ]
  },
  {
    path:'/memberMgt',
    name:'memberMgt',
    component:Layout,
    redirect:'/memberMgt/list',
    meta:{title:'会员管理',icon:'user'},
    children:[
      { name:'meList',
        path:'/memberMgt/list',
        component: () => import('@/views/memberMgt/list'),
        meta:{title:'会员列表',icon:'peoples'}
      }
    ]
  },
  {
    path:'/orderMgt',
    name:'orderMgt',
    component:Layout,
    redirect:'/orderMgt/orderList',
    meta:{title:'订单管理',icon:'shopping'},
    children:[
      { name:'orderList',
        path:'/orderMgt/orderList',
        component: () => import('@/views/orderMgt/orderList'),
        meta:{title:'订单管理',icon:'shopping'}
      }
    ]
  },
  {
    path:'/channelMgt',
    name:'channelMgt',
    component:Layout,
    redirect:'/channelMgt/channelList',
    meta:{title:'渠道管理',icon:'international'},
    children:[
      { name:'channel',
        path:'/channelMgt/channelList',
        component: () => import('@/views/channelMgt/channelList'),
        meta:{title:'渠道列表',icon:'list'}
      },
      { name:'close',
      path:'/channelMgt/closeList',
      component: () => import('@/views/channelMgt/closeList'),
      meta:{title:'结算列表',icon:'list'}
      },
      { name:'withdraw',
      path:'/channelMgt/withdrawList',
      component: () => import('@/views/channelMgt/withdrawList'),
      meta:{title:'提现列表',icon:'list'}
    }
    ]
  },
  {
    path:'/proxyMgt',
    name:'proxyMgt',
    component:Layout,
    redirect:'/proxyMgt/proxyList',
    meta:{title:'代理管理',icon:'people'},
    children:[
      { name:'proxyList',
        path:'/proxyMgt/proxyList',
        component: () => import('@/views/proxyMgt/proxyList'),
        meta:{title:'代理列表',icon:'list'}
      },
      { name:'withdrawList',
      path:'/proxyMgt/withdrawList',
      component: () => import('@/views/proxyMgt/withdrawList'),
      meta:{title:'提现列表',icon:'list'}
    }
    ]
  },
  {
    path:'/marketMgt',
    name:'marketMgt',
    component:Layout,
    redirect:'/marketMgt/placard',
    meta:{title:'营销管理',icon:'excel'},
    children:[
      { name:'placard',
        path:'/marketMgt/placard',
        component: () => import('@/views/marketMgt/placard'),
        meta:{title:'公告管理',icon:'list'}
      },
      { name:'placar',
        path:'/marketMgt/poster',
        component: () => import('@/views/marketMgt/poster'),
        meta:{title:'营销海报',icon:'list'}
      },
      { name:'signIn',
        path:'/marketMgt/signIn',
        component: () => import('@/views/marketMgt/signIn'),
        meta:{title:'签到管理',icon:'list'}
      },
      { name:'activity',
        path:'/marketMgt/activity',
        component: () => import('@/views/marketMgt/activity'),
        meta:{title:'活动设置',icon:'list'}
      }
    ]
  },
  {
    path:'/newsMgt',
    name:'newsMgt',
    component:Layout,
    redirect:'/newsMgt/news',
    meta:{title:'消息管理',icon:'email'},
    children:[
      { name:'news',
        path:'/newsMgt/news',
        component: () => import('@/views/newsMgt/news'),
        meta:{title:'消息管理',icon:'email'}
      }
    ]
  },
  {
    path:'/packageMgt',
    name:'packageMgt',
    component:Layout,
    redirect:'/packageMgt/member',
    meta:{title:'套餐管理',icon:'table'},
    children:[
      { name:'member',
        path:'/packageMgt/member',
        component: () => import('@/views/packageMgt/member'),
        meta:{title:'会员套餐',icon:'list'}
      },
      { name:'book',
        path:'/packageMgt/book',
        component: () => import('@/views/packageMgt/book'),
        meta:{title:'书币套餐',icon:'list'}
      }
    ]
  },
  {
    path:'/statisticsMgt',
    name:'statisticsMgt',
    component:Layout,
    redirect:'/statisticsMgt/showData',
    meta:{title:'数据统计',icon:'chart'},
    children:[
      { name:'showData',
        path:'/statisticsMgt/showData',
        component: () => import('@/views/statisticsMgt/showData'),
        meta:{title:'数据展示',icon:'list'}
      },
      { name:'history',
      path:'/statisticsMgt/history',
      component: () => import('@/views/statisticsMgt/history'),
      meta:{title:'历史统计',icon:'list'}
    },
      { name:'topShow',
        path:'/statisticsMgt/topShow',
        component: () => import('@/views/statisticsMgt/topShow'),
        meta:{title:'小说榜单',icon:'list'}
      }
    ]
  },
  {
    path:'/materialMgt',
    name:'materialMgt',
    component:Layout,
    redirect:'/materialMgt/material',
    meta:{title:'素材管理',icon:'zip'},
    children:[
      { name:'showData',
        path:'/materialMgt/material',
        component: () => import('@/views/materialMgt/material'),
        meta:{title:'素材管理',icon:'zip'}
      }
    ]
  },
  {
    path:'/rolesMgt',
    name:'rolesMgt',
    component:Layout,
    redirect:'/rolesMgt/role',
    meta:{title:'权限管理',icon:'password'},
    children:[
      { name:'role',
        path:'/rolesMgt/role',
        component: () => import('@/views/rolesMgt/role'),
        meta:{title:'角色管理',icon:'list'}
      },
      { name:'user',
        path:'/rolesMgt/user',
        component: () => import('@/views/rolesMgt/user'),
        meta:{title:'用户管理',icon:'list'}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
