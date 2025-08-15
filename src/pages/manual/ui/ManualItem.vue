<script setup>
import { ManualSwiper } from "@/entities/manual-swiper";
import he from "he";
defineProps(["index", "manual", "title"]);
</script>

<template>
  <div class="manual-item">
    <div class="left">
      <h1 v-if="manual.NAME === '01'">{{ title }}</h1>
      <div class="content" v-html="he.decode(manual['~PREVIEW_TEXT'])"></div>
    </div>
    <div class="right">
      <div class="image-wrapper">
        <img
          :src="`https://admin.кальяннадом.рф/${manual['PREVIEW_PICTURE']}`"
          alt="photo"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.manual-item {
  display: flex;
  align-items: center;
  gap: 55px;
  border-top: 1px solid var(--text-color);
  @media (max-width: $tab) {
    flex-direction: column;
    gap: 30px;
  }
  &:first-child {
    border-top: none;
    .left {
      padding-top: 0;
    }
    .right {
      padding-top: 20px;
      border-top: 1px solid var(--text-color);
      @media (max-width: $tab) {
        border-top: none;
      }
    }
  }
  .left {
    width: 50%;

    @media (max-width: $tab) {
      width: 100%;
      padding-top: 0;
    }
    h1 {
      font-weight: 400;
      font-size: 80px;
      line-height: 72px;
      text-transform: uppercase;
      color: var(--text-color);
      margin-bottom: 50px;
      @media (max-width: $desktop-sm) {
        font-size: 60px;
        line-height: 52px;
      }
      @media (max-width: $tab) {
        font-size: 35px;
        line-height: 29px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--text-color);
        margin-bottom: 20px;
      }
    }
    h4 {
      font-weight: 400;
      font-size: 64px;
      line-height: 54px;
      color: var(--text-color);
      @media (max-width: $tab) {
        font-size: 35px;
        line-height: 29px;
      }
    }
    h5 {
      color: var(--text-color);
      text-transform: uppercase;
      font-weight: 400;
      font-size: 32px;
      line-height: 35px;
      margin-top: 50px;
      @media (max-width: $tab) {
        font-size: 24px;
        line-height: 26px;
        margin-top: 30px;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 30px;
      @media (max-width: $tab) {
        margin-top: 20px;
      }
      li {
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: var(--text-color);

        position: relative;
        padding-left: 30px;
        @media (max-width: $tab) {
          padding-left: 20px;
        }
        &:before {
          content: "";
          position: absolute;
          top: 5px;
          left: 0;
          width: 10px;
          height: 10px;
          background: var(--text-color);
          border-radius: 999px;
          @media (max-width: $tab) {
            width: 5px;
            height: 5px;
            top: 8px;
          }
        }
      }
    }
    h6 {
      font-weight: 400;
      font-size: 24px;
      line-height: 26px;
      color: var(--text-color);
      text-transform: uppercase;
      margin-top: 50px;
      @media (max-width: $tab) {
        margin-top: 30px;
        font-size: 20px;
        line-height: 22px;
      }
    }
  }
  .right {
    padding-top: 20px;
    padding-bottom: 20px;
    width: 50%;
    @media (max-width: $tab) {
      width: 100%;
    }
    .image-wrapper {
      background: var(--white-color);
      padding: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
