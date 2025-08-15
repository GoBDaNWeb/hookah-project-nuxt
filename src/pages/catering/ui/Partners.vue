<script setup>
import { StampsSwiper } from "@/entities/stamps-swiper";
import { PartnersSwiper } from "@/entities/partners-swiper";
import { partnersList } from "../config";

defineProps(["partners", "title"]);
</script>

<template>
  <div class="partners">
    <div class="container">
      <div class="partners-inner">
        <h3>{{ title }}</h3>
        <PartnersSwiper :partnerList="partners" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.partners {
  .partners-inner {
    position: relative;
    .swiper-wrapper {
      padding-top: 50px;
      .navigation {
        position: absolute;
        top: -50px;
        right: 0;
        @media (max-width: $tab) {
          display: none;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.partners {
  background: var(--white-color);
  .partners-inner {
    padding-top: 130px;
    padding-bottom: 135px;
    position: relative;
    @media (max-width: $tab) {
      padding-top: 80px;
      padding-bottom: 80px;
    }
    h3 {
      position: relative;
      font-weight: 400;
      font-size: 64px;
      line-height: 54px;
      color: var(--text-color);
      padding-left: 72px;
      text-transform: uppercase;
      @media (max-width: $tab) {
        padding-left: 40px;
        font-size: 35px;
        line-height: 29px;
      }
      &:before {
        content: "";
        position: absolute;
        width: 45px;
        height: 45px;
        background: var(--text-color);
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        border-radius: 999px;
        @media (max-width: $tab) {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
