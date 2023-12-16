import { defineStore } from "pinia";
import { ref } from "vue";
import CourseAbi from "../ABI/CourseAbi";
import UserAbi from "../ABI/UserAbi";
import CardAbi from "../ABI/CardAbi";

export const useHomeStore = defineStore("home", () => {
    const listCourses = ref([]);
    const myCourses = ref([]);
    const currentCourse = ref({});
    const isLoading = ref(false);

    async function GetAllCourses() {
        try {
            listCourses.value = await CourseAbi.getCourses();
            for (let i = 0; i < 10; i++) {
                let course = { ...listCourses.value[0] };
                course.name = i + 1;
                listCourses.value.push(course);
            }
            return listCourses.value;
        } catch (e) {
            console.log(e);
        }
    }

    async function GetMyCourses() {
        try {
            const userAddress = await UserAbi.getUserAddress();
            myCourses.value = await CourseAbi.getCoursesByAuthor(userAddress);
            for (let i = 0; i < 10; i++) {
                let course = { ...myCourses.value[0] };
                course.name = i + 1;
                myCourses.value.push(course);
            }
            return myCourses.value;
        } catch (e) {
            console.log(e);
        }
    }

    async function GetCourseById(id) {
        try {
            if (!listCourses.value.length > 0) {
                await GetAllCourses();
            }
            let course = listCourses.value.find((course) => course.id == id);
            let cards = await CardAbi.getCardsByCourse(course.id);
            currentCourse.value = { course, cards };
            return currentCourse.value;
        } catch (e) {
            console.log(e);
        }
    }

    return {
        listCourses,
        GetAllCourses,
        myCourses,
        GetMyCourses,
        GetCourseById,
    };
});
