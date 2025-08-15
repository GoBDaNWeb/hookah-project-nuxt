<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { LogoIcon } from "@/shared/icons";
import { TelegramIcon } from "@/shared/icons";
import { WhatsappIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { useMenuStore } from "@/entities/menu-store";
import { useModalStore } from "@/entities/modal-store";
import { links } from "@/shared/config";
const active = ref(false);
const menu = useMenuStore();
const modal = useModalStore();
const router = useRoute();

const controlNavbar = () => {
  if (typeof window !== "undefined") {
    if (window.scrollY > 0) {
      active.value = true;
    } else {
      active.value = false;
    }
  }
};

const headerData = ref([]);

const { data, error } = await useAsyncData("header-data", async () => {
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

onMounted(() => {
  window.addEventListener("scroll", controlNavbar);
});
</script>

<template>
  <header :class="{ active: active }">
    <div class="container">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">
          <LogoIcon />
        </NuxtLink>
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

        <div class="info">
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
            Консультация
          </Button>
          <button @click="menu.handleOpenMenu" class="burger">
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

header.active {
  background: var(--white-color);
  border-bottom: 1px solid var(--text-color);

  .header-inner {
    padding-top: 10px;
    padding-bottom: 10px;
    .logo {
      width: 65px;
      height: 65px;
      display: block;
      @media (max-width: $tab-sm) {
        width: 45px;
        height: 45px;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
header {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
  transition: var(--trs-300);
  @media (max-width: $tab) {
    background: #fff;
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
    transition: var(--trs-300);
    @media (max-width: $tab) {
      padding-top: 8px;
      padding-bottom: 8px;
    }
    .logo {
      transition: var(--trs-300);
      width: 85px;
      height: 85px;
      display: block;

      @media (max-width: $tab) {
        width: 45px;
        height: 45px;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    }
    nav {
      list-style: none;
      display: flex;
      align-items: center;
      gap: 25px;
      @media (max-width: $desktop-md-2) {
        display: none;
      }
      a.active {
        color: var(--hover-color);
      }
      a {
        color: #45403d;
        transition: var(--trs-300);
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: -1px;
        &:hover {
          color: var(--hover-color);
        }
      }
    }
    .info {
      display: flex;
      align-items: center;
      gap: 15px;
      a {
        font-weight: 400;
        font-size: 18px;
        line-height: 18px;
        letter-spacing: -1px;
        color: #45403d;
        transition: var(--trs-300);
        &:hover {
          color: var(--hover-color);
        }
      }
      .socials {
        display: flex;
        gap: 5px;
      }
      .outline {
        @media (max-width: $pre-mob) {
          display: none;
        }
      }
    }
    .burger {
      width: 30px;
      height: 19px;
      display: none;
      align-items: center;
      position: relative;
      padding: 0;
      @media (max-width: $desktop-md-2) {
        display: flex;
      }
      span {
        width: 100%;
        height: 1px;
        background: var(--text-color);
      }
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background: var(--text-color);
        top: 0;
      }
      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background: var(--text-color);
        bottom: 0;
      }
    }
  }
}
</style>
