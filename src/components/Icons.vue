<script setup>
defineProps({
    icon: {
        type: String,
        default: "",
    },
    size: {
        type: Number,
        default: 24,
    },
});
</script>

<template>
    <div>
        <div class="icon" :class="icon"></div>
    </div>
</template>

<style scoped>
.icon {
    width: v-bind("size + 'px'");
    height: v-bind("size + 'px'");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.icon_search {
    background-image: url("@/assets/icons/search_icon.svg");
}

.icon_delete {
    background-image: url("@/assets/icons/delete.svg");
}

.icon_loading {
    background-image: url("@/assets/icons/loading.svg");
    animation: route 3s infinite linear;
}

.icon_warning {
    background-image: url("@/assets/icons/warning.svg");
    background-size: contain;
}

.icon_flashcard {
    background-image: url("@/assets/icons/flashcard.png");
    transform: rotate(-90deg) scaleY(-1);
    filter: invert(100%) sepia(45%) saturate(174%) hue-rotate(137deg)
        brightness(112%) contrast(100%);
}

.icon_left {
    background-image: url("@/assets/icons/right.svg");
    transform: rotate(180deg);
}

.icon_right {
    background-image: url("@/assets/icons/right.svg");
}

.icon_practice {
    background-image: url("@/assets/icons/practice.png");
    filter: invert(100%) sepia(45%) saturate(174%) hue-rotate(137deg)
        brightness(112%) contrast(100%);
}

@keyframes route {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
