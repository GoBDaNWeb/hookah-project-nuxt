<script setup>
import he from "he";

defineProps(["manualData"]);
</script>

<template>
  <div class="options">
    <div class="container">
      <div class="options-inner">
        <h3>дополнительные опции</h3>
        <div class="options-list">
          <div
            class="option-item"
            v-for="(item, index) in manualData"
            :key="index"
          >
            <div class="image-wrapper">
              <img
                :src="`https://admin.кальяннадом.рф/${item.PREVIEW_PICTURE}`"
                alt="photo"
              />
            </div>
            <h5>{{ item.NAME }}</h5>
            <span v-if="item.PRICE">{{ item.PRICE }}</span>
            <div
              v-html="item['~PREVIEW_TEXT'] && he.decode(item['~PREVIEW_TEXT'])"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.options {
  background: var(--white-color);
  padding-bottom: 130px;
  @media (max-width: $tab) {
    padding-bottom: 80px;
  }
  .options-inner {
    h3 {
      font-weight: 400;
      font-size: 64px;
      line-height: 54px;
      color: var(--text-color);
      margin-bottom: 50px;
      text-transform: uppercase;
      padding-left: 30px;
      letter-spacing: -2px;
      @media (max-width: $tab) {
        padding-left: 0;
        font-size: 35px;
        line-height: 29px;
      }
    }
    .options-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border-top: 1px solid var(--text-color);
      @media (max-width: $desktop-sm) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: $tab) {
        grid-template-columns: repeat(1, 1fr);
      }
      .option-item {
        height: fit-content;
        padding-top: 50px;
        position: relative;
        padding-left: 35px;
        max-width: 373px;
        @media (max-width: $desktop-sm) {
          max-width: 100%;
        }
        @media (max-width: $tab) {
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
          @media (max-width: $desktop-sm) {
            display: none;
          }
        }
        .image-wrapper {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        h5 {
          font-weight: 400;
          font-size: 32px;
          line-height: 35px;
          color: var(--text-color);
          margin-top: 50px;
          text-transform: uppercase;
          margin-bottom: 20px;
          @media (max-width: $tab) {
            margin-top: 20px;
            font-size: 24px;
            line-height: 26px;
          }
        }
        span {
          position: relative;
          font-weight: 600;
          font-size: 24px;
          line-height: 26px;
          color: var(--text-color);
          padding-left: 35px;
          display: block;
          margin-bottom: 20px;
          @media (max-width: $tab) {
            font-size: 20px;
            line-height: 22px;
            padding-left: 22px;
          }
          &:before {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            background: var(--text-color);
            top: 0;
            bottom: 0;
            margin: auto;
            left: 0;
            border-radius: 999px;
            @media (max-width: $tab) {
              width: 12px;
              height: 12px;
            }
          }
        }
        p {
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: var(--text-color);
        }
        ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          row-gap: 11px;
          margin-top: 15px;
          li {
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: var(--text-color);
            position: relative;
            padding-left: 30px;
            @media (max-width: $tab) {
              padding-left: 15px;
            }

            &:before {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              margin: auto;
              left: 0;
              width: 10px;
              height: 10px;
              border-radius: 999px;
              background: var(--text-color);
              @media (max-width: $tab) {
                width: 5px;
                height: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
