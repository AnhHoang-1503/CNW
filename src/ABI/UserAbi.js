import { contract, execute } from "./AbiConfig";

import { User } from "./Class";

/**
 * Lấy danh sách người dùng
 * @returns {User[]}
 */
async function getAllUsers() {
    var users = await contract.getAllUsers();

    users = users.map((user) => {
        return new User(user);
    });

    return users;
}

/**
 * Lấy thông tin người dùng hiện tại
 * @returns {User}
 */
async function getUser() {
    var user = await contract.getUser();

    return new User(user);
}

/**
 * Tạo người dùng mới
 * @param {string} name Tên người dùng
 */
async function createUser(name) {
    var tx = await contract.createUser(name);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Sửa thông tin người dùng hiện tại
 * @param {string} name Tên người dùng
 */
async function updateUser(name) {
    var tx = await contract.updateUser(name);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Xóa người dùng hiện tại
 */
async function deleteUser() {
    var tx = await contract.deleteUser();

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Lấy thông tin người dùng theo địa chỉ
 * @param {address} address Địa chỉ người dùng
 * @returns {User}
 */
async function getUserByAddress(address) {
    var user = await contract.getUserByAddress(address);

    return new User(user);
}

export default {
    /**
     * Lấy danh sách người dùng
     * @returns {User[]}
     */
    getAllUsers: async () => await execute(getAllUsers),
    /**
     * Lấy thông tin người dùng hiện tại
     * @returns {User}
     */
    getUser: async () => await execute(getUser),
    /**
     * Tạo người dùng mới
     * @param {string} name Tên người dùng
     */
    createUser: async (name) => await execute(createUser, [name]),
    /**
     * Sửa thông tin người dùng hiện tại
     * @param {string} name Tên người dùng
     */
    updateUser: async (name) => await execute(updateUser, [name]),
    /**
     * Xóa người dùng hiện tại
     */
    deleteUser: async () => await execute(deleteUser),
    /**
     * Lấy thông tin người dùng theo địa chỉ
     * @param {address} address Địa chỉ người dùng
     * @returns {User}
     */
    getUserByAddress: async (address) =>
        await execute(getUserByAddress, [address]),
};
