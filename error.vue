<script setup>
import "@/shared/styles/index.scss";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Modal } from "@/widgets/modal";
import { SuccessModal } from "@/widgets/success-modal";
import { MobileMenu } from "@/widgets/mobile-menu";
import { useModalStore } from "@/entities/modal-store";
import { Button } from "@/shared/ui/button";
import { ref } from "vue";
import { TelegramIcon, ParadigmaIcon, WhatsappIcon } from "@/shared/icons";

const modal = useModalStore();

defineProps({
  error: Object,
});
const addressData = ref([]);

// Загружаем данные с API (SSR)
const { data, error } = await useAsyncData("contacts-data", async () => {
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

const toMainPage = () => {
  return navigateTo({
    path: "/",
  });
};
</script>

<template>
  <Header />
  <main class="error-page container">
    <div class="error-page-inner">
      <p class="error-badge">404</p>
      <div class="text-block">
        <div class="main-text">
          <h1>страница <br />не найдена</h1>
          <p>страница не существует или была удалена</p>
        </div>
        <Button variable="primary" :click="toMainPage"> на главную </Button>
      </div>
      <div class="image-block">
        <img src="/image/error.jpg" alt="error" />
      </div>
    </div>
    <div class="contacts-info">
      <div class="left">
        <ul>
          <li>© 2025</li>
          <li>кальяннадом.рф</li>
          <li>Все права защищены</li>
          <li>
            <NuxtLink to="/policy">Политика конфиденциальности</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li>{{ addressData?.Адрес }}</li>
          <li>
            <a href="https://paradigma-digital.ru/" target="_blank">
              <ParadigmaIcon />
              <span>
                Разработка сайта – <br />
                Paradigma
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <slot />
  <Footer />
  <MobileMenu />
  <Modal
    :title="modal.orderTitle"
    :btnText="modal.orderBtnTitle"
    :isActive="modal.orderModalIsOpen"
    :handleClose="modal.handleOpenOrderModal"
  />
  <Modal
    title="у вас есть вопросы?"
    btnText="отправить"
    :isActive="modal.questionModalIsOpen"
    :handleClose="modal.handleOpenQuestionModal"
  />
  <SuccessModal
    :isActive="modal.successModalIsOpen"
    :handleClose="modal.handleOpenSuccessModal"
  />
</template>

<style scoped lang="scss">
@use "@/shared/styles/vars" as *;

.error-page {
  // height: 100vh;
  display: flex;
  flex-direction: column;
  .error-badge {
    padding-left: 35px;
    position: absolute;
    top: 21px;
    font-weight: 400;
    font-size: 24px;
    line-height: 110%;
    color: #45403d;
    @media (max-width: $tab) {
      font-size: 14px;
      padding-left: 17px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background: #45403d;
      border-radius: 999px;
      width: 20px;
      height: 20px;
      @media (max-width: $tab) {
        width: 12px;
        height: 12px;
      }
    }
  }
  .error-page-inner {
    margin-top: 157px;
    flex: 1;
    display: grid;
    grid-template-columns: 0.96fr 1fr;
    align-items: flex-start;
    gap: 50px;
    border-top: 1px solid #45403d;
    position: relative;
    @media (max-width: $tab) {
      grid-template-columns: 1fr;
      gap: 48px;
      margin-top: 70px;
    }
    .text-block {
      padding-top: 120px;
      padding-bottom: 72px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 30px;
      gap: 217px;
      @media (max-width: $tab) {
        padding-left: 0;
        gap: 28px;
        padding-top: 72px;
        padding-bottom: 0;
      }
      .main-text {
        flex: 1;
      }
      button {
        width: 300px;
        @media (max-width: $mob) {
          width: 100%;
        }
      }
      h1 {
        font-weight: 400;
        font-size: 80px;
        line-height: 90%;
        text-transform: uppercase;
        color: #45403d;
        @media (max-width: $tab) {
          font-size: 35px;
          line-height: 85%;
        }
      }
      p {
        margin-top: 48px;
        font-weight: 400;
        font-size: 14px;
        line-height: 100%;
        @media (max-width: $tab) {
          margin-top: 28px;
        }
      }
    }
    .image-block {
      position: relative;
      padding-bottom: 90%;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .contacts-info {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--text-color);
    margin-top: 50px;
    padding-bottom: 50px;
    @media (max-width: $tab) {
      margin-top: 20px;
    }
    .left {
      padding-top: 100px;
      padding-left: 30px;
      position: relative;
      @media (max-width: $tab) {
        padding-top: 40px;
        padding-left: 0;
      }
      &:before {
        content: "";
        position: absolute;
        height: 50px;
        width: 1px;
        background: var(--text-color);
        left: 0;
        top: 0;
        @media (max-width: $tab) {
          height: 20px;
        }
      }
      ul {
        display: flex;
        gap: 15px;
        text-transform: uppercase;
        color: var(--text-color);
        @media (max-width: $desktop-md-2) {
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: $tab) {
          gap: 0px;
        }
        li {
          font-size: 14px;
          line-height: 14px;
          font-weight: 400;
          @media (max-width: $tab) {
            font-size: 12px;
            line-height: 13px;
            letter-spacing: -0.8px;
          }

          &:last-child {
            padding-left: 5px;
            @media (max-width: $desktop-md-2) {
              padding-left: 0;
            }
            @media (max-width: $tab) {
              margin-top: 21px;
            }
          }
          a {
            transition: var(--trs-300);
            &:hover {
              color: var(--hover-color);
            }
          }
        }
      }
    }
    .right {
      padding-top: 100px;
      padding-right: 30px;
      position: relative;
      @media (max-width: $tab) {
        padding-top: 40px;
        padding-right: 0;
      }
      &:before {
        content: "";
        position: absolute;
        height: 50px;
        width: 1px;
        background: var(--text-color);
        left: -50px;
        top: 0;
        @media (max-width: $desktop-sm) {
          left: 0;
        }
        @media (max-width: $tab) {
          height: 20px;
        }
      }
      ul {
        display: flex;
        gap: 105px;
        align-items: center;
        text-transform: uppercase;
        font-weight: 400;
        font-size: 14px;
        color: var(--text-color);
        @media (max-width: $desktop-sm) {
          gap: 40px;
        }
        @media (max-width: $tab) {
          flex-direction: column;
          align-items: flex-start;
          gap: 21px;
          font-size: 12px;
          line-height: 13px;
          letter-spacing: -0.8px;
        }
        li {
          &:first-child {
            max-width: 300px;
          }
          a {
            display: flex;
            gap: 13px;
            align-items: center;
            transition: var(--trs-300);
            @media (max-width: $tab) {
              letter-spacing: -0.8px;
            }
            svg {
              fill: #45403d;
              transition: var(--trs-300);
            }
            &:hover {
              color: var(--hover-color);
              svg {
                fill: var(--hover-color);
              }
            }
          }

          &:first-child {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>
