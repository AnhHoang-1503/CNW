<script setup>
import { useCourseDetailStore } from "../stores/courseDetailStore";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const courseDetailStore = useCourseDetailStore();

onMounted(async () => {
    await courseDetailStore.getCourse(BigInt(route.params.id));
    console.log(courseDetailStore.course);
});
</script>

<template>
    <div>
        <div class="container"></div>
    </div>
</template>

<style scoped></style>
