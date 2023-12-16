<script setup>
import { ref } from "vue";
import { useCourseDetailStore } from "../stores/courseDetailStore";

const courseDetailStore = useCourseDetailStore();

const defaultImg = ref(`url(/store/upload.png)`);

const img = ref(null);

function handleUploadImg(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            img.value.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
}
</script>

<template>
    <div>
        <div class="container">
            <div class="content"></div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    place-items: center;
    background-color: #0000006a;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 101;
}

.content {
    width: 700px;
    background-color: #fff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #4b8edb;
}

.img {
    width: 100%;
    height: 250px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 1px 7px 18px -3px rgba(0, 0, 0, 0.75);
}
#img {
    visibility: hidden;
}
</style>
