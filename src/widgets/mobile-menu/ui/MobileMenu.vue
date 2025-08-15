<script setup>
import { watch, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { LogoIcon, CloseIcon } from "@/shared/icons";
import { useMenuStore } from "@/entities/menu-store";
import { useModalStore } from "@/entities/modal-store";

import { links } from "@/shared/config";
import { TelegramIcon } from "@/shared/icons";
import { WhatsappIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";

const menu = useMenuStore();
const modal = useModalStore();
const router = useRoute();

watch(router, () => {
  menu.isActive ? menu.handleOpenMenu() : null;
});
const headerData = ref([]);

const { data, error } = await useAsyncData("mobile-menu-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/tech/");

    return {
      headerData: response.ROOT.CONTENT,
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { headerData: {} };
  }
});

headerData.value = data.value.headerData;
</script>

<template>
  <div
    @click="menu.handleOpenMenu"
    :class="menu.isActive ? 'active' : ''"
    class="mobile-menu"
  >
    <button class="close-btn" @click="menu.handleOpenMenu">
      <CloseIcon />
    </button>
    <div @click.stop class="mobile-menu__content">
      <div class="top">
        <NuxtLink to="/">
          <LogoIcon />
        </NuxtLink>
      </div>
      <div class="center">
        <nav>
          <NuxtLink
            :to="link['Ссылка']"
            v-for="(link, index) in headerData['Меню']"
            :key="index"
            :class="router.fullPath === link['Ссылка'] ? 'active' : ''"
          >
            {{ link["Название"] }}
          </NuxtLink>
        </nav>
      </div>
      <div class="bottom">
        <a :href="`tel:${headerData['Телефон']}`">{{
          headerData["Телефон"]
        }}</a>
        <div class="socials">
          <a :href="headerData['Телеграм']" target="_blank" class="social tg">
            <TelegramIcon />
          </a>
          <a :href="headerData['Whatsapp']" target="_blank" class="social wa">
            <WhatsappIcon />
          </a>
        </div>
        <Button variable="outline" :click="modal.handleOpenQuestionModal">
          Консультация</Button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.mobile-menu.active {
  background: rgba(69, 64, 61, 0.8);
  pointer-events: all;
  .close-btn {
    opacity: 1;
  }
  .mobile-menu__content {
    transform: translateX(0);
  }
}
.mobile-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(69, 64, 61, 0);
  z-index: 120;
  pointer-events: none;
  transition: var(--trs-300);

  .close-btn {
    position: absolute;
    top: 18px;
    right: 21px;
    opacity: 0;
    pointer-events: none;
    svg {
      stroke: var(--white-color);
    }
  }
  .mobile-menu__content {
    background: var(--bg-color);
    width: 50vw;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: translateX(-100%);
    transition: var(--trs-300);
    @media (max-width: $tab-sm) {
      width: 75vw;
    }
    .top {
      a {
        width: 75px;
        height: 75px;
        display: block;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    .center {
      nav {
        display: flex;
        flex-direction: column;
        gap: 30px;
        a {
          font-weight: 500;
          font-size: 18px;
          line-height: 19px;
          font-family: "Golos", sans-serif;
          color: var(--text-color);
          text-transform: uppercase;
        }
      }
    }
    .bottom {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 20px;
      justify-content: space-between;
      padding-top: 20px;
      border-top: 1px solid var(--text-color);
      a {
        font-weight: 400;
        font-size: 18px;
        line-height: 18px;
        color: var(--text-color);
        font-family: "Golos", sans-serif;
      }
      .socials {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      & > button {
        width: 100%;
      }
    }
  }
}
</style>
