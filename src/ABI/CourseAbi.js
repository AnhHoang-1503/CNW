import { contract, execute } from "./AbiConfig";

import { Course } from "./Class";

/**
 * Lấy danh sách toàn bộ khóa học
 * @returns {Course[]} Danh sách khóa học
 */
async function getCourses() {
    var courses = await contract.getCourses();

    courses = courses.map((course) => {
        return new Course(course);
    });

    return courses;
}

/**
 * Lấy danh sách khóa học theo tác giả
 * @param {address} author Tác giả
 * @returns {Course[]} Danh sách khóa học
 */
async function getCoursesByAuthor(author) {
    var courses = await contract.getCoursesByAuthor(author);

    courses = courses.map((course) => {
        return new Course(course);
    });

    return courses;
}

/**
 * Tạo khóa học mới
 * @param {string} name Tên khóa học
 * @param {string} description Nội dung khóa học
 */
async function createCourse(name, description) {
    var tx = await contract.createCourse(name, description);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Chỉnh sửa khóa học
 * @param {string} id Id khóa học
 * @param {string} name Tên khóa học
 * @param {string} description Nội dung khóa học
 */
async function updateCourse(id, name, description) {
    var tx = await contract.updateCourse(id, name, description);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Xóa khóa học
 * @param {string} id Id khóa học
 */
async function deleteCourse(id) {
    var tx = await contract.deleteCourse(id);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

export default {
    /**
     * Lấy danh sách toàn bộ khóa học
     * @returns {Course[]} Danh sách khóa học
     */
    getCourses: async () => await execute(getCourses),
    /**
     * Lấy danh sách khóa học theo tác giả
     * @param {address} author Tác giả
     * @returns {Course[]} Danh sách khóa học
     */
    getCoursesByAuthor: async (author) =>
        await execute(getCoursesByAuthor, [author]),
    /**
     * Tạo khóa học mới
     * @param {string} name Tên khóa học
     * @param {string} description Nội dung khóa học
     */
    createCourse: async (name, description) =>
        await execute(createCourse, [name, description]),
    /**
     * Chỉnh sửa khóa học
     * @param {string} id Id khóa học
     * @param {string} name Tên khóa học
     * @param {string} description Nội dung khóa học
     */
    updateCourse: async (id, name, description) =>
        await execute(updateCourse, [id, name, description]),

    /**
     * Xóa khóa học
     * @param {string} id Id khóa học
     */
    deleteCourse: async (id) => await execute(deleteCourse, [id]),
};
