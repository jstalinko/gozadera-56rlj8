import { createRouter, createWebHistory } from '@ionic/vue-router';

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  /* -------------------------------- Root Path ------------------------------- */
  {
    path: '/',
    redirect: '/home/',
  },

  /* ---------------------------------- Home ---------------------------------- */
  {
    path: '/home/',
    component: () => import("@/views/home/TabsLayout.vue"),
    children: [
      {
        path: '',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: 'restaurant',
        component: () => import('@/views/home/Restaurant.vue')
      },
      {
        path: 'myqr',
        component: () => import('@/views/home/MyQr.vue')
      },
      {
        path: 'redeem',
        component: () => import('@/views/home/Redeem.vue')
      }
    ]
  },
  /* --------------------------------- Another -------------------------------- */
  {
    path: "/another",
    children: [
      {
        path: "",
        component: () => import("@/views/another/AnotherPages.vue")
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
