<script setup>
import Icons from "./Icons.vue";

defineProps({
    search: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "Tìm kiếm",
    },
    width: {
        type: Number,
        default: 140,
    },
    height: {
        type: Number,
        default: 35,
    },
    expand: {
        type: Boolean,
        default: false,
    },
    blueStyle: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["update:search"]);
</script>

<template>
    <div>
        <div class="search">
            <div class="search_icon">
                <Icons icon="icon_search" :size="20" />
            </div>
            <input
                class="search_input"
                :class="blueStyle ? 'blue_style' : ''"
                type="text"
                :placeholder="placeholder"
                :value="search"
                @input="$emit('update:search', $event.target.value)"
            />
        </div>
    </div>
</template>

<style scoped>
.search {
    display: flex;
    position: relative;
}

.search_icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
}

.search_input {
    max-width: v-bind("width + 'px'");
    width: v-bind("width + 200 + 'px'");
    height: v-bind("height + 'px'");
    border-radius: 40px;
    border: none;
    outline: none;
    padding: 0 14px 0 46px;
    font-size: 16px;
    font-weight: 500;
    color: #3b82f6;
    transition: all 0.3s ease-in-out;
}

.search_input::placeholder {
    color: #3b82f6;
    font-weight: 500;
}

.search_input:focus {
    max-width: v-bind("expand ? width + 200 + 'px' : width + 'px'");
}

.blue_style {
    background-color: #e0eef7;
    color: #4b8edb;
}

.blue_style::placeholder {
    color: #4b8edb;
}
</style>
