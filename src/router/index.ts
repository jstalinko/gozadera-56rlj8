import { createRouter, createWebHistory } from "@ionic/vue-router";

import { RouteRecordRaw } from "vue-router";
import TabsLayout from '@/views/home/TabsLayout.vue';


const isAuthenticated: boolean = true; // demo 


const routes: Array<RouteRecordRaw> = [
  /* -------------------------------- Root Path ------------------------------- */
  {
    path: "/",
    redirect: "/home/",
  },
  /* ---------------------------------- AUTH ---------------------------------- */
  {
    path: "/auth/",
    component: () => import("@/views/auth/AuthLayout.vue"),
    children: [
      {
        path: "",
        redirect: "login",
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/auth/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/auth/Register.vue"),
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: () => import("@/views/auth/ForgotPassword.vue"),
      },
    ],
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
        name: "Home",
        component: () => import('@/views/home/Index.vue')
      },
      {
        path: "restaurant",
        component: () => import("@/views/home/Restaurant.vue"),
      },
      {
        path: "myqr",
        component: () => import("@/views/home/MyQr.vue"),
      },
      {
        path: 'redeem',
        component: () => import('@/views/home/Redeem.vue')
      },
      {
        path: "profile",
        component: () => import('@/views/home/Profile.vue')
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
        component: () => import("@/views/another/AnotherPages.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let guestGuardRouteNamed = ["Login", "Register", "ForgotPassword"];
  let targetToRoute: any = to.name;
  if (isAuthenticated) {
    if (guestGuardRouteNamed.includes(targetToRoute)) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    if (guestGuardRouteNamed.includes(targetToRoute)) {
      next();
    } else {
      next({ name: "Login" });
    }
  }
});
export default router;
