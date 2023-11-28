<script setup>
import { useABIStore } from '../stores/ABI'
import { onMounted } from 'vue'

const abiStore = useABIStore()

onMounted(() => {
  // abiStore.init()
})
</script>

<template>
  <div class="about">
    <h1 @click="abiStore.getAllUsers()">get all</h1>
    <h1 @click="abiStore.getUser()">get</h1>
    <h1 @click="abiStore.createUser('created2')">create</h1>
    <h1 @click="abiStore.updateUser('updated2')">update</h1>
    <h1 @click="abiStore.deleteUser()">delete</h1>
    <h1 @click="abiStore.getCourses()">getCourses</h1>
    <h1 @click="abiStore.createCourse('name', 'description')">createCourse</h1>
    <h1 @click="abiStore.createCard('テスト', 'meaning', 'example')">createCard</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
