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
    const userAddress = ref("");

    async function getAllCourses() {
        try {
            var list = await CourseAbi.getCourses();
            listCourses.value = list.reverse();
            return listCourses.value;
        } catch (e) {
            console.log(e);
        }
    }

    async function getMyCourses() {
        try {
            if (userAddress.value == "") {
                await getUserAddress();
            }
            var list = await CourseAbi.getCoursesByAuthor(userAddress.value);
            myCourses.value = list.reverse();
            return myCourses.value;
        } catch (e) {
            console.log(e);
        }
    }

    async function getCourseById(id) {
        try {
            if (!listCourses.value.length > 0) {
                await getAllCourses();
            }
            let course = listCourses.value.find((course) => course.id == id);
            let cards = await CardAbi.getCardsByCourse(course.id);
            cards = cards.reverse();
            currentCourse.value = { course, cards };
            return currentCourse.value;
        } catch (e) {
            console.log(e);
        }
    }

    async function createCard(word, meaning, example, img, courseId) {
        try {
            await CardAbi.createCard(word, meaning, example, courseId, img);
        } catch (error) {
            console.log(error);
        }
    }

    async function createCourse(name, description, img) {
        try {
            await CourseAbi.createCourse(name, description, img);
        } catch (error) {
            console.log(error);
        }
    }

    async function getUserAddress() {
        try {
            userAddress.value = await UserAbi.getUserAddress();
            return userAddress.value;
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteCourse(id) {
        try {
            await CourseAbi.deleteCourse(id);
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteCard(id) {
        try {
            await CardAbi.deleteCard(id);
        } catch (e) {
            console.log(e);
        }
    }

    return {
        listCourses,
        getAllCourses,
        myCourses,
        getMyCourses,
        getCourseById,
        createCard,
        createCourse,
        getUserAddress,
        userAddress,
        deleteCourse,
        deleteCard,
    };
});
