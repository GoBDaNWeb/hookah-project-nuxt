tem
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import { ref } from "vue";
import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@/shared/ui/button";
import { ArrowLeftIcon } from "@/shared/icons";
import { ArrowRightIcon } from "@/shared/icons";

const modules = ref([Navigation, Pagination]);
const prev = ref(null);
const next = ref(null);
const pagination = ref(null);
defineProps(["imgs"]);
</script>

<template>
  <div class="swiper-wrapper manual-swiper">
    <Swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :navigation="{
        prevEl: prev,
        nextEl: next,
      }"
      :pagination="{
        el: pagination,
        clickable: true,
      }"
      :modules="modules"
      class="stamp-swiper"
    >
      <SwiperSlide v-for="(img, index) in imgs" :key="index">
        <div class="image-wrapper">
          <img :src="img" alt="photo" />
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="func">
      <button ref="prev" variant="clear"><ArrowLeftIcon /></button>
      <div ref="pagination" class="pagination"></div>
      <button ref="next" variant="clear"><ArrowRightIcon /></button>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.manual-swiper {
  .swiper {
    height: 100%;
  }
  .func {
    display: flex;
    align-items: center;
    gap: 50px;
    @media (max-width: $tab) {
      gap: 20px;
      justify-content: space-between;
    }
    button {
      @media (max-width: $tab-sm) {
        width: 20px;
        height: 20px;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    .pagination {
      display: flex;
      gap: 10px;
      align-items: center;
      .swiper-pagination-bullet-active {
        background: var(--text-color);
      }
      .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        display: block;
        border: 1px solid var(--text-color);
        border-radius: 999px;
        transition: var(--trs-300);
        cursor: pointer;
        @media (max-width: $tab-sm) {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.swiper-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: var(--white-color);
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  .func {
    .pagination {
      .swiper-pagination-bullet {
      }
    }
  }
  .stamp-swiper {
    width: 100%;
    .image-wrapper {
      img {
        width: 100%;
        height: 100%;
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
        background: var(--text-color);
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
