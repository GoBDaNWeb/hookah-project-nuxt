<script setup>
import { reactive } from "vue";
import { Collapse } from "vue-collapsed";
import { PlusIcon } from "@/shared/icons";

import { onMounted, ref } from "vue";
import he from "he";

const props = defineProps([
  "questions",
  "textLeft",
  "textRight",
  "img",
  "hasInfo",
  "title",
]);
function handleAccordion(selectedIndex) {
  props.questions.forEach((_, index) => {
    props.questions[index].isExpanded =
      index === selectedIndex ? !props.questions[index].isExpanded : false;
  });
}
</script>

<template>
  <div class="faq">
    <div class="container">
      <div class="faq-inner">
        <h3>
          {{ title }}
        </h3>

        <div class="faq-content">
          <div class="left">
            <div
              class="accordion"
              :class="{ active: question.isExpanded }"
              v-for="(question, index) in questions"
              :key="index"
            >
              <button @click="() => handleAccordion(index)">
                <span>
                  <PlusIcon />
                </span>
                <p>
                  {{ question.NAME }}
                </p>
              </button>
              <Collapse :when="questions[index].isExpanded" class="collapse">
                <p>
                  {{ question.PREVIEW_TEXT }}
                </p>
              </Collapse>
            </div>
          </div>
          <div class="right">
            <div class="image-wrapper">
              <div class="image-wrapper-inner">
                <img
                  :src="`https://admin.кальяннадом.рф/${img}`"
                  alt="hookah"
                />

                <div class="coals">
                  <div>
                    <img
                      src="@/shared/assets/images/coals-reverse/1.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="@/shared/assets/images/coals-reverse/2.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="@/shared/assets/images/coals-reverse/3.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="@/shared/assets/images/coals-reverse/4.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="@/shared/assets/images/coals-reverse/5.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="@/shared/assets/images/coals-reverse/6.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="faq-about" v-if="hasInfo">
          <div
            class="left"
            v-html="textLeft?.TEXT && he.decode(textLeft?.TEXT)"
          ></div>
          <div
            class="right"
            v-html="textRight?.TEXT && he.decode(textRight?.TEXT)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.faq {
  background: var(--white-color);
  padding-top: 130px;
  padding-bottom: 130px;
  @media (max-width: $tab) {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .faq-inner {
    h3 {
      font-weight: 400;
      font-size: 64px;
      line-height: 54px;
      color: var(--text-color);
      text-transform: uppercase;
      letter-spacing: -2px;
      @media (max-width: $tab) {
        font-size: 35px;
        line-height: 29px;
      }
    }
    .faq-content {
      margin-top: 50px;
      display: flex;
      gap: 20px;
      @media (max-width: $tab) {
        flex-direction: column;
        margin-top: 20px;
      }
      .left {
        width: 50%;
        @media (max-width: $tab) {
          width: 100%;
        }
        .accordion.active {
          button {
            p {
              color: var(--hover-color);
            }
            span {
              svg {
                transform: rotate(45deg);
                stroke: var(--hover-color);
              }
            }
          }
        }
        .accordion {
          border-bottom: 1px solid var(--text-color);
          padding-bottom: 20px;
          padding-top: 20px;
          button {
            display: flex;
            gap: 30px;
            align-items: center;
            p {
              font-weight: 400;
              font-size: 24px;
              line-height: 26px;
              color: var(--text-color);
              text-align: left;
              transition: var(--trs-300);
              text-transform: uppercase;
            }
            span {
              svg {
                stroke: var(--text-color);
                transition: var(--trs-300);
              }
            }
          }
          .collapse {
            p {
              font-weight: 400;
              font-size: 16px;
              line-height: 24px;
              color: var(--text-color);
              padding-top: 20px;
              padding-left: 80px;
            }
          }
        }
      }
      .right {
        width: 50%;
        @media (max-width: $tab) {
          width: 100%;
          height: calc(30vw * 3);
        }
        .image-wrapper {
          width: 100%;
          height: 100%;
          padding: 20px 20px 60px 20px;
          background: var(--bg-color);
          position: relative;
          max-height: 700px;
          @media (max-width: $tab) {
            padding: 10px 10px 30px 10px;
          }
          &:after {
            content: "";
            position: absolute;
            background: var(--text-color);
            width: 20px;
            height: 20px;
            border-radius: 999px;
            bottom: 20px;
            right: 20px;
            @media (max-width: $tab) {
              width: 12px;
              height: 12px;
              bottom: 10px;
              right: 10px;
            }
          }
          .image-wrapper-inner {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            .coals {
              position: absolute;
              bottom: 170px;
              width: 360px;
              height: 240px;
              right: 0;
              // transform: rotate(10deg);
              z-index: 2;
              @media (max-width: $tab) {
                bottom: auto;
                top: 36%;
              }
              @media (max-width: $pre-mob) {
                top: 10%;
              }
              @media (max-width: $mob) {
                width: 168px;
                height: 108px;
                top: 20%;
              }
              & > div {
                width: 100%;
                height: 100%;
                position: absolute;
                &:nth-child(1) {
                  width: 73px;
                  height: 70px;
                  bottom: 106px;
                  right: 210px;

                  @media (max-width: $tab) {
                    width: 53px;
                    height: 50px;
                  }
                  @media (max-width: $mob) {
                    right: 107px;
                    width: 34px;
                    height: 28px;
                    bottom: 50px;
                  }
                }
                &:nth-child(2) {
                  width: 40px;
                  height: 36px;
                  bottom: 170px;
                  right: 160px;

                  @media (max-width: $tab) {
                    width: 20px;
                    height: 16px;
                  }
                  @media (max-width: $mob) {
                    right: 82px;
                    bottom: 86px;
                  }
                }
                &:nth-child(3) {
                  width: 25px;
                  height: 28px;
                  bottom: 130px;
                  right: 123px;
                  @media (max-width: $tab) {
                    width: 15px;
                    height: 18px;
                  }
                  @media (max-width: $mob) {
                    right: 63px;
                    bottom: 64px;
                  }
                }
                &:nth-child(4) {
                  width: 116px;
                  height: 98px;
                  bottom: 20px;
                  right: 100px;
                  @media (max-width: $tab) {
                    width: 96px;
                    height: 78px;
                  }
                  @media (max-width: $mob) {
                    right: 45px;
                    width: 51px;
                    bottom: 13px;
                    height: 47px;
                  }
                }
                &:nth-child(5) {
                  width: 68px;
                  height: 79px;
                  right: 26px;
                  bottom: 109px;
                  @media (max-width: $tab) {
                    width: 48px;
                    height: 59px;
                  }
                  @media (max-width: $mob) {
                    right: 6px;
                    width: 33px;
                    height: 34px;
                    bottom: 46px;
                  }
                }
                &:nth-child(6) {
                  width: 75px;
                  height: 112px;
                  bottom: 0;
                  right: -25px;
                  @media (max-width: $tab) {
                    width: 55px;
                    height: 92px;
                  }
                  @media (max-width: $mob) {
                    height: 48px;
                    width: 50px;
                    img {
                      object-fit: contain;
                    }
                  }
                }
              }
              img {
                object-fit: cover;
                width: 100%;
                height: 100%;
              }
            }
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .coals {
            position: absolute;
            width: 360px;
            height: 280px;
            top: 90px;
            right: 0;
            overflow: contain;
            @media (max-width: $pre-mob) {
              width: 168px;
              height: 108px;
            }
          }
        }
      }
    }
    .faq-about {
      display: flex;
      margin-top: 130px;
      border-top: 1px solid var(--text-color);

      @media (max-width: $tab-sm) {
        flex-direction: column;
        margin-top: 80px;
      }
      .left {
        width: 50%;
        padding-top: 100px;
        padding-right: 120px;
        @media (max-width: $tab) {
          padding-top: 50px;
          padding-right: 0;
        }
        @media (max-width: $tab-sm) {
          width: 100%;
        }
        h5,
        p {
          position: relative;
          font-weight: 400;
          font-size: 32px;
          line-height: 35px;
          color: var(--text-color);
          text-transform: uppercase;
          @media (max-width: $tab-sm) {
            font-size: 24px;
            line-height: 26px;
          }
          &:before {
            content: "";
            position: absolute;
            background: var(--text-color);
            border-radius: 999px;
            width: 20px;
            height: 20px;
            top: -50px;
            left: 0;
            @media (max-width: $tab) {
              top: -25px;
            }
            @media (max-width: $tab-sm) {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
      .right {
        width: 50%;
        padding-top: 100px;
        position: relative;
        @media (max-width: $tab-sm) {
          width: 100%;
          padding-top: 20px;
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
          font-weight: 400;
          color: var(--text-color);
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
