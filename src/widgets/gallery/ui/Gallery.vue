<script setup>
import galleryImg1 from "@/shared/assets/images/gallery/1.jpg";
import galleryImg2 from "@/shared/assets/images/gallery/2.jpg";
import galleryImg3 from "@/shared/assets/images/gallery/3.jpg";
import galleryImg4 from "@/shared/assets/images/gallery/4.jpg";
import galleryImg5 from "@/shared/assets/images/gallery/5.jpg";
import galleryImg6 from "@/shared/assets/images/gallery/6.jpg";
import galleryImg7 from "@/shared/assets/images/gallery/7.jpg";
import galleryImg8 from "@/shared/assets/images/gallery/8.jpg";
import galleryImg9 from "@/shared/assets/images/gallery/9.jpg";
import galleryImg10 from "@/shared/assets/images/gallery/10.jpg";
import { Fancybox } from "@/widgets/fancybox";
import { onMounted, ref } from "vue";

const galleyData = ref([]);

const { data, error } = await useAsyncData("gallery-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/");

    return {
      galleyData: response.ROOT.CONTENT,
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { galleyData: {} };
  }
});
galleyData.value = data.value.galleyData;
</script>

<template>
  <div class="gallery">
    <div class="container">
      <div class="gallery-inner">
        <h3>{{ galleyData["Кальяны в деле Заголовок"] }}</h3>

        <Fancybox>
          <div class="gallery-content">
            <a
              v-for="(img, index) in galleyData['Кальяны в деле']"
              :key="index"
              data-fancybox="gallery"
              :href="`https://admin.кальяннадом.рф/${img}`"
              :class="`image-wrapper cell--${index + 1}`"
            >
              <img :src="`https://admin.кальяннадом.рф/${img}`" alt="" />
            </a>
          </div>
        </Fancybox>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.gallery {
  background: var(--white-color);
  .gallery-inner {
    padding-top: 30px;
    border-top: 1px solid var(--text-color);
    h3 {
      font-weight: 400;
      font-size: 64px;
      line-height: 54px;
      color: var(--text-color);
      position: relative;
      padding-left: 70px;
      text-transform: uppercase;
      @media (max-width: $tab) {
        font-size: 35px;
        line-height: 29px;
        padding-left: 40px;
      }
      &:before {
        content: "";
        position: absolute;
        background: var(--text-color);
        width: 45px;
        height: 45px;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        @media (max-width: $tab) {
          width: 30px;
          height: 30px;
        }
      }
    }
    .gallery-content {
      margin-top: 50px;
      // display: flex;
      // gap: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 20px;
      @media (max-width: $tab-sm) {
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: repeat(2, 1fr);
      }
      .cell--1 {
        grid-column: 1 / 1;
        grid-row: 1 / 1;
        padding-bottom: 50%;
        @media (max-width: $tab-sm) {
          padding-bottom: 25%;
        }
      }

      .cell--2 {
        grid-column: 2 / 2;
        grid-row: 1/ 1;
        padding-bottom: 50%;
        @media (max-width: $tab-sm) {
          padding-bottom: 25%;
        }
      }

      .cell--3 {
        grid-column: 1 / 1;
        grid-row: 2 / 2;
        padding-bottom: 50%;
        @media (max-width: $tab-sm) {
          padding-bottom: 25%;
        }
      }

      .cell--4 {
        grid-column: 2 / 2;
        grid-row: 2 /2;
        padding-bottom: 50%;
        @media (max-width: $tab-sm) {
          padding-bottom: 25%;
        }
      }

      .cell--5 {
        grid-column: 1 / 3;
        grid-row: 3 / 5;
        padding-bottom: 100%;
        @media (max-width: $tab-sm) {
          grid-column: 1 / 3;
          grid-row: 3 / 4;
          padding-bottom: 75%;
        }
      }

      .cell--6 {
        grid-column: 3 / 5;
        grid-row: 1 / 3;
        padding-bottom: 100%;
        @media (max-width: $tab-sm) {
          grid-column: 1 / 3;
          grid-row: 4 / 5;
          padding-bottom: 75%;
        }
      }

      .cell--7 {
        grid-column: 3 / 3;
        grid-row: 3 / 3;
        padding-bottom: 50%;
        @media (max-width: $tab-sm) {
          grid-column: 1 / 1;
          grid-row: 5 / 5;
          padding-bottom: 25%;
        }
      }

      .cell--8 {
        grid-column: 4 / 4;
        grid-row: 3 / 4;
        padding-bottom: 50%;
        @media (max-width: $tab-sm) {
          grid-column: 2 / 2;
          grid-row: 5 / 5;
          padding-bottom: 25%;
        }
      }
      .cell--9 {
        grid-column: 3 / 3;
        grid-row: 4 / 4;
        padding-bottom: 50%;
        @media (max-width: $tab-sm) {
          grid-column: 1 / 1;
          grid-row: 6 / 6;
          padding-bottom: 25%;
        }
      }

      .cell--10 {
        grid-column: 4 / 4;
        grid-row: 4 / 4;
        padding-bottom: 50%;
        @media (max-width: $tab-sm) {
          grid-column: 2 / 2;
          grid-row: 6 / 6;
          padding-bottom: 25%;
        }
      }
      .image-wrapper {
        position: relative;
        overflow: hidden;
        display: block;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
