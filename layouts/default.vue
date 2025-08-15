<script setup>
import "@/shared/styles/index.scss";
import { Catering } from "@/pages/catering";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Modal } from "@/widgets/modal";
import { SuccessModal } from "@/widgets/success-modal";
import { MobileMenu } from "@/widgets/mobile-menu";
import { useModalStore } from "@/entities/modal-store";
import { ref, watch } from "vue";
const modal = useModalStore();
const router = useRoute();
const metaValue = ref();

const route = useRoute();
const { data: metaData } = await useAsyncData("global-meta", async () => {
  const response = await $fetch("https://admin.кальяннадом.рф/meta/");

  metaValue.value = response.find((meta) => meta.NAME === route.path);
});

useSeoMeta({
  title: () => metaValue.value?.CONTENT?.Title || "кальян на дом",
  description: () => metaValue.value?.CONTENT?.Description || "",
  keywords: () => metaValue.value?.CONTENT?.Keywords || "",
});

route.meta.scrollTo = {
  top: 0,
  behavior: "instant",
};
watch(
  () => route.path,
  async () => {
    await refreshNuxtData("global-meta");
  }
);
</script>

<template>
  <Header />
  <slot />
  <Footer />
  <MobileMenu />
  <Modal
    :title="modal.orderTitle"
    :btnText="modal.orderBtnTitle"
    :isActive="modal.orderModalIsOpen"
    :handleClose="modal.handleOpenOrderModal"
  />
  <Modal
    title="у вас есть вопросы?"
    btnText="отправить"
    :isActive="modal.questionModalIsOpen"
    :handleClose="modal.handleOpenQuestionModal"
  />
  <SuccessModal
    :isActive="modal.successModalIsOpen"
    :handleClose="modal.handleOpenSuccessModal"
  />
</template>
