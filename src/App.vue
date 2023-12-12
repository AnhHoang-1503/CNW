<script setup>
import cardAbi from "./ABI/CardAbi";
import courseAbi from "./ABI/CourseAbi";
import userAbi from "./ABI/UserAbi";
import { ref } from "vue";

const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const content = ref("");

async function clickEvent() {
    await cardAbi.addUserCard(BigInt(1));
    const res = await cardAbi.getUserCards();
    console.log(res);
}
</script>

<template>
    <div id="app">
        <div class="container">
            <button @click="clickEvent()">Button</button>
            <input type="text" v-model="input1" />
            <input type="text" v-model="input2" />
            <input type="text" v-model="input3" />
            <input type="text" v-model="input4" />
            <div class="p">{{ content }}</div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 12px;
}
</style>
