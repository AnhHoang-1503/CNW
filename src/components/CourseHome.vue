<template>
    <div>
        <div class="container" @click="openCourse()">
            <div
                class="img"
                :style="{
                    backgroundImage: `url(/store/${course.img})`,
                }"
            ></div>
            <div class="name">{{ limitText(course.name, 30) }}</div>
            <div class="description">
                {{ limitText(course.description, 30) }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { limitText } from "@/helper/helper.js";
const props = defineProps({
    course: {
        type: Object,
        default: () => {},
    },
});

const router = useRouter();
function openCourse() {
    router.push(`/courses/${props.course.id}`);
}
</script>

<style scoped>
.container {
    cursor: pointer;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    background-color: #fff;
    border-radius: 15px;
    color: var(--primary-color);
    padding-bottom: 12px;
}

.name {
    font-weight: 700;
}

.description {
    color: #4b8edb;
}
.img {
    width: 300px;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 15px 15px 0 0;
}
</style>
