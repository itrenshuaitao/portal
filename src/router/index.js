import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [

      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: "首页",
          icon: 'icon-home',
        },
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/products/index.vue'),
        meta: {
          title: "产品",
          icon: 'icon-code',
        },

      }, {
        path: '/solution',
        name: 'Solution',
        component: () => import('@/views/solution/index.vue'),
        meta: {
          title: "解决方案",
          icon: 'icon-code',
        },
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@/components/detail.vue'),
        meta: {
          title: "案例详情",
          icon: 'icon-code',
        },
      }, {
        path: '/case',
        meta: {
          title: "案例分享",
          icon: 'icon-code',
        },
        children: [
          {
            name: 'Case',
            path: '',
            component: import('@/views/case/index.vue'),
          },
          {
            path: 'detail/:id',
            name: 'Detail',
            component: () => import('@/components/detail.vue'),
            meta: {
              title: "案例详情",
              icon: 'icon-code',
            },
          },
        ]
      }, {
        path: '/news',
        name: 'News',
        component: () => import('@/views/news/index.vue'),
        meta: {
          title: "新闻中心",
          icon: 'icon-code',
        },
      }, {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video/index.vue'),
        meta: {
          title: "视频中心",
          icon: 'icon-code',
        },
      }, {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: "关于友机",
          icon: 'icon-code',
        },
      }

    ],
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

router.afterEach((to, from, next) => {

  window.scrollTo(0, 0);
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
