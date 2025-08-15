<script setup lang="jsx">
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Features } from "@/widgets/features";
import { Stamps } from "@/widgets/stamps";
import { Faq } from "@/widgets/faq";
import { Contacts } from "@/widgets/contacts";
import heroImg from "@/shared/assets/images/hero-photo3.jpg";
import hookahFaqImg from "@/shared/assets/images/hookah-white.jpg";
import Cost from "./Cost.vue";
import { onMounted, ref } from "vue";

import { featureList, stampsList } from "../config";
import contactsImg from "@/shared/assets/images/gallery/5.jpg";

const deliveryData = ref([]);
const questions = ref([]);

const { data, error } = await useAsyncData("delivery-page-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/delivery/");

    return {
      deliveryData: response.ROOT,
      questions:
        response.ROOT.CONTENT.FAQ?.map((faqObj) => ({
          ...faqObj,
          isExpanded: false,
        })) || [],
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { deliveryData: {}, questions: [] };
  }
});
deliveryData.value = data.value.deliveryData;
questions.value = data.value.questions;
</script>

<template>
  <main class="delivery-page">
    <Hero
      modalTitle="Закажите доставку фруктовых чаш"
      modalBtnTitle="Заказать доставку"
      :title="deliveryData.NAME"
      :isMain="false"
      :cost="''"
      :costDescr="
        deliveryData?.CONTENT && deliveryData?.CONTENT['Описание Слева']?.TEXT
      "
      :list="
        deliveryData?.CONTENT && deliveryData?.CONTENT['Описание Справа']?.TEXT
      "
      :imgs="[deliveryData?.CONTENT && deliveryData?.CONTENT['Картинка']]"
      btnText="Заказать доставку"
    />

    <Features
      :featureList="
        deliveryData?.CONTENT && deliveryData?.CONTENT['Преимущества']
      "
      :isWhite="true"
    />
    <Stamps
      :stampsList="deliveryData?.CONTENT && deliveryData?.CONTENT['Марки']"
      :title="deliveryData?.CONTENT && deliveryData?.CONTENT['Марки Заголовок']"
    />
    <Cost />
    <Faq
      :questions="questions"
      :img="deliveryData?.CONTENT && deliveryData?.CONTENT['FAQ Картинка']"
      :hasInfo="true"
      :textLeft="
        deliveryData?.CONTENT && deliveryData?.CONTENT['FAQ Текст Слева']
      "
      :textRight="
        deliveryData?.CONTENT && deliveryData?.CONTENT['FAQ Текст Справа']
      "
      :title="deliveryData?.CONTENT && deliveryData?.CONTENT['FAQ Заголовок']"
    />
    <Contacts
      :title="deliveryData?.CONTENT && deliveryData?.CONTENT['Форма Заголовок']"
      :tabs="['на дом', 'в офис', 'на дачу', 'в лофт']"
      btnText="заказать доставку"
      :imgs="[contactsImg, contactsImg, contactsImg, contactsImg]"
    />
  </main>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;
.delivery-page {
  .features {
    padding-bottom: 150px;
    @media (max-width: $tab) {
      padding-bottom: 80px;
    }
    .features-inner {
      @media (max-width: $tab) {
        padding-top: 30px !important;
      }
    }
  }
}
</style>
