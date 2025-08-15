<script setup>
defineProps(["featureList", "isWhite"]);
</script>

<template>
  <div class="features">
    <div class="container">
      <div class="features-inner">
        <div
          class="feature"
          :class="isWhite ? 'white' : ''"
          v-for="(feature, index) in featureList"
          :key="index"
        >
          <div class="image-wrapper">
            <img
              :src="`https://admin.кальяннадом.рф/${feature['Картинки']}`"
              alt=""
            />
          </div>
          <span>{{ feature["Название"] }}</span>
          <p v-if="feature['Текст']">{{ feature["Текст"] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.features {
  background: var(--white-color);

  .features-inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    padding-top: 130px;
    position: relative;
    overflow: auto;
    padding-left: 35px;
    // border-bottom: 1px solid var(--text-color);
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
    height: 100%;
    &::-webkit-scrollbar {
      width: 0px;
    }

    @media (max-width: $desktop-md-2) {
      overflow: auto;
    }
    @media (max-width: $tab) {
      padding-top: 80px;
      margin-left: -20px;
      margin-right: -20px;
      gap: 20px;
      padding-left: 20px;
    }

    .feature.white {
      .image-wrapper {
        span {
          color: var(--white-color);
        }
      }
    }
    .feature {
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
      padding-bottom: 100px;
      // padding-left: 35px;
      @media (max-width: $tab) {
        padding-bottom: 60px;
      }
      @media (max-width: $tab-sm) {
        gap: 0;
      }
      &:before {
        content: "";
        position: absolute;
        height: 50px;
        width: 1px;
        background: var(--text-color);
        left: -35px;
        bottom: 0;
        @media (max-width: $tab) {
          left: 0;
          height: 20px;
        }
      }
      &:after {
        content: "";
        width: calc(100% + 60px);
        height: 1px;
        position: absolute;
        bottom: 0;
        left: -60px;
        background: var(--text-color);
        @media (max-width: $tab) {
          width: calc(100% + 20px);
          left: 0px;
        }
      }
      .image-wrapper {
        position: relative;
        margin-bottom: 16px;
        width: 295px;
        height: 175px;
        @media (max-width: $tab) {
          width: 263px;
          height: 156px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        span {
          position: absolute;
          top: 20px;
          right: 17px;
          font-weight: 400;
          font-size: 64px;
          line-height: 54px;
          color: var(--text-color);
          @media (max-width: $tab-sm) {
            font-size: 55px;
            line-height: 46px;
            top: 14px;
            right: 12px;
          }
        }
      }
      span {
        font-weight: 400;
        font-size: 24px;
        line-height: 26px;
        color: var(--text-color);
        text-transform: uppercase;
        @media (max-width: $tab-sm) {
          font-size: 20px;
          line-height: 22px;
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
}
</style>
