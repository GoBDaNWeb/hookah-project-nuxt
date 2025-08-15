<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted, watch } from "vue";
import "swiper/css";

const props = defineProps(["imgs", "currentTab"]);

const swiperRef = ref(null);
const setSwiperRef = (swiper) => {
  swiperRef.value = swiper;
};

watch(
  () => props.currentTab,
  () => {
    swiperRef.value.slideTo(props.currentTab);
  }
);
</script>

<template>
  <div class="cost-swiper">
    <Swiper
      :slidesPerView="1"
      :spaceBetween="10"
      class="cost-swiper"
      @swiper="setSwiperRef"
      :allowTouchMove="false"
      :grabCursor="false"
    >
      <SwiperSlide v-for="(img, index) in imgs" :key="index">
        <div class="image-wrapper">
          <img
            :src="`https://admin.кальяннадом.рф/${img.PICTURE}`"
            alt="photo"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.hero-swiper {
}
</style>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.cost-swiper {
  width: 100%;
  .image-wrapper {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
