<script setup>
import { onMounted, ref } from "vue";
import { useHomeStore } from "../stores/homeStore";
import CourseHome from "@/components/CourseHome.vue";
import Search from "../components/Search.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const homeStore = useHomeStore();
const search = ref("");

onMounted(async () => {
    if (!homeStore.listCourses.length > 0) {
        await homeStore.getAllCourses();
    }
});
</script>

<template>
    <main>
        <div class="home_view">
            <div class="banner"></div>
            <div class="container_bottom">
                <div class="search">
                    <Search
                        v-model:search="search"
                        :placeholder="'Tìm kiếm khoá học'"
                        :width="900"
                        :height="50"
                    />
                </div>
                <div class="courses_list">
                    <div class="course" v-for="course in homeStore.listCourses">
                        <CourseHome :course="course" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.home_view {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--primary-color);
    padding-bottom: 100px;
}

.banner {
    width: 100%;
    height: 900px;
    background: url("@/assets/imgs/banner.png") no-repeat center;
    background-size: cover;
}

.container_bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 54px;
    color: #fff;
    width: 100%;
}

.title {
    text-align: center;
}

.courses_list {
    padding: 0 150px;
    margin-top: 54px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 54px;
    width: 100%;
}

.course {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
