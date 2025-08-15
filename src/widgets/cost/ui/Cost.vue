<script setup>
import { reactive } from "vue";
import { Button } from "@/shared/ui/button";
import { CostSwiper } from "@/entities/cost-swiper";
import { costList } from "../config";
import costImg from "@/shared/assets/images/cost.jpg";
import { useModalStore } from "@/entities/modal-store";
import { WhatsappIcon, TelegramIcon } from "@/shared/icons";
import he from "he";
import { onMounted, ref } from "vue";

const currentTab = reactive({ tab: 0 });
const modal = useModalStore();
const handleSetTab = (index) => {
  currentTab.tab = index;
};

const costData = ref([]);
const headerData = ref([]);

const { data, error } = await useAsyncData("cost-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/");
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
  <div class="cost-block">
    <div class="container">
      <div class="cost-inner">
        <h3>{{ costData["Стоимость Заголовок"] }}</h3>

        <div class="cost-about">
          <div class="cost-about-item">
            <p>цены указаны <span> без учета доставки </span></p>
          </div>

          <div class="cost-about-item">
            <p>На каждую чашу кладем <span>по 8 кубиков угля</span></p>
          </div>
        </div>
        <div class="cost-content">
          <div class="left">
            <div class="cost-list">
              <div
                class="cost-item"
                :class="currentTab.tab === index ? 'active' : ''"
                v-for="(cost, index) in costData['Каталог']"
                :key="index"
                @click="handleSetTab(index)"
              >
                <div class="main">
                  <p>{{ cost.NAME }}</p>
                  <span class="line"></span>
                  <span class="total">
                    {{ cost.PRICE }}
                  </span>
                </div>
                <div class="additional">
                  <p>Доп чаша</p>
                  <span class="total">{{ cost.DOP }}</span>
                </div>
              </div>
            </div>
            <div class="about">
              <div class="about-item">
                <div
                  class="text"
                  v-html="
                    costData['Система чек-аут'] &&
                    he.decode(costData['Система чек-аут'].TEXT)
                  "
                ></div>

                <div class="contacts">
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
                  <Button
                    variable="primary"
                    :click="modal.handleOpenOrderModal"
                  >
                    заказать кальян
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <CostSwiper
              :imgs="costData['Каталог']"
              :currentTab="currentTab.tab"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.cost-block {
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
        padding-left: 40px;
        line-height: 29px;
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
          bottom: auto;
        }
      }
    }
    .cost-about {
      display: flex;
      margin-top: 40px;
      @media (max-width: $tab-sm) {
        flex-direction: column;
        gap: 20px;
      }
      .cost-about-item {
        width: 50%;
        @media (max-width: $tab-sm) {
          width: 100%;
        }
        p {
          font-weight: 400;
          font-size: 24px;
          line-height: 26px;
          color: var(--text-color);
          position: relative;
          padding-left: 27px;
          padding-top: 10px;
          padding-bottom: 10px;
          text-transform: uppercase;
          @media (max-width: $tab) {
            font-size: 20px;
            line-height: 22px;
          }
          span {
            font-weight: 600;
          }
          &:before {
            content: "";
            position: absolute;
            left: 0;
            width: 1px;
            height: 100%;
            left: 0;
            bottom: 0;
            background: var(--text-color);
          }
        }
      }
    }
    .cost-content {
      padding-top: 50px;
      display: flex;
      gap: 20px;
      padding-bottom: 130px;
      @media (max-width: $tab) {
        flex-direction: column-reverse;
        padding-bottom: 74px;
      }
      .left {
        border-top: 1px solid var(--text-color);
        padding-top: 50px;
        width: 50%;
        @media (max-width: $tab) {
          width: 100%;
          padding-top: 20px;
        }
        .cost-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding-bottom: 50px;
          padding-right: 30px;
          padding-left: 30px;
          border-bottom: 1px solid var(--text-color);
          @media (max-width: $tab) {
            gap: 20px;
            padding-top: 0;
            padding-bottom: 20px;
            padding-right: 0;
            padding-left: 0;
          }
          .cost-item.active {
            &:before {
              background: var(--hover-color);
              border-color: var(--hover-color);
            }
            .main {
              h5 {
                color: var(--hover-color);
              }
              .total {
                color: var(--hover-color);
              }
            }
            .additional {
              h6,
              span {
                color: var(--hover-color);
              }
            }
          }
          .cost-item {
            display: flex;
            flex-direction: column;
            gap: 10px;
            position: relative;
            padding-left: 38px;
            cursor: pointer;
            @media (max-width: $tab) {
              padding-left: 22px;
            }
            &:before {
              content: "";
              position: absolute;
              width: 20px;
              height: 20px;
              border-radius: 999px;
              border: 1px solid var(--text-color);
              left: 0;
              transition: var(--trs-300);
              top: 4px;
              @media (max-width: $tab) {
                width: 12px;
                height: 12px;
                top: 6px;
              }
            }
            .main {
              display: flex;
              align-items: baseline;
              gap: 10px;
              p {
                font-weight: 400;
                font-size: 24px;
                line-height: 24px;
                color: var(--text-color);
                white-space: nowrap;
                text-transform: uppercase;
                letter-spacing: -1px;
                transition: var(--trs-300);

                @media (max-width: $tab) {
                  font-size: 20px;
                  line-height: 22px;
                }
              }
              .line {
                width: 100%;
                height: 1px;
                background: var(--bg-color);
              }
              .total {
                font-weight: 500;
                font-size: 24px;
                line-height: 24px;
                color: var(--text-color);
                white-space: nowrap;
                transition: var(--trs-300);

                @media (max-width: $tab) {
                  font-size: 20px;
                  line-height: 22px;
                }
              }
            }
            .additional {
              display: flex;
              align-items: baseline;
              justify-content: space-between;
              gap: 10px;
              p {
                font-size: 16px;
                font-weight: 400;
                line-height: 20px;
                color: var(--text-color);
                transition: var(--trs-300);

                @media (max-width: $tab) {
                  font-size: 16px;
                  line-height: 20px;
                }
              }
              .total {
                font-weight: 400px;
                font-size: 16px;
                line-height: 20px;
                transition: var(--trs-300);

                color: var(--text-color);
              }
            }
          }
        }
        .about {
          padding-top: 72px;
          @media (max-width: $tab) {
            padding-top: 40px;
          }
          .about-item {
            display: flex;
            flex-direction: column;
            gap: 25px;
            max-width: 85%;
            @media (max-width: $tab) {
              gap: 20px;
            }
            @media (max-width: $tab-sm) {
              max-width: 100%;
            }
            .contacts {
              display: flex;
              align-items: center;
              gap: 37px;
              padding-top: 50px;
              padding-right: 30px;
              @media (max-width: $desktop-md-2) {
                flex-direction: column;
                padding-bottom: 50px;
              }
              @media (max-width: $tab) {
                z-index: 2;
                position: relative;
                flex-direction: row;
                padding-left: 0;
                padding-right: 0;
                padding-top: 0;
              }
              @media (max-width: $tab-sm) {
                flex-wrap: wrap;
                gap: 10px;
                width: 100%;
              }
              & > button {
                white-space: nowrap;
                @media (max-width: $tab-sm) {
                  width: 100%;
                }
              }
              a {
                font-weight: 400;
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
                @media (max-width: $tab-sm) {
                  width: 100%;
                }
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
            .text {
              & > p {
                &:first-child {
                  font-weight: 400;
                  font-size: 24px;
                  line-height: 26px;
                  color: var(--text-color);
                  position: relative;
                  text-transform: uppercase;
                  @media (max-width: $tab) {
                    font-size: 20px;
                    line-height: 22px;
                  }
                  span {
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 26px;
                    color: var(--text-color);
                    @media (max-width: $tab) {
                      font-size: 20px;
                      line-height: 22px;
                    }
                  }
                }
              }
              & > h6 {
                font-weight: 400;
                font-size: 24px;
                line-height: 26px;
                color: var(--text-color);
                position: relative;
                text-transform: uppercase;
                @media (max-width: $tab) {
                  font-size: 20px;
                  line-height: 22px;
                }
                span {
                  font-weight: 600;
                  font-size: 24px;
                  line-height: 26px;
                  color: var(--text-color);
                  @media (max-width: $tab) {
                    font-size: 20px;
                    line-height: 22px;
                  }
                }
              }
            }

            p {
              font-weight: 400;
              font-size: 16px;
              line-height: 20px;
              color: var(--text-color);
              @media (max-width: $tab) {
                font-size: 16px;
                line-height: 20px;
              }
              span {
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;
                color: var(--text-color);
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
        .image-wrapper {
          width: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
