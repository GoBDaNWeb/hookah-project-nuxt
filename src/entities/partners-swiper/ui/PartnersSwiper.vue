<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { ref } from "vue";
import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@/shared/ui/button";
import { ArrowLeftIcon } from "@/shared/icons";
import { ArrowRightIcon } from "@/shared/icons";

const modules = ref([Navigation]);
const prev = ref(null);
const next = ref(null);

defineProps(["partnerList"]);
</script>

<template>
  <div class="swiper-wrapper">
    <div class="navigation">
      <button ref="prev" variant="clear"><ArrowLeftIcon /></button>
      <button ref="next" variant="clear"><ArrowRightIcon /></button>
    </div>
    <Swiper
      :slidesPerView="6"
      :spaceBetween="20"
      :navigation="{
        prevEl: prev,
        nextEl: next,
      }"
      :breakpoints="{
        0: { slidesPerView: 2.1, spaceBetween: 10 },
        767: { slidesPerView: 3.1 },
        1024: { slidesPerView: 4.1, spaceBetween: 10 },
        1280: { slidesPerView: 5.1, spaceBetween: 15 },
        1400: { slidesPerView: 6, spaceBetween: 15 },
      }"
      :modules="modules"
      class="partner-swiper"
    >
      <SwiperSlide v-for="(partner, index) in partnerList" :key="index">
        <div class="image-wrapper">
          <img :src="`https://admin.кальяннадом.рф/${partner}`" alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.swiper-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  .navigation {
    display: flex;
    justify-content: flex-end;
    gap: 30px;
  }
  .partner-swiper {
    width: 100%;
    .image-wrapper {
      height: 170px;
      background: var(--white-color);
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid var(--text-color);
      overflow: hidden;
      @media (max-width: $mob) {
        height: 118px;
      }
      img {
        width: 80%;
        /* height: 100%; */
        object-fit: cover;
      }
    }
    span {
      width: 80%;
      /* height: 100%; */
      object-fit: cover;
      font-weight: 400;
      font-size: 24px;
      color: var(--text-color);
      line-height: 26px;
      margin-top: 17px;
      position: relative;
      display: block;
      padding-left: 30px;
      text-transform: uppercase;
      letter-spacing: -2px;
      white-space: nowrap;
      &:before {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 999px;
        border: 1px solid var(--text-color);
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
