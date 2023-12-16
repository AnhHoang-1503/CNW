<script setup>
import { ref, watch, onMounted } from "vue";
import Search from "../components/Search.vue";
import ListCourses from "@/components/ListCourses.vue";
import { useHomeStore } from "../stores/homeStore";
import AddCourse from "../components/AddCourse.vue";

const homeStore = useHomeStore();
const search = ref("");
const listCourses = ref([]);
const openAddCourse = ref(false);

onMounted(async () => {
    if (!homeStore.myCourses.length > 0) {
        await loadListCourse();
    } else {
        listCourses.value = homeStore.myCourses;
    }
});

async function loadListCourse() {
    listCourses.value = await homeStore.getMyCourses();
}

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
            <div class="tool">
                <div class="search">
                    <Search
                        v-model:search="search"
                        :blueStyle="true"
                        :height="50"
                        :width="900"
                        :placeholder="'Tìm kiếm khoá học của tôi'"
                    />
                </div>
                <div class="add_course">
                    <button class="add_button" @click="openAddCourse = true">
                        Thêm khoá học mới
                    </button>
                </div>
            </div>
            <div class="title">khoá học của tôi</div>
            <div class="list_courses">
                <ListCourses :listCourses="listCourses" />
            </div>
        </div>
        <Teleport to="body">
            <AddCourse
                v-if="openAddCourse"
                @add_course="loadListCourse()"
                @cancel="openAddCourse = false"
            />
        </Teleport>
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

.tool {
    display: flex;
    margin-top: 16px;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}

.add_button {
    outline: none;
    border: none;
    background-color: var(--primary-color);
    color: #fff;
    padding: 12px 24px;
    border-radius: 15px;
    font-size: 16px;
    cursor: pointer;
}

.add_button:hover {
    background-color: #4b8edb;
}

.add_button:active {
    background-color: #2e5f8e;
}

.search {
    display: flex;
    justify-content: center;
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
