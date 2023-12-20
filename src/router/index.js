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
            path: "/courses/:id",
            name: "course",
            component: () => import("../views/CourseDetailView.vue"),
        },
        {
            path: "/mycourses/:id",
            name: "mycourse",
            component: () => import("../views/CourseDetailView.vue"),
        },
        {
            path: "/study/:id",
            name: "study",
            component: () => import("../views/StudyView.vue"),
        },
        {
            path: "/practice/:id",
            name: "practice",
            component: () => import("../views/PracticeView.vue"),
        },
    ],
});

export default router;
