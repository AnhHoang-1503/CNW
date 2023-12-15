import { defineStore } from "pinia";
import { ref } from "vue";
import CourseAbi from "../ABI/CourseAbi";
import UserAbi from "../ABI/UserAbi";

export const useHomeStore = defineStore("home", () => {
    const listCourses = ref([]);
    const myCourses = ref([]);

    async function GetAllCourses() {
        try {
            listCourses.value = await CourseAbi.getCourses();
        } catch (e) {
            console.log(e);
        }
        for (let i = 0; i < 10; i++) {
            let course = { ...listCourses.value[0] };
            course.name = i + 1;
            listCourses.value.push(course);
        }
        return listCourses.value;
    }

    async function GetMyCourses() {
        try {
            const userAddress = await UserAbi.getUserAddress();
            console.log(userAddress);
            myCourses.value = await CourseAbi.getCoursesByAuthor(userAddress);
        } catch (e) {
            console.log(e);
        }
        for (let i = 0; i < 10; i++) {
            let course = { ...myCourses.value[0] };
            course.name = i + 1;
            myCourses.value.push(course);
        }
        return myCourses.value;
    }

    return { listCourses, GetAllCourses, myCourses, GetMyCourses };
});
