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
        meta: {
          title: "产品",
          icon: 'icon-code',
        },
        children: [
          {
            name: 'Products',
            path: '',
            component: () => import('@/views/products/index.vue'),
          },
          {
            path: 'detail/:id',
            name: 'ProductsDetail',
            component: () => import('@/views/products/detail.vue'),
            meta: {
              title: "产品详情",
              icon: 'icon-code',
            },
          },
        ]

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
        path: '/case',
        meta: {
          title: "案例分享",
          icon: 'icon-code',
        },
        children: [
          {
            name: 'Case',
            path: '',
            component: () => import('@/views/case/index.vue'),
          },
          {
            path: 'detail/:id',
            name: 'CaseDetail',
            component: () => import('@/views/case/detail.vue'),
            meta: {
              title: "案例详情",
              icon: 'icon-code',
            },
          },
        ]
      }, {
        path: '/news',
        meta: {
          title: "新闻中心",
          icon: 'icon-code',
        },
        children: [
          {
            name: 'News',
            path: '',
            component: () => import('@/views/news/index.vue'),
          },
          {
            path: 'detail/:id',
            name: 'NewsDetail',
            component: () => import('@/views/news/detail.vue'),
            meta: {
              title: "产品详情",
              icon: 'icon-code',
            },
          },
        ]
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

        children: [{
          name: 'About',
          path: '',
          component: () => import('@/views/about/index.vue'),
          meta: {
            title: "关于友机",
            icon: 'icon-code',
          },
        },
        {
          name: 'Recruit',
          path: 'recruit',
          component: () => import('@/views/about/recruit.vue'),
          meta: {
            title: "人才招聘",
            icon: 'icon-code',
          },
        },
        {
          name: 'Contact',
          path: 'contact',
          component: () => import('@/views/about/contact.vue'),
          meta: {
            title: "联系我们",
            icon: 'icon-code',
          },
        },
        ]
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
