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

@keyframes route {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
