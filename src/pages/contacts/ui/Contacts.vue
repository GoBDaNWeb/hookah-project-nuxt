<script setup>
import { Contacts } from "@/widgets/contacts";
import img from "@/shared/assets/images/contacts2.jpg";
import { ref, onMounted } from "vue";
const contactsData = ref([]);

const { data, error } = await useAsyncData("contacts-page-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/tech/");

    return {
      contactsData: response.ROOT.CONTENT,
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { headerData: {} };
  }
});
contactsData.value = data.value.contactsData;
</script>

<template>
  <div class="contacts-page">
    <Contacts
      :img="img"
      :title="contactsData['Контакты Заголовок']"
      :badge="'свяжитесь с нами'"
      btnText="отправить"
    />
  </div>
</template>

<style lang="scss">
.contacts-page {
  .contacts-block {
    .contacts-inner {
      border-top: 1px solid var(--text-color);
      .left {
        padding-top: 0 !important;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.contacts-page {
  padding-top: 150px;
  @media (max-width: $tab) {
    padding-top: 100px;
  }
}
</style>
