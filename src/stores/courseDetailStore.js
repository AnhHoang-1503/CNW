import { defineStore } from "pinia";
import { ref } from "vue";
import { useHomeStore } from "./homeStore";

export const useCourseDetailStore = defineStore("courseDetail", () => {
    const isOwner = ref(false);
    const course = ref({ course: {}, cards: [] });
    const isOpenAddCard = ref(false);
    const homeStore = useHomeStore();

    async function getCourse(id) {
        course.value = { course: {}, cards: [] };
        course.value = await homeStore.getCourseById(id);
    }

    return { isOwner, course, isOpenAddCard, getCourse };
});
