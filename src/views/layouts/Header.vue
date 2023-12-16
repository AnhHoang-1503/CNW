<script setup>
import { computed, reactive, ref } from "vue";
import Search from "../../components/Search.vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";

const route = useRouter();

const routeName = computed(() => route.currentRoute.value.name);

const search = ref("");
</script>

<template>
    <div>
        <div class="header">
            <div class="header_top">
                <div class="header_left">
                    <RouterLink to="/">Kanji Card</RouterLink>
                </div>
                <div class="header_right">
                    <div class="header_search">
                        <Search v-model:search="search" :expand="true" />
                    </div>
                    <RouterLink to="/profile">
                        <img
                            class="header_avatar"
                            src="@/assets/avatar/default_avatar.png"
                        />
                    </RouterLink>
                </div>
            </div>
            <div class="navbar">
                <RouterLink to="/" style="width: 73px"> trang chủ </RouterLink>
                <RouterLink
                    to="/courses"
                    style="width: 71px"
                    :class="routeName == 'course' ? 'link_active' : ''"
                    >khoá học</RouterLink
                >
                <RouterLink
                    to="/mycourses"
                    style="width: 127px"
                    :class="routeName == 'mycourse' ? 'link_active' : ''"
                    >khoá học của tôi</RouterLink
                >
                <RouterLink to="/profile" style="width: 45px">hồ sơ</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    width: 100%;
    background-color: transparent;
    position: fixed;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
}
.header_top {
    width: 100%;
    height: 60px;
    background-color: #3b82f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
}
.header_left {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 24px;
    color: #fff;
}
.header_right {
    display: flex;
    align-items: center;
    gap: 20px;
}
.header_avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: solid 1px #fff;
}

.navbar {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 40px;
    color: #3b82f6;
    gap: 20px;
    background: #ffffff05;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    text-shadow:
        2px 0 #fff,
        -2px 0 #fff,
        0 2px #fff,
        0 -2px #fff,
        1px 1px #fff,
        -1px -1px #fff,
        1px -1px #fff,
        -1px 1px #fff;
}

.navbar a {
    text-align: center;
}

.navbar .router-link-active {
    font-weight: 700;
}

.link_active {
    font-weight: 700;
}
</style>
