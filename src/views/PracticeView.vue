<script setup>
import { useCourseDetailStore } from "../stores/courseDetailStore";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Icons from "../components/Icons.vue";
import { limitText, randomText } from "@/helper/helper.js";
import { RouterLink } from "vue-router";

const route = useRoute();
const courseDetailStore = useCourseDetailStore();
const flip = ref(false);
const currentCardIndex = ref(0);
const cardBox = ref(null);
const meaningList = ref([]);
const correctAnswer = ref(null);

onMounted(async () => {
    await courseDetailStore.getCourse(BigInt(route.params.id));
    console.log(courseDetailStore.course);
    getMeaningList();
});

function nextCard() {
    flip.value = false;
    if (currentCardIndex.value < courseDetailStore.course.cards.length - 1) {
        currentCardIndex.value++;
    } else {
        currentCardIndex.value = 0;
    }
    getMeaningList();
}

function previousCard() {
    flip.value = false;
    if (currentCardIndex.value > 0) {
        currentCardIndex.value--;
    } else {
        currentCardIndex.value = courseDetailStore.course.cards.length - 1;
    }
    getMeaningList();
}

function getMeaningList() {
    meaningList.value = [
        courseDetailStore.course.cards[currentCardIndex.value].meaning,
        randomText(),
        randomText(),
        randomText(),
    ];
    meaningList.value.sort(() => Math.random() - 0.5);

    document.querySelector(".correct")?.classList.remove("correct");
    document.querySelectorAll(".wrong")?.forEach((item) => {
        item.classList.remove("wrong");
    });
}

function clickOption(option, event) {
    if (
        option == courseDetailStore.course.cards[currentCardIndex.value].meaning
    ) {
        event.target.classList.add("correct");
    } else {
        event.target.classList.add("wrong");
        correctAnswer.value[0].classList.add("correct");
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
                    class="study"
                    :to="`/study/${courseDetailStore.course.course.id}`"
                    >Học khoá học</RouterLink
                >
            </div>
            <div class="icon">
                <Icons icon="icon_practice" :size="28" />
                <p>luyện tập</p>
            </div>
            <div class="card_box" ref="cardBox">
                <div class="word">
                    {{
                        courseDetailStore.course.cards[currentCardIndex] !=
                        undefined
                            ? courseDetailStore.course.cards[currentCardIndex]
                                  .word
                            : ""
                    }}
                </div>
                <div class="meaning_list">
                    <div
                        class="option"
                        v-for="option in meaningList"
                        @click="clickOption(option, $event)"
                        :ref="
                            option ==
                            courseDetailStore.course.cards[currentCardIndex]
                                .meaning
                                ? 'correctAnswer'
                                : ''
                        "
                    >
                        {{ option }}
                    </div>
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
.meaning_list {
    width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    height: calc(100% - 60px);
    padding: 60px 30px;
    place-items: center;
}
.option {
    width: 380px;
    height: 130px;
    background-color: #9ecde8;
    border-radius: 15px;
    display: grid;
    place-items: center;
    color: var(--primary-color);
    font-size: 26px;
    cursor: pointer;
    box-shadow: 1px 7px 18px -3px rgba(0, 0, 0, 0.75);
}

.wrong {
    background-color: #fca5a5;
}

.correct {
    background-color: #81e796;
}

.option:hover {
    background-color: #9fc5db;
}

.wrong:hover {
    background-color: #fca5a5;
}

.correct:hover {
    background-color: #81e796;
}

.word {
    width: 100%;
    background-color: var(--primary-color);
    color: #fff;
    height: 60px;
    font-size: 32px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px 15px 0 0;
}
.study {
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

.study:hover {
    background-color: #2563eb;
}

.study:active {
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

.card_box {
    width: 900px;
    height: 500px;
    background-color: #c6e1f1;
    margin-top: 30px;
    border-radius: 15px;
}
</style>
