<script setup>
import Icons from "@/components/Icons.vue";
const props = defineProps({
    text: {
        type: String,
        default: "",
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(["cancel", "accept"]);
</script>

<template>
    <div>
        <div class="container">
            <div class="content">
                <div class="content_text">
                    <Icons icon="icon_warning" :size="36" />
                    <p>{{ text }}</p>
                </div>
                <div class="content_button">
                    <button class="button cancel" @click="$emit('cancel')">
                        Huỷ
                    </button>
                    <button class="button" @click="$emit('accept')">
                        <span v-if="!isLoading">Xác nhận</span>
                        <Icons
                            v-if="isLoading"
                            icon="icon_loading"
                            :size="24"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
}

.content_text {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: start;
    width: 100%;
}

.content_button {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.button {
    outline: none;
    border: none;
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 3px;
    font-size: 15px;
    cursor: pointer;
    height: 36px;
    padding: 0 12px;
}

.button:hover {
    background-color: #4b8edb;
}

.button:active {
    background-color: #2e5f8e;
}

.cancel {
    background-color: #fff;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.cancel:hover {
    background-color: #f2f2f2;
}

.cancel:active {
    background-color: #e6e6e6;
}
</style>
