<script setup>
import { TelegramIcon } from "@/shared/icons";
import { WhatsappIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { Contacts } from "@/widgets/contacts";
import ManualItem from "./ManualItem.vue";
import Options from "./Options.vue";
import { Faq } from "@/widgets/faq";
import { manualList } from "../config";
import hookahFaqImg from "@/shared/assets/images/hookah-white.jpg";
import contactsImg from "@/shared/assets/images/gallery/5.jpg";
import { onMounted, ref, reactive } from "vue";
import he from "he";
const manualData = ref([]);
const manualDopData = ref([]);
const faqData = ref([]);
const faqImageData = ref([]);
const techData = ref([]);
const questions = ref([]);

const { data, error } = await useAsyncData("manual-page-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/manual/");
    const response2 = await $fetch("https://admin.кальяннадом.рф/tech/");
    const response3 = await $fetch("https://admin.кальяннадом.рф/");

    return {
      manualData: response,
      faqData: response2,
      faqImageData: response3,
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { manualData: {}, faqData: [], faqImageData: {} };
  }
});
manualData.value = data.value.manualData.ROOT;
manualDopData.value = data.value.manualData.DOP;
faqImageData.value = data.value.faqImageData.ROOT.CONTENT;

questions.value = data.value.faqData.ROOT.CONTENT["Инструкция FAQ "].map(
  (faqObj) => {
    return { ...faqObj, isExpanded: false };
  }
);
</script>

<template>
  <div class="manual">
    <div class="container">
      <div class="manual-inner">
        <ManualItem
          v-for="(manual, index) in manualData"
          :key="index"
          :index="index"
          :manual="manual"
          :title="techData && techData['Инструкция Заголовок']"
        />
        <div class="info">
          <div
            class="text"
            v-html="
              techData &&
              techData['Инструкция Связаться'] &&
              techData['Инструкция Связаться'].TEXT &&
              he.decode(techData['Инструкция Связаться'].TEXT)
            "
          ></div>

          <div class="contacts">
            <div class="socials">
              <a
                :href="techData && techData['Телеграм']"
                target="_blank"
                class="social tg"
              >
                <TelegramIcon />
              </a>
              <a
                :href="techData && techData['Whatsapp']"
                target="_blank"
                class="social wa"
              >
                <WhatsappIcon />
              </a>
            </div>
            <a :href="`tel:${techData && techData['Телефон']}`">{{
              techData["Телефон"]
            }}</a>
          </div>
        </div>
      </div>
    </div>
    <Faq
      :questions="questions"
      :img="faqImageData['FAQ Картинка']"
      :title="techData && techData['Инструкция FAQ Заголовок']"
    />
    <Options :manualData="manualDopData" />
    <Contacts
      :title="techData && techData['Инструкция Форма Заголовок']"
      :tabs="['на дом', 'в офис', 'на дачу', 'в лофт']"
      :imgs="[contactsImg, contactsImg, contactsImg, contactsImg]"
      btnText="заказать доставку"
    />
  </div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.manual {
  padding-top: 175px;
  @media (max-width: $tab) {
    padding-top: 100px;
  }
  .manual-inner {
    .info {
      padding-top: 100px;
      padding-bottom: 100px;
      border-top: 1px solid var(--text-color);
      @media (max-width: $tab) {
        padding-top: 80px;
        padding-bottom: 80px;
      }
      h3 {
        font-weight: 400;
        font-size: 64px;
        line-height: 54px;
        color: var(--text-color);
        position: relative;
        padding-left: 70px;
        text-transform: uppercase;
        margin-bottom: 30px;
        @media (max-width: $tab) {
          padding-left: 50px;
          font-size: 30px;
          line-height: 25px;
        }
        &:before {
          content: "";
          position: absolute;
          width: 45px;
          height: 45px;
          border-radius: 999px;
          background: var(--text-color);
          top: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          @media (max-width: $tab) {
            width: 30px;
            height: 30px;
          }
        }
      }
      span {
        padding-left: 70px;
        font-weight: 400;
        font-size: 24px;
        line-height: 26px;
        color: var(--text-color);
        display: block;
        text-transform: uppercase;
        @media (max-width: $tab) {
          font-size: 20px;
          line-height: 22px;
          padding-left: 53px;
        }
      }
      .contacts {
        display: flex;
        align-items: center;
        gap: 30px;
        padding-left: 70px;
        margin-top: 50px;
        @media (max-width: $tab) {
          padding-left: 0;
          margin-top: 20px;
        }
        a {
          font-weight: 600;
          font-size: 24px;
          line-height: 24px;
          letter-spacing: -2px;
          white-space: nowrap;
          color: var(--text-color);
          transition: var(--trs-300);
          &:hover {
            color: var(--hover-color);
          }
        }
        .socials {
          display: flex;
          align-items: center;
          gap: 10px;
          a {
            width: 60px;
            height: 60px;
            @media (max-width: $tab) {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }
  }
}
</style>
