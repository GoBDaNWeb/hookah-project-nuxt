<script setup>
import { CloseIcon, TelegramIcon, WhatsappIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { useModalStore } from "@/entities/modal-store";
import { RouterLink, useRoute } from "vue-router";
import { ref, watch } from "vue";

const TheMask = process.client
  ? defineAsyncComponent(() => import("vue-the-mask"))
  : null;
const props = defineProps(["title", "btnText", "isActive", "handleClose"]);
const addressData = ref([]);

// Загружаем данные с API (SSR)
const { data, error } = await useAsyncData("modal-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/tech/");

    return {
      addressData: response.ROOT.CONTENT,
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { addressData: {} };
  }
});

addressData.value = data.value.addressData;

// Форма
const username = ref("");
const phone = ref("");
const modal = useModalStore();

const onSubmit = async () => {
  try {
    const response = await fetch("https://admin.кальяннадом.рф/send.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username.value,
        phone: phone.value,
      }),
    });

    // if (!response.ok) throw new Error("Ошибка сети");
    props.handleClose();
    modal.handleOpenSuccessModal();
    username.value = "";
    phone.value = "";
  } catch (error) {
    console.error("Ошибка отправки формы:", error);
  }
};

// watch(
//   () => props.currentTab,
//   () => {
//     swiperRef.value.slideTo(props.currentTab);
//   }
// );
</script>

<template>
  <div @click="handleClose" class="modal" :class="isActive ? 'active' : ''">
    <div class="modal-content" @click.stop>
      <Button :click="handleClose">
        <CloseIcon />
      </Button>
      <div class="modal-item">
        <p class="title">{{ title }}</p>
        <div class="contacts">
          <div class="socials">
            <a
              :href="addressData['Телеграм']"
              target="_blank"
              class="social tg"
            >
              <TelegramIcon />
            </a>
            <a
              :href="addressData['Whatsapp']"
              target="_blank"
              class="social wa"
            >
              <WhatsappIcon />
            </a>
          </div>
          <a :href="`tel:${addressData['Телефон']}`">{{
            addressData["Телефон"]
          }}</a>
        </div>
      </div>
      <div class="modal-item">
        <form @submit.prevent="onSubmit">
          <input
            placeholder="Имя"
            class="input"
            type="text"
            v-model="username"
          />
          <input
            placeholder="Телефон"
            class="input"
            type="tel"
            v-model="phone"
            v-mask="'+7 (###) ###-##-##'"
            v-if="TheMask"
          />

          <p>
            Нажимая кнопку «Заказать кальян», вы даёте свое согласие
            <NuxtLink to="/policy">
              с правилами обработки персональных данных
            </NuxtLink>
            .
          </p>
          <Button
            variable="primary"
            :disabled="phone.length < 18 || username.length === 0"
            >{{ btnText }}</Button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.modal.active {
  background: rgba(69, 64, 61, 0.8);
  pointer-events: all;
  .modal-content {
    transform: translateY(0);
  }
}
.modal {
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(69, 64, 61, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  pointer-events: none;
  transition: var(--trs-600);
  @media (max-width: $tab-sm) {
    padding: 0;
  }
  .modal-content {
    background: var(--bg-color);
    padding: 100px;
    display: grid;
    grid-template-columns: 40% 50%;
    position: relative;
    gap: 137px;
    transform: translateY(-200%);
    transition-delay: 300ms;
    transition: var(--trs-600);
    max-width: 1200px;
    @media (max-width: $tab) {
      grid-template-columns: 1fr;
      padding: 100px 20px;
      gap: 80px;
    }
    @media (max-width: $tab-sm) {
      height: 100%;
      width: 100%;
    }
    & > button {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 35px;
      height: 35px;
      padding: 0;
      @media (max-width: $tab) {
        top: 20px;
        right: 20px;
      }
      svg {
        stroke: var(--text-color);
        width: 100%;
        height: 100%;
      }
    }
    .modal-item {
      width: 100%;
      .title {
        font-weight: 400;
        font-size: 64px;
        line-height: 54px;
        color: var(--text-color);
        position: relative;
        max-width: 370px;
        text-transform: uppercase;
        letter-spacing: -1px;
        @media (max-width: $tab) {
          font-size: 35px;
          line-height: 29px;
          max-width: 100%;
        }
        &:before {
          content: "";
          position: absolute;
          width: 45px;
          height: 45px;
          border-radius: 999px;
          background: var(--text-color);
          left: 0;
          top: -55px;
          @media (max-width: $tab) {
            width: 30px;
            height: 30px;
          }
        }
      }
      .contacts {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-top: 40px;
        padding-top: 40px;
        border-top: 1px solid var(--text-color);
        a {
          font-weight: 600;
          font-size: 24px;
          line-height: 24px;
          letter-spacing: -2px;
          white-space: nowrap;
          color: var(--text-color);
          transition: var(--trs-300);
          &:hover {
            color: var(--hover-color);
          }
          @media (max-width: $tab-sm) {
            font-weight: 500;
          }
        }
        .socials {
          display: flex;
          align-items: center;
          gap: 10px;
          a {
            width: 60px;
            height: 60px;
            @media (max-width: $tab-sm) {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 30px;

        p {
          font-weight: 400;
          font-size: 14px;
          line-height: 15px;
          color: var(--text-color);
          text-transform: uppercase;
          @media (max-width: $tab) {
            font-size: 12px;
            line-height: 13px;
          }
          a {
            text-decoration: underline;
          }
        }
        button {
          // width: 300px;
          @media (max-width: $tab-sm) {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
