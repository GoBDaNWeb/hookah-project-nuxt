<script setup>
import { TelegramIcon } from "@/shared/icons";
import { WhatsappIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { onMounted, ref } from "vue";
import he from "he";
import { useModalStore } from "@/entities/modal-store";

const costData = ref([]);
const headerData = ref([]);
const modal = useModalStore();

const { data, error } = await useAsyncData("cost-catering-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/catering/");
    const response2 = await $fetch("https://admin.кальяннадом.рф/tech/");

    return {
      costData: response.ROOT.CONTENT,
      headerData: response2.ROOT.CONTENT,
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { headerData: {}, costData: {} };
  }
});
costData.value = data.value.costData;
headerData.value = data.value.headerData;
</script>

<template>
  <div class="cost-catering">
    <div class="container">
      <div class="cost-inner">
        <h3>{{ costData["Стоимость Заголовок"] }}</h3>
        <div class="cost-about">
          <div class="cost-about-item">
            <span>{{ costData["Стоимость Текст 1"] }}</span>
            <p>
              {{ costData["Стоимость Текст 2"] }}
            </p>
          </div>
          <div class="cost-about-item">
            <span>{{ costData["Стоимость Текст 3"] }}</span>
          </div>
        </div>
        <div class="cost-content">
          <div
            class="cost-content-item"
            v-html="
              costData['Стоимость Текст 4']?.TEXT &&
              he.decode(costData['Стоимость Текст 4']?.TEXT)
            "
          ></div>
          <div
            class="cost-content-item"
            :key="index"
            v-for="(cost, index) in costData['Стоимость Элементы']"
          >
            <div class="image-wrapper">
              <img
                :src="`https://admin.кальяннадом.рф/${cost['Картинки']}`"
                alt="photo"
              />
            </div>
            <p>{{ cost["Название"] }}</p>
            <span>{{ cost["Цена"] }}</span>
          </div>
        </div>
        <div class="cost-info">
          <div class="contacts">
            <a :href="`tel:${headerData['Телефон']}`">{{
              headerData["Телефон"]
            }}</a>
            <div class="socials">
              <a
                :href="headerData['Телеграм']"
                target="_blank"
                class="social tg"
              >
                <TelegramIcon />
              </a>
              <a
                :href="headerData['Whatsapp']"
                target="_blank"
                class="social wa"
              >
                <WhatsappIcon />
              </a>
            </div>
            <Button variable="primary" :click="modal.handleOpenOrderModal">
              заказать кейтеринг
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.cost-catering {
  background: var(--white-color);
  padding-top: 130px;
  @media (max-width: $tab) {
    padding-top: 80px;
  }
  .cost-inner {
    h3 {
      font-weight: 400;
      font-size: 64px;
      line-height: 54px;
      color: var(--text-color);
      position: relative;
      padding-left: 70px;
      text-transform: uppercase;
      letter-spacing: -2px;

      @media (max-width: $tab) {
        font-size: 35px;
        line-height: 29px;
        padding-left: 40px;
      }
      &:before {
        position: absolute;
        content: "";
        width: 45px;
        height: 45px;
        background: var(--text-color);
        border-radius: 999px;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        @media (max-width: $tab) {
          width: 30px;
          height: 30px;
        }
      }
    }
    .cost-about {
      display: flex;
      margin-top: 50px;
      gap: 20px;
      @media (max-width: $tab-sm) {
        flex-direction: column;
      }
      .cost-about-item {
        width: 50%;
        border-left: 1px solid var(--text-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media (max-width: $tab-sm) {
          width: 100%;
        }
        &:first-child {
          padding-left: 38px;
        }
        &:last-child {
          padding-left: 29px;
        }
        span {
          font-weight: 400;
          font-size: 32px;
          line-height: 35px;
          color: var(--text-color);
          text-transform: uppercase;
          @media (max-width: $tab) {
            font-size: 24px;
            line-height: 26px;
          }
        }
        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: var(--text-color);
        }
      }
    }
    .cost-content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 50px;
      @media (max-width: $tab) {
        grid-template-columns: repeat(1, 1fr);
        gap: 40px;
      }
      .cost-content-item {
        height: fit-content;
        width: 100%;
        &:first-child {
          padding-top: 50px;
          border-top: 1px solid var(--text-color);
          padding-left: 30px;
          @media (max-width: $tab) {
            padding-left: 0;
          }
          p {
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: var(--text-color);
            padding-left: 35px;
            margin-top: 20px;
          }
        }
        p {
          position: relative;
          font-weight: 400;
          font-size: 24px;
          line-height: 26px;
          color: var(--text-color);
          display: flex;
          flex-direction: column;
          text-transform: uppercase;
          @media (max-width: $tab) {
            font-size: 20px;
            line-height: 22px;
          }
          &:first-child {
            padding-left: 35px;
            &:before {
              content: "";
              position: absolute;
              border-radius: 999px;
              border: 1px solid var(--text-color);
              width: 20px;
              height: 20px;
              top: 4px;
              left: 0;
              @media (max-width: $tab) {
                width: 12px;
                height: 12px;
              }
            }
          }

          span {
            font-weight: 600;
            font-size: 24px;
            line-height: 26px;
            @media (max-width: $tab) {
              font-size: 20px;
              line-height: 22px;
            }
          }
        }
        .image-wrapper {
          width: 100%;
          height: 100%;
          @media (max-width: $tab) {
            margin-bottom: 20px;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        h5 {
          position: relative;
          font-weight: 400;
          font-size: 24px;
          line-height: 26px;
          color: var(--text-color);
          display: flex;
          flex-direction: column;
          text-transform: uppercase;
          @media (max-width: $tab) {
            font-size: 20px;
            line-height: 22px;
          }
          &:first-child {
            padding-left: 35px;
            &:before {
              content: "";
              position: absolute;
              border-radius: 999px;
              border: 1px solid var(--text-color);
              width: 20px;
              height: 20px;
              top: 4px;
              left: 0;
              @media (max-width: $tab) {
                width: 12px;
                height: 12px;
              }
            }
          }

          span {
            font-weight: 600;
            font-size: 24px;
            line-height: 26px;
            @media (max-width: $tab) {
              font-size: 20px;
              line-height: 22px;
            }
          }
        }
        p {
          font-weight: 400;
          font-size: 24px;
          line-height: 26px;
          color: var(--text-color);
          margin-top: 20px;
          @media (max-width: $tab) {
            font-size: 16px;
            line-height: 20px;
          }
        }
        span {
          font-weight: 600;
          font-size: 24px;
          line-height: 26px;
          color: var(--text-color);
          text-transform: uppercase;
          display: block;
        }
      }
    }
    .cost-info {
      padding-top: 50px;
      margin-top: 50px;
      border-top: 1px solid var(--text-color);
      padding-left: 35px;
      padding-bottom: 150px;
      @media (max-width: $tab) {
        padding-bottom: 80px;
        padding-left: 0;
      }
      @media (max-width: $tab-sm) {
        margin-top: 20px;
      }
      .contacts {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 37px;

        max-width: 640px;
        @media (max-width: $tab-sm) {
          width: 100%;
          flex-wrap: wrap;
        }
        & > button {
          white-space: nowrap;
          @media (max-width: $tab-sm) {
            width: 100%;
          }
        }
        a {
          font-weight: 600;
          font-size: 24px;
          line-height: 24px;
          letter-spacing: -2px;
          white-space: nowrap;
          color: var(--text-color);
          @media (max-width: $tab-sm) {
            font-size: 24px;
            line-height: 24px;
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
    }
  }
}
</style>
