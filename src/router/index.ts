import { createRouter, createWebHistory } from '@ionic/vue-router';

import { RouteRecordRaw } from 'vue-router';
import TabsLayout from '@/views/home/TabsLayout.vue';

const routes: Array<RouteRecordRaw> = [
  /* -------------------------------- Root Path ------------------------------- */
  {
    path: '/',
    redirect: '/home/',
  },

  /* ---------------------------------- Home ---------------------------------- */
  {
    path: '/home/',
    component: TabsLayout,
    children: [
      {
        path: '',
        redirect: "/home/index"
      },
      {
        path: 'index',
        component: () => import('@/views/home/Index.vue')
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
      },
      {
        path: "profile",
        component: () => import('@/views/home/Redeem.vue')
      }
    ]
  },
  /* --------------------------------- Another -------------------------------- */
  {
    path: "/another",
    component: () => import("@/views/another/AnotherLayout.vue"),
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
