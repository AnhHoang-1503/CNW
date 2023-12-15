import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/courses",
            name: "courses",
            component: () => import("../views/CourseView.vue"),
        },
        {
            path: "/mycourses",
            name: "mycourses",
            component: () => import("../views/MyCourseView.vue"),
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("../views/HomeView.vue"),
        },
    ],
});

export default router;
