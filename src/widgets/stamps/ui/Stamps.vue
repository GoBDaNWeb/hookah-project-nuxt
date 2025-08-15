<script setup>
import { StampsSwiper } from "@/entities/stamps-swiper";
import { BigArrowIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { RouterLink } from "vue-router";

defineProps([
  "stampsList",
  "howWorkList",
  "hasArrow",
  "hasBtn",
  "title",
  "howWorkTitle",
]);
</script>

<template>
  <div class="stamps">
    <div class="container">
      <div class="stamps-inner">
        <h3>
          {{ title }}
        </h3>

        <div class="description">
          <div class="left">
            <span>Большой выбор вкусов</span>
            <p>Подберём вкус и крепость по Вашему индивидуальному желанию!</p>
          </div>

          <div class="right">
            <span>наш табак не горчит и дает вкусный, насыщенный дым</span>
          </div>
        </div>
        <StampsSwiper :stampsList="stampsList" />
        <div class="how-work" v-if="howWorkList">
          <h3>{{ howWorkTitle }}</h3>

          <div class="how-work__list">
            <div
              class="how-work__item"
              v-for="(howWork, index) in howWorkList"
              :key="index"
            >
              <span class="number">
                0{{ index + 1 }}
                <span v-if="hasArrow"><BigArrowIcon /></span>
              </span>
              <p>{{ howWork }}</p>
              <!-- <RouterLink to="/manual" v-if="hasBtn"> инструкция </RouterLink> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.stamps {
  padding-top: 130px;
  padding-bottom: 130px;
  @media (max-width: $tab) {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .stamps-inner {
    display: flex;
    flex-direction: column;
    gap: 50px;
    @media (max-width: $tab) {
      margin-left: -20px;
      margin-right: -20px;
    }
    h3 {
      font-weight: 400;
      font-size: 64px;
      line-height: 54px;
      color: var(--text-color);
      text-transform: uppercase;
      position: relative;
      padding-left: 75px;
      letter-spacing: -2px;
      @media (max-width: $tab) {
        font-size: 35px;
        line-height: 29px;
        padding-left: 60px;
      }
      &:before {
        content: "";
        position: absolute;
        width: 45px;
        height: 45px;
        background: var(--text-color);
        left: 0;
        top: 8px;
        margin: auto;
        @media (max-width: $tab) {
          width: 30px;
          height: 30px;
          bottom: auto;
          left: 20px;
        }
      }
    }
    .description {
      display: flex;
      justify-content: space-between;
      gap: 80px;
      @media (max-width: $tab) {
        flex-direction: column;
        gap: 40px;
        padding-left: 20px;
        padding-right: 20px;
      }
      .left {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 25px;
        padding-left: 35px;
        border-left: 1px solid var(--text-color);
        @media (max-width: $tab) {
          width: 100%;
          gap: 15px;
          padding-left: 30px;
        }
      }
      .right {
        width: 50%;
        border-left: 1px solid var(--text-color);
        padding-left: 30px;
        @media (max-width: $tab) {
          width: 100%;
        }
      }
      span {
        font-weight: 400;
        font-size: 36px;
        line-height: 36px;
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
    .how-work {
      margin-top: 70px;
      padding-top: 30px;
      border-top: 1px solid var(--text-color);
      @media (max-width: $tab) {
        margin-top: 0;
      }
      h3 {
        position: relative;
        padding-left: 70px;
        text-transform: uppercase;
        @media (max-width: $tab) {
          padding-left: 64px;
        }

        &:before {
          content: "";
          position: absolute;
          width: 45px;
          height: 45px;
          background: var(--text-color);
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          @media (max-width: $tab) {
            width: 30px;
            height: 30px;
            bottom: auto;
            left: 20px;
          }
        }
      }
      .how-work__list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 80px;
        gap: 22px;
        @media (max-width: $desktop-md-2) {
          overflow: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(218, 235, 245, 0) rgba(218, 235, 245, 0);
          height: 100%;
          &::-webkit-scrollbar {
            height: 0px;
          }
        }
        @media (max-width: $tab) {
          padding-left: 20px;
          padding-right: 20px;
        }
        .how-work__item {
          display: flex;
          flex-direction: column;
          gap: 35px;
          max-width: 335px;
          padding-left: 30px;
          position: relative;
          height: 100%;
          width: 335px;
          @media (max-width: $tab) {
            gap: 20px;
            width: 263px;
          }
          &:before {
            content: "";
            position: absolute;
            height: 100%;
            width: 1px;
            left: 0;
            top: 0;
            background: var(--text-color);
          }
          .number {
            font-weight: 400;
            font-size: 64px;
            line-height: 54px;
            color: var(--text-color);
            display: flex;
            gap: 16px;
            @media (max-width: $tab) {
              font-size: 55px;
              line-height: 46px;
            }
            span {
              width: 100%;
              svg {
                width: 100%;
              }
            }
          }
          p {
            max-width: 257px;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: var(--text-color);
          }
          a {
            width: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--text-color);
            text-transform: uppercase;
            transition: var(--trs-300);
            border-radius: 99px;
            height: 35px;
            padding: 0 20px;
            font-weight: 500;
            font-size: 14px;
            letter-spacing: -7%;
            color: var(--text-color);
            &:hover {
              color: var(--hover-color);
              border-color: var(--hover-color);
            }
          }
        }
      }
    }
  }
}
</style>
