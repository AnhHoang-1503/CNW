<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { limitText } from "@/helper/helper.js";

const router = useRouter();
const route = useRoute();

const props = defineProps({
    listCourses: {
        type: Array,
        default: [],
    },
});

function openCourse(course) {
    router.push(`${route.path}/${course.id}`);
}
</script>

<template>
    <div>
        <div class="container">
            <div class="list_course">
                <div class="course" v-for="(course, index) in listCourses">
                    <div class="course_left">
                        <div
                            class="img"
                            :style="{
                                backgroundImage: `url(/store/${course.img})`,
                            }"
                        ></div>
                        <div class="name_and_description">
                            <div class="name">
                                {{ limitText(course.name, 40) }}
                            </div>
                            <div class="description">
                                {{ limitText(course.description, 60) }}
                            </div>
                        </div>
                    </div>
                    <div class="course_right">
                        <div class="button" @click="openCourse(course)">Mở</div>
                    </div>
                </div>
                <div class="blank_list" v-if="listCourses.length <= 0">
                    Không có khoá học phù hợp
                </div>
            </div>
            <div class="more_button"></div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 1200px;
    border: 1px solid var(--primary-color);
    border-radius: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 40px;
    padding-bottom: 30px;
    padding-right: 20px;
}

.list_course {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 40px;
    max-height: calc(100px * 5 + 40px * 4);
    overflow-y: auto;
    padding: 4px 0;
    padding-right: 20px;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-thumb {
    background: #d3e7f2;
    border-radius: 999999999px;
}

.course {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    flex: 0 0 100px;
    border-radius: 15px;
    background-color: #e0eef7;
    padding: 0 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
    cursor: pointer;
}

.course:hover {
    border: 1px solid #3b82f6;
    background-color: #d3e7f2;
}

.course_left {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
}

.img {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 72px;
    width: 140px;
    border-radius: 10px;
}

.name_and_description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 5px;
}

.name {
    font-size: 18px;
    font-weight: 600;
    color: #3b82f6;
}

.description {
    font-size: 18px;
    font-weight: 400;
    color: #4b8edb;
}

.button {
    width: 120px;
    height: 50px;
    background-color: #cae4f3;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #3b82f6;
    color: #3b82f6;
}

.button:hover {
    background-color: #b3d6f2;
}

.button:active {
    background-color: #a0c9f1;
}

.more_button {
    background: url("@/assets/icons/expand.svg") no-repeat 0 0;
    width: 12px;
    height: 7px;
    transform: scale(3) scaleX(1.5);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.more_button:hover {
    transform: scale(3) scaleX(1.5) translateY(-1px);
}

.more_button:active {
    transform: scale(3) scaleX(1.5) translateY(0px);
}

.blank_list {
    font-size: 24px;
    color: var(--primary-color);
}
</style>
