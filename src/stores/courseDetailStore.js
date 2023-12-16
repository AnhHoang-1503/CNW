import { defineStore } from "pinia";
import { ref } from "vue";

export const useCourseDetailStore = defineStore("courseDetail", () => {
    const isOwner = ref(false);
    const course = ref({ course: {}, cards: [] });
    const isOpenAddCard = ref(true);

    return { isOwner, course, isOpenAddCard };
});
