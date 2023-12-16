<script setup>
import { ref, onMounted } from "vue";
import Icons from "@/components/Icons.vue";
import { useCourseDetailStore } from "../stores/courseDetailStore";

const courseDetailStore = useCourseDetailStore();
const defaultImg = ref(`url(/store/upload.png)`);
const imgInput = ref(null);

const props = defineProps({
    card: {
        type: Object,
        default: {},
    },
});

onMounted(() => {
    console.log(props.card);
});
</script>

<template>
    <div>
        <div class="container">
            <div class="left">
                <div class="id">
                    <div
                        class="label"
                        :style="{
                            fontWeight: 700,
                        }"
                    >
                        Thẻ
                    </div>
                    <div class="value">{{ card.id }}</div>
                    <div class="delete" v-if="courseDetailStore.isOwner">
                        <Icons icon="icon_delete" :size="20" />
                    </div>
                </div>
                <div class="word">
                    <div class="label">Từ</div>
                    <div class="value">{{ card.word }}</div>
                </div>
                <div class="meaning">
                    <div class="label">Nghĩa</div>
                    <div class="value">{{ card.meaning }}</div>
                </div>
            </div>
            <div class="line"></div>
            <div class="right">
                <div class="example">
                    <div class="label">Ví dụ</div>
                    <div class="value">{{ card.example }}</div>
                </div>
                <div class="img_container">
                    <div
                        ref="img"
                        class="input_file img"
                        :style="{
                            backgroundImage: card.img
                                ? `url(/store/${card.img})`
                                : defaultImg,
                        }"
                        @click="imgInput.click()"
                    >
                        <input
                            ref="imgInput"
                            id="img"
                            :disabled="true"
                            type="file"
                            accept="image/*"
                            @change="handleUploadImg"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #f0faff;
    padding: 20px 25px 20px 40px;
    height: 220px;
    border-radius: 15px;
    box-shadow: 1px 12px 10px -6px rgba(209, 190, 190, 0.75);
    border: 1px solid #96d0eb;
    gap: 12px;
}

.left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    height: 100%;
    width: 30%;
}

.id {
    display: flex;
    align-items: end;
    width: 100%;
    gap: 4px;
}

.id .delete {
    cursor: pointer;
    margin-left: 12px;
}

.line {
    width: 1px;
    height: 90%;
    background-color: var(--primary-color);
    margin: 0 24px;
}

.label {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-color);
}

.value {
    font-size: 16px;
    font-weight: 700;
    color: var(--primary-color);
}

.img {
    width: 270px;
    height: 170px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 15px;
    box-shadow: 1px 12px 10px -6px rgba(209, 190, 190, 0.75);
}

#img {
    visibility: hidden;
}

.word,
.meaning,
.example {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.right {
    display: flex;
    justify-content: space-between;
    align-items: start;
    height: 100%;
    flex: 1;
}

.img_container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
