<script setup>
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Features } from "@/widgets/features";
import { Cost } from "@/widgets/cost";
import { Stamps } from "@/widgets/stamps";
import { Delivery } from "@/widgets/delivery";
import { Reviews } from "@/widgets/reviews";
import { Gallery } from "@/widgets/gallery";
import { Faq } from "@/widgets/faq";
import { Contacts } from "@/widgets/contacts";
import contactsImg from "@/shared/assets/images/gallery/5.jpg";

const costDescr = "<p>Стоимость <br/> без учета доставки</p>";

const mainData = ref([]);
const questions = ref([]);

const { data, error } = await useAsyncData("main-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/");

    return {
      mainData: response.ROOT.CONTENT,
      questions:
        response.ROOT.CONTENT.FAQ?.map((faqObj) => ({
          ...faqObj,
          isExpanded: false,
        })) || [],
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { mainData: {}, questions: [] };
  }
});
mainData.value = data.value.mainData;
questions.value = data.value.questions;
</script>

<template>
  <main>
    <Hero
      modalTitle="Закажите кальян"
      modalBtnTitle="Заказать кальян"
      :title="mainData['Навание на Первом экране']"
      :isMain="true"
      :tabs="['на дом', 'в офис', 'на дачу', 'в лофт']"
      :cost="mainData['Цена на Первом экране']"
      :costDescr="costDescr"
      :list="mainData['Описание на Первом экране']?.TEXT"
      :imgs="mainData['Главный слайдер']"
      btnText="Заказать кальян"
    />
    <About
      :text="mainData['Лучший кальян Описание']"
      :ordersInfo="mainData['В заказ входит']"
      :img="mainData['Лучший кальян Картинка']"
      :title="mainData['Лучший кальян Название']"
      :isGrid="true"
      :listTitle="mainData['В заказ входит Заголовок']"
    />
    <Features :featureList="mainData['Преимущества']" />
    <Cost />
    <Stamps
      :hasArrow="true"
      :hasBtn="true"
      :stampsList="mainData['Марки']"
      :howWorkList="mainData['Как это работает']"
      :title="mainData['Марки Заголовок']"
      :howWorkTitle="mainData['Как это работает Заголовок']"
    />
    <Delivery />
    <Reviews :reviewData="mainData" />
    <Gallery />
    <Faq
      :questions="questions"
      :img="mainData['FAQ Картинка']"
      :hasInfo="true"
      :textLeft="mainData['FAQ Текст Слева']"
      :textRight="mainData['FAQ Текст Справа']"
      :title="mainData['FAQ Заголовок']"
    />
    <Contacts
      :tabs="['на дом', 'в офис', 'на дачу', 'в лофт']"
      :title="mainData['Форма Заголовок']"
      :imgs="[contactsImg, contactsImg, contactsImg, contactsImg]"
      btnText="заказать кальян"
    />
  </main>
</template>
