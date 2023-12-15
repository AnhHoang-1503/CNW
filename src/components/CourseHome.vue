<template>
    <div>
        <div class="container">
            <div
                class="img"
                :style="{
                    backgroundImage: `url(/store/${course.img})`,
                }"
            ></div>
            <div class="name">{{ course.name }}</div>
            <div class="description">{{ course.description }}</div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    course: {
        type: Object,
        default: () => {},
    },
});
</script>

<style scoped>
.container {
    cursor: pointer;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    background-color: #fff;
    border-radius: 15px;
    color: var(--primary-color);
    padding-bottom: 12px;
}

.name {
    font-weight: 700;
}

.description {
    color: #4b8edb;
}
.img {
    width: 300px;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 15px 15px 0 0;
}
</style>
