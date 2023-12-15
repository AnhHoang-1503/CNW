<script setup>
import { ref, watch, onMounted } from "vue";
import Search from "../components/Search.vue";
import ListCourses from "../components/ListCourses.vue";
import { useHomeStore } from "../stores/homeStore";

const homeStore = useHomeStore();
const search = ref("");
const listCourses = ref([]);

onMounted(async () => {
    if (!homeStore.myCourses.length > 0) {
        listCourses.value = await homeStore.GetMyCourses();
    } else {
        listCourses.value = homeStore.myCourses;
    }
});

watch(search, (value) => {
    value = value.trim().toLowerCase();
    listCourses.value = homeStore.myCourses.filter((course) => {
        return course.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
            course.description
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            ? true
            : false;
    });
});
</script>

<template>
    <div>
        <div class="course_view">
            <div class="search">
                <Search
                    v-model:search="search"
                    :blueStyle="true"
                    :height="50"
                    :width="900"
                    :placeholder="'Tìm kiếm khoá học của tôi'"
                />
            </div>
            <div class="title">khoá học của tôi</div>
            <div class="list_courses">
                <ListCourses :listCourses="listCourses" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.course_view {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    justify-content: center;
    align-items: center;
}

.search {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

.title {
    color: var(--primary-color);
    font-size: 22px;
    width: 1200px;
    margin-top: 24px;
    margin-bottom: 8px;
    padding-left: 4px;
}
</style>
