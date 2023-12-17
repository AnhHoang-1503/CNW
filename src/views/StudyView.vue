<script setup>
import { useCourseDetailStore } from "../stores/courseDetailStore";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Icons from "../components/Icons.vue";
import { limitText } from "@/helper/helper.js";
import { RouterLink } from "vue-router";

const route = useRoute();
const courseDetailStore = useCourseDetailStore();
const flip = ref(false);
const currentCardIndex = ref(0);
const cardBox = ref(null);

onMounted(async () => {
    await courseDetailStore.getCourse(BigInt(route.params.id));
    console.log(courseDetailStore.course);
});

function flipCard() {
    if (flip.value) {
        cardBox.value.classList.add("flip-right");
    } else {
        cardBox.value.classList.add("flip-left");
    }

    setTimeout(() => {
        flip.value = !flip.value;
    }, 200);

    setTimeout(() => {
        cardBox.value.classList.remove("flip-right");
        cardBox.value.classList.remove("flip-left");
    }, 400);
}

function nextCard() {
    flip.value = false;
    if (currentCardIndex.value < courseDetailStore.course.cards.length - 1) {
        currentCardIndex.value++;
    } else {
        currentCardIndex.value = 0;
    }
}

function previousCard() {
    flip.value = false;
    if (currentCardIndex.value > 0) {
        currentCardIndex.value--;
    } else {
        currentCardIndex.value = courseDetailStore.course.cards.length - 1;
    }
}
</script>

<template>
    <div>
        <div class="container">
            <div class="title">
                <div class="p">
                    {{ courseDetailStore.course.course.name }}
                </div>
                <RouterLink
                    class="practice"
                    :to="`/practice/${courseDetailStore.course.course.id}`"
                    >Luyện tập</RouterLink
                >
            </div>
            <div class="icon">
                <Icons icon="icon_flashcard" :size="28" />
                <p>flashcards</p>
            </div>
            <div class="card_box" @click="flipCard()" ref="cardBox">
                <div class="unflip" v-if="!flip">
                    <div class="word">
                        {{
                            courseDetailStore.course.cards[currentCardIndex] !=
                            undefined
                                ? courseDetailStore.course.cards[
                                      currentCardIndex
                                  ].word
                                : ""
                        }}
                    </div>
                    <div class="text">Bấm để lật</div>
                </div>
                <div class="flip" v-if="flip">
                    <div class="meaning">
                        {{
                            courseDetailStore.course.cards[currentCardIndex] !=
                            undefined
                                ? courseDetailStore.course.cards[
                                      currentCardIndex
                                  ].meaning
                                : ""
                        }}
                    </div>
                    <div class="example">
                        {{
                            courseDetailStore.course.cards[currentCardIndex] !=
                            undefined
                                ? limitText(
                                      courseDetailStore.course.cards[
                                          currentCardIndex
                                      ].example,
                                      60
                                  )
                                : ""
                        }}
                    </div>
                    <div class="text">Bấm để lật</div>
                </div>
            </div>
            <div class="button">
                <div class="button_left" @click="previousCard()">
                    <Icons icon="icon_left" :size="28" />
                </div>
                <div class="current_card">
                    {{
                        `${currentCardIndex + 1}/${
                            courseDetailStore.course.cards.length
                        }`
                    }}
                </div>
                <div class="button_right" @click="nextCard()">
                    <Icons icon="icon_right" :size="28" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.practice {
    width: 200px;
    height: 40px;
    background-color: var(--primary-color);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
}

.practice:hover {
    background-color: #2563eb;
}

.practice:active {
    background-color: #1d4ed8;
}

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
}

.title {
    font-size: 30px;
    font-weight: 700;
    color: var(--primary-color);
    width: 900px;
    display: flex;
    justify-content: space-between;
}

.icon {
    margin-top: 30px;
    width: 300px;
    height: 40px;
    background-color: var(--primary-color);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
}

.card_box {
    width: 900px;
    height: 500px;
    background-color: #c6e1f1;
    border-radius: 15px;
    display: grid;
    place-items: center;
    font-size: 20px;
    font-weight: 500;
    margin-top: 30px;
    cursor: pointer;
    padding: 50px;
}

.unflip {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    position: relative;
}

.word {
    font-size: 130px;
    font-weight: 700;
}

.unflip .text {
    position: absolute;
    bottom: 20px;
    font-size: 40px;
    font-weight: 500;
}

.flip {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    position: relative;
    font-size: 40px;
}

.flip .text {
    position: absolute;
    bottom: 20px;
    font-size: 40px;
    font-weight: 500;
}
.button {
    margin-top: 30px;
    font-size: 32px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.button_left,
.button_right {
    cursor: pointer;
}

.flip-left {
    animation: flip-left 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}

.flip-right {
    animation: flip-right 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}

@keyframes flip-right {
    0% {
        transform: rotateY(180deg);
    }
    100% {
        transform: rotateY(0);
    }
}

@keyframes flip-left {
    0% {
        transform: rotateY(-180deg);
    }
    100% {
        transform: rotateY(0);
    }
}
</style>
