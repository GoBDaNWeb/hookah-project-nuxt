<script setup>
import { ref, reactive, defineAsyncComponent } from "vue";
import { useModalStore } from "@/entities/modal-store";

import { Button } from "@/shared/ui/button";
import { TelegramIcon, ParadigmaIcon, WhatsappIcon } from "@/shared/icons";
import { ContactsSwiper } from "@/entities/contacts-swiper";

const props = defineProps([
  "tabs",
  "title",
  "img",
  "list",
  "subTitle",
  "subTitleForm",
  "badge",
  "imgs",
  "btnText",
]);
const username = ref("");
const phone = ref("");
const modal = useModalStore();

const TheMask = process.client
  ? defineAsyncComponent(() => import("vue-the-mask"))
  : null;

const addressData = ref([]);

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

const onSubmit = async () => {
  if (!process.client) return;

  try {
    const response = await fetch(`https://admin.кальяннадом.рф/send.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify({
        name: username.value,
        phone: phone.value,
      }),
    });

    if (!response.ok) throw new Error("Ошибка сети");
    modal.handleOpenSuccessModal();
    username.value = "";
    phone.value = "";
  } catch (error) {
    console.error("Ошибка отправки формы:", error);
  }
};

// Табы
const currentTab = reactive({ tab: 0 });
const handleSetTab = (index) => {
  currentTab.tab = index;
};
</script>

<template>
  <div class="contacts-block">
    <div class="container">
      <div class="contacts-inner">
        <div class="left">
          <div class="top" v-if="tabs">
            <ul>
              <li v-for="(tab, index) in tabs" :key="index">
                <button
                  :class="index === currentTab.tab ? 'active' : ''"
                  @click="handleSetTab(index)"
                >
                  {{ tab }}
                </button>
              </li>
            </ul>
          </div>
          <span v-if="badge" class="badge">{{ badge }}</span>

          <div class="center">
            <h3>{{ title }}</h3>
            <h5 v-if="subTitle">{{ subTitle }}</h5>
            <ul v-if="list">
              <li v-for="item in list" :key="item">{{ item }}</li>
            </ul>
            <h5 class="sub-title-form" v-if="subTitleForm">
              {{ subTitleForm }}
            </h5>

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
                <NuxtLink to="/policy"
                  >с правилами обработки персональных данных</NuxtLink
                >.
              </p>
              <Button
                variable="primary"
                :disabled="phone.length < 18 || username.length === 0"
                >{{ btnText }}</Button
              >
            </form>
          </div>

          <div class="bottom">
            <div class="socials">
              <a
                v-if="addressData?.Телеграм"
                :href="addressData['Телеграм']"
                target="_blank"
                class="social tg"
              >
                <TelegramIcon />
              </a>
              <a
                v-if="addressData?.Whatsapp"
                :href="addressData['Whatsapp']"
                target="_blank"
                class="social wa"
              >
                <WhatsappIcon />
              </a>
            </div>
            <a
              v-if="addressData?.Телефон"
              :href="`tel:${addressData['Телефон']}`"
            >
              {{ addressData["Телефон"] }}
            </a>
          </div>
        </div>

        <div class="right">
          <ContactsSwiper
            v-if="tabs"
            :imgs="imgs"
            :currentTab="currentTab.tab"
          />
          <div v-else class="image-wrapper">
            <img v-if="img" :src="img" alt="photo" />
            <img
              v-else
              src="@/shared/assets/images/gallery/5.jpg"
              alt="photo"
            />
          </div>
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
    </div>
  </div>
</template>
<style lang="scss">
@use "@/shared/styles/vars" as *;
.contacts-block {
  .contacts-inner {
    display: flex;
    padding-bottom: 50px;
    gap: 50px;
    @media (max-width: $tab) {
      flex-direction: column;
      gap: 40px;
      padding-bottom: 0;
    }
    .left {
      width: 50%;
      padding-top: 50px;
      @media (max-width: $tab) {
        width: 100%;
      }
      .top {
        padding-bottom: 85px;
        @media (max-width: $tab) {
          padding-bottom: 40px;
        }
        ul {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--text-color);
          padding-bottom: 15px;
          li {
            button.active {
              color: var(--hover-color);
              &:before {
                background: var(--hover-color);
              }
            }

            button {
              position: relative;
              padding-left: 36px;
              font-weight: 400;
              font-size: 24px;
              letter-spacing: -2px;
              color: var(--text-color);
              text-transform: uppercase;
              white-space: nowrap;
              transition: var(--trs-300);
              @media (max-width: $desktop-sm) {
                font-size: 22px;
                padding-left: 20px;
                letter-spacing: -0.5px;
              }
              @media (max-width: $tab-sm) {
                font-size: 14px;
                line-height: 14px;
              }
              &:before {
                content: "";
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 999px;
                background: var(--text-color);
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                transition: var(--trs-300);
                @media (max-width: $tab-sm) {
                  width: 12px;
                  height: 12px;
                }
              }
            }
          }
        }
      }
      .badge {
        font-weight: 400;
        font-size: 24px;
        text-transform: uppercase;
        line-height: 26px;
        color: var(--text-color);
        position: relative;
        padding-left: 35px;
        margin-bottom: 65px;
        display: block;
        margin-top: 20px;
        @media (max-width: $tab) {
          margin-bottom: 40px;
          font-size: 14px;
          line-height: 14px;
          padding-left: 20px;
        }
        &:before {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          background: var(--text-color);
          border-radius: 999px;
          top: 0;
          bottom: 0;
          margin: auto;
          left: 0;
          @media (max-width: $tab) {
            width: 12px;
            height: 12px;
          }
        }
      }
      .center {
        padding-left: 35px;
        padding-top: 15px;
        @media (max-width: $tab) {
          padding-left: 0;
        }

        h3 {
          font-weight: 400;
          font-size: 80px;
          line-height: 80px;
          color: var(--text-color);
          text-transform: uppercase;
          @media (max-width: $tab) {
            font-size: 35px;
            line-height: 35px;
            letter-spacing: -3px;
          }
        }
        h5 {
          font-weight: 400;
          font-size: 32px;
          line-height: 35px;
          color: var(--text-color);
          margin-top: 50px;
          margin-bottom: 30px;
          letter-spacing: -1px;
          text-transform: uppercase;
          @media (max-width: $tab) {
            margin-top: 40px;
            margin-bottom: 20px;
            font-size: 24px;
            line-height: 26px;
          }
        }
        .sub-title-form {
          margin-top: 80px;
          @media (max-width: $tab) {
          }
        }
        ul {
          display: flex;
          flex-direction: column;
          gap: 20px;
          @media (max-width: $tab) {
            gap: 12px;
          }
          li {
            font-weight: 400;
            font-size: 20px;
            color: var(--text-color);
            line-height: 20px;
            position: relative;
            padding-left: 33px;
            @media (max-width: $tab) {
              font-size: 18px;
              line-height: 19px;
            }

            &:before {
              content: "";
              position: absolute;
              width: 10px;
              height: 10px;
              background: var(--text-color);
              border-radius: 999px;
              top: 0;
              bottom: 0;
              margin: auto;
              left: 0;
            }
          }
        }
        form {
          margin-top: 60px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          @media (max-width: $tab) {
            margin-top: 40px;
          }
          @media (max-width: $tab-sm) {
            grid-template-columns: repeat(1, 1fr);
          }
          p {
            font-weight: 400;
            font-size: 14px;
            line-height: 15px;
            letter-spacing: -1px;
            color: var(--text-color);
            text-transform: uppercase;
            @media (max-width: $tab) {
              font-size: 12px;
              line-height: 13px;
            }
            a {
              text-decoration: underline;
              transition: var(--trs-300);
              &:hover {
                color: var(--hover-color);
              }
            }
          }
          button {
            padding: 0 28px;
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        gap: 30px;
        padding-left: 35px;
        margin-top: 50px;
        @media (max-width: $tab) {
          margin-top: 40px;
          padding-left: 0;
        }
        a {
          font-weight: 600;
          font-size: 30px;
          line-height: 30px;
          color: var(--text-color);
          letter-spacing: -2px;
          transition: var(--trs-300);
          &:hover {
            color: var(--hover-color);
          }
          @media (max-width: $tab) {
            font-size: 24px;
            line-height: 24px;
          }
        }
        .socials {
          display: flex;
          gap: 10px;
          a {
            width: 60px;
            height: 60px;
            @media (max-width: $tab) {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }
    .right {
      width: 50%;
      padding-top: 20px;
      @media (max-width: $tab) {
        width: 100%;
      }
      .image-wrapper {
        // width: 100%;
        // height: calc(20vw * 2);
        padding-bottom: 100%;
        max-height: 615px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          object-fit: cover;
        }
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
