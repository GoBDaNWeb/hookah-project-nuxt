<script setup>
import { Button } from "@/shared/ui/button";
import { TelegramIcon } from "@/shared/icons";
import { WhatsappIcon } from "@/shared/icons";
import { Map } from "@/entities/map";
import { onMounted, ref } from "vue";
import { useModalStore } from "@/entities/modal-store";

const deliveryData = ref([]);
const headerData = ref([]);
const modal = useModalStore();

const { data, error } = await useAsyncData("delivery-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/");
    const response2 = await $fetch("https://admin.кальяннадом.рф/tech/");

    return {
      deliveryData: response.ROOT.CONTENT,
      headerData: response2.ROOT.CONTENT,
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { headerData: {}, deliveryData: {} };
  }
});
deliveryData.value = data.value.deliveryData;
headerData.value = data.value.headerData;
</script>

<template>
  <div class="delivery">
    <div class="container">
      <div class="delivery-inner">
        <h3>{{ deliveryData["Доставка Заголовок"] }}</h3>

        <div class="delivery-content">
          <div class="left">
            <p>Стоимость доставки и возврата объединена в единый платеж</p>

            <div class="info">
              <div
                class="info-item"
                :key="index"
                v-for="(delivery, index) in deliveryData['Доставка']"
              >
                <span class="label">{{ delivery["Название"] }}</span>
                <span class="line"></span>
                <span class="value">{{ delivery["Цена"] }}</span>
              </div>
            </div>
            <div class="contacts">
              <div class="contacts-left">
                <p>самовывоз <span>бесплатно</span></p>
              </div>
              <div class="contacts-right">
                <p>
                  Доступен бесплатный самовывоз из нашего офиса по адресу
                  Студенческая, 35
                </p>
              </div>
            </div>
            <div class="contacts-info">
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
                заказать кальян
              </Button>
            </div>
          </div>
          <div class="right">
            <Map />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.delivery {
  background: var(--white-color);
  padding-top: 130px;
  padding-bottom: 130px;
  @media (max-width: $tab) {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .delivery-inner {
    h3 {
      font-weight: 400;
      font-size: 64px;
      line-height: 54px;
      color: var(--text-color);
      text-transform: uppercase;
      @media (max-width: $tab) {
        font-size: 35px;
        line-height: 29px;
      }
    }
    .delivery-content {
      margin-top: 50px;
      display: flex;
      gap: 20px;
      @media (max-width: $tab) {
        flex-direction: column;
        gap: 40px;
      }
      .left {
        width: 50%;
        @media (max-width: $tab) {
          width: 100%;
        }
        & > p {
          padding-left: 37px;
          font-weight: 400;
          font-size: 24px;
          line-height: 24px;
          color: var(--text-color);
          position: relative;
          text-transform: uppercase;
          max-width: 600px;
          @media (max-width: $tab) {
            max-width: 100%;
            font-size: 20px;
            line-height: 22px;
            padding-left: 28px;
          }
          &:before {
            content: "";
            position: absolute;
            background: var(--text-color);
            width: 20px;
            height: 20px;
            border-radius: 999px;
            left: 0;
            top: 4px;
            @media (max-width: $tab) {
              width: 12px;
              height: 12px;
            }
          }
        }
        .contacts {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 37px;
          @media (max-width: $tab-sm) {
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
          }
          .contacts-right {
            /* width: 50%; */
            display: flex;
            flex-direction: column;
            gap: 50px;
            padding-top: 100px;
            position: relative;
            @media (max-width: $tab-sm) {
              padding-top: 0;
            }
            &:before {
              content: "";
              position: absolute;
              height: 50px;
              width: 1px;
              background: var(--text-color);
              top: 0;
              left: 0;
              @media (max-width: $tab-sm) {
                display: none;
              }
            }
            p {
              font-size: 16px;
              line-height: 20px;
              font-weight: 400;
              color: var(--text-color);
            }
          }
          .contacts-left {
            /* width: 50%; */
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between;
            padding-top: 100px;
            @media (max-width: $tab-sm) {
              padding-top: 20px;
            }
            .contacts-about {
              display: flex;
              gap: 37px;
              align-items: center;
            }

            p {
              position: relative;
              font-weight: 400;
              font-size: 24px;
              line-height: 26px;
              color: var(--text-color);
              white-space: nowrap;
              @media (max-width: $tab) {
                font-size: 20px;
                line-height: 22px;
              }
              span {
                font-weight: 600;
              }
            }
          }
        }
        .contacts-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 50px;
          flex-wrap: wrap;
          @media (max-width: $pre-mob) {
            gap: 20px;
          }
          a {
            font-weight: 600;
            font-size: 24px;
            line-height: 24px;
            color: var(--text-color);
            letter-spacing: -2px;
            transition: var(--trs-300);
            &:hover {
              color: var(--hover-color);
            }
          }
          .socials {
            display: flex;
            gap: 10px;
            a {
              width: 60px;
              height: 60px;
            }
          }
          & > button {
            @media (max-width: $pre-mob) {
              width: 100%;
            }
          }
        }
        .info {
          border-top: 1px solid var(--text-color);
          border-bottom: 1px solid var(--text-color);
          padding-bottom: 50px;
          padding-top: 50px;
          margin-top: 50px;
          padding-right: 30px;
          padding-left: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          @media (max-width: $tab) {
            padding-left: 0;
            padding-right: 0;
          }
          .info-item {
            display: flex;
            align-items: baseline;
            gap: 3px;
            .label {
              font-weight: 400;
              font-size: 20px;
              line-height: 20px;
              color: var(--text-color);
              position: relative;
              padding-left: 40px;
              white-space: nowrap;
              @media (max-width: $tab-sm) {
                font-size: 18px;
                line-height: 19px;
                padding-left: 24px;
              }
              &:before {
                content: "";
                position: absolute;
                border: 1px solid var(--text-color);
                width: 20px;
                height: 20px;
                border-radius: 999px;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                @media (max-width: $tab-sm) {
                  width: 12px;
                  height: 12px;
                }
              }
            }
            .line {
              width: 100%;
              height: 1px;
              background: var(--bg-color);
            }
            .value {
              white-space: nowrap;
              font-weight: 500;
              font-size: 24px;
              line-height: 24px;
              color: var(--text-color);
              @media (max-width: $tab-sm) {
                font-size: 20px;
                line-height: 20px;
                white-space: normal;
                min-width: 35%;
              }
            }
          }
        }
      }
      .right {
        width: 50%;
        @media (max-width: $tab) {
          width: 100%;
        }
        & > div {
          height: calc(20vw * 2);
          max-height: 615px;
          @media (max-width: $tab) {
            width: 100%;
            height: calc(30vw * 3);
          }
          div {
            height: 100%;
          }
        }
        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: var(--text-color);
        }
        .map {
          width: 100%;
          height: 100%;
          background-color: var(--bg-color);
          filter: grayscale(1);
          @media (max-width: $tab) {
            height: calc(20vw * 4) !important;
          }
        }
      }
    }
  }
}
</style>
