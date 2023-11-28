import { defineStore } from 'pinia'
import UserAbi from '../ABI/UserAbi'
import CardAbi from '../ABI/CardAbi'
import CourseAbi from '../ABI/CourseAbi'

export const useABIStore = defineStore('ABI', () => {
  async function getAllUsers() {
    const users = await UserAbi.getAllUsers()
    console.log(users)
    return users
  }

  async function getUser() {
    var user = await UserAbi.getUser()

    console.log(user)
    return user
  }

  async function createUser(name) {
    await UserAbi.createUser(name)
    await getAllUsers()
  }

  async function updateUser(name) {
    await UserAbi.updateUser(name)
    await getAllUsers()
  }

  async function deleteUser() {
    await UserAbi.deleteUser()
    await getAllUsers()
  }

  async function getUserByAddress(address) {
    const user = await UserAbi.getUserByAddress(address)
    return user
  }

  async function createCourse(name, description) {
    await CourseAbi.createCourse(name, description)
  }

  var courses = []

  async function getCourses() {
    courses = await CourseAbi.getCourses()
    console.log(courses)
    return courses
  }

  async function createCard(word, meaning, example) {
    await CardAbi.createCard(word, meaning, example, courses[0].id)
    const cards = await CardAbi.getCardsByCourse(courses[0].id)

    console.log(cards)
  }

  return {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserByAddress,
    createCourse,
    getCourses,
    createCard
  }
})
