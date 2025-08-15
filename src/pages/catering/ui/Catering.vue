<script setup>
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Features } from "@/widgets/features";
import Cost from "./Cost.vue";
import Partners from "./Partners.vue";
import { Stamps } from "@/widgets/stamps";
import { Delivery } from "@/widgets/delivery";
import { Gallery } from "@/widgets/gallery";
import { Faq } from "@/widgets/faq";
import { Contacts } from "@/widgets/contacts";

import heroImg from "@/shared/assets/images/hero-photo2.jpg";
import hookahImg from "@/shared/assets/images/hookah2.png";
import hookahFaqImg from "@/shared/assets/images/hookah-white2.jpg";

import { ordersInfo, featureList, stampsList } from "../config";
import { onMounted, ref } from "vue";

const costDescr = "<p>Заказ кальяна <br/> на мероприятие</p>";
const list =
  "<ul><li>По Москве и области</li><li>Работаем с физ лицами и организациями</li></ul>";

const cateringData = ref([]);
const questions = ref([]);

const { data, error } = await useAsyncData("catering-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/catering/");

    return {
      cateringData: response.ROOT.CONTENT,
      questions:
        response.ROOT.CONTENT["Вопросы-ответы"]?.map((faqObj) => ({
          ...faqObj,
          isExpanded: false,
        })) || [],
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { cateringData: {}, questions: [] };
  }
});
cateringData.value = data.value.cateringData;
questions.value = data.value.questions;
</script>

<template>
  <main>
    <Hero
      modalTitle="Закажите кейтеринг"
      modalBtnTitle="Заказать кейтеринг"
      :title="'кальянный кейтеринг'"
      :isMain="false"
      :cost="cateringData['Цена']"
      :costDescr="costDescr"
      :list="list"
      :imgs="[cateringData['Картинка']]"
      btnText="Заказать кейтеринг"
    />
    <About
      :ordersInfo="cateringData['Входит в кейтеринг']"
      :title="cateringData['Лучший кальян Название']"
      :text="cateringData['Лучший кальян Описание']"
      :img="cateringData['Лучший кальян Картинка']"
      :listTitle="cateringData['Лучший кальян Заголовок']"
    />
    <Features :featureList="cateringData['Преимущества']" :isWhite="true" />
    <Cost />
    <Stamps
      :stampsList="cateringData['Марки']"
      :title="cateringData['Марки Заголовок']"
    />
    <Partners
      :partners="cateringData['Партнеры']"
      :title="cateringData['Партнеры Заголовок']"
    />
    <Gallery />
    <Faq
      :questions="questions"
      :img="cateringData['Вопросы-ответы Картинка']"
      :hasInfo="true"
      :textLeft="cateringData['Текст под FAQ Слева']"
      :textRight="cateringData['Текст под FAQ Справа']"
      :title="cateringData['FAQ Заголовок']"
    />
    <Contacts
      btnText="заказать кейтеринг"
      :title="cateringData['Форма Заголовок']"
    />
  </main>
</template>
