<script setup>
import { Button } from "@/shared/ui/button";
import { TelegramIcon } from "@/shared/icons";
import { ParadigmaIcon } from "@/shared/icons";
import { WhatsappIcon } from "@/shared/icons";
import { ContactsSwiper } from "@/entities/contacts-swiper";
import { Contacts } from "@/widgets/contacts";
import img from "@/shared/assets/images/contacts1.jpg";
import { onMounted, ref, reactive, watch } from "vue";
import he from "he";
import { useModalStore } from "@/entities/modal-store";

function buildText() {
  const lines = [
    "📝 Новая заявка с сайта",
    formValues.username ? `Имя: ${formValues.username}` : "",
    formValues.phoneValue ? `Телефон: ${formValues.phoneValue}` : "",
    `Страница: ${window.location.href}`,
  ].filter(Boolean);
  return lines.join("\n");
}

async function sendToTelegram() {
  const text = encodeURIComponent(buildText());

  // 1) Пытаемся открыть приложение Telegram c предзаполненным текстом к @hookahtohome
  const deepLink = `tg://resolve?domain=hookahtohome&text=${text}`;

  // 2) Фолбэки на веб
  const webChat = `https://web.telegram.org/k/#@hookahtohome`; // открыть чат
  const shareUrl = `https://t.me/share/url?text=${text}`; // окно «Поделиться»
  const profile = `https://t.me/hookahtohome`; // профиль

  // Открытие должно происходить в результате user gesture (клик по кнопке)
  const started = Date.now();
  window.location.href = deepLink;

  // Если приложение не подхватилось — пытаемся через share/web
  setTimeout(() => {
    if (Date.now() - started < 1500) {
      // пробуем окно «Поделиться» (пользователь выберет чат и нажмёт «Отправить»)
      const win = window.open(shareUrl, "_blank");
      if (!win) {
        // последний фолбэк — просто открыть чат/профиль
        window.open(webChat, "_blank") || window.open(profile, "_blank");
      }
    }
  }, 700);
}

const TheMask = process.client
  ? defineAsyncComponent(() => import("vue-the-mask"))
  : null;

const modal = useModalStore();

const partnersData = ref([]);
const techData = ref([]);
const formErrors = reactive({
  username: true,
  phoneError: true,
});
const formValues = reactive({
  username: "",
  phoneValue: "",
});

const submitForm = async (name, phone) => {
  try {
    // const response = await fetch("https://admin.кальяннадом.рф/send.php", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: JSON.stringify({
    //     name,
    //     phone,
    //   }),
    // });
    sendToTelegram();
    modal.handleOpenSuccessModal();
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
const onSubmit = () => {
  if (!formErrors.username && !formErrors.phoneError) {
    submitForm(formValues.username, formValues.phoneValue);
    formValues.username = "";
    formValues.phoneValue = "";
  }
};

const { data, error } = await useAsyncData("partners-page-data", async () => {
  try {
    const response = await $fetch("https://admin.кальяннадом.рф/partners/");
    const response2 = await $fetch("https://admin.кальяннадом.рф/tech/");
    return {
      partnersRes: response,
      techRes: response2,
    };
  } catch (e) {
    console.error("Ошибка загрузки данных:", e);
    return { partnersRes: {}, faqData: [] };
  }
});
partnersData.value = data.value.partnersRes.ROOT;
if (data.value.techRes.ROOT.CONTENT) {
  techData.value = data.value.techRes.ROOT.CONTENT;
}

watch(
  () => formValues.username,
  () => {
    if (formValues.username.length > 0) {
      formErrors.username = false;
    } else {
      formErrors.username = true;
    }
  }
);
watch(
  () => formValues.phoneValue,
  () => {
    if (formValues.phoneValue.length > 0) {
      formErrors.phoneError = false;
    } else {
      formErrors.phoneError = true;
    }
  }
);
</script>

<template>
  <div class="partners-page">
    <div class="contacts-block">
      <div class="container">
        <div class="contacts-inner">
          <div class="left">
            <span class="badge"> сотрудничество </span>

            <div class="center">
              <h3>
                {{ partnersData.NAME }}
              </h3>
              <div
                v-html="
                  partnersData['~PREVIEW_TEXT'] &&
                  he.decode(partnersData['~PREVIEW_TEXT'])
                "
              ></div>
              <form @submit.prevent="onSubmit">
                <input
                  placeholder="имя"
                  class="input"
                  type="text"
                  v-model="formValues.username"
                />
                <input
                  placeholder="телефон"
                  class="input"
                  type="tel"
                  v-model="formValues.phoneValue"
                  v-mask="'+7 (###) ###-##-##'"
                  v-if="TheMask"
                />

                <p>
                  Нажимая кнопку «Заказать кальян» вы даёте свое согласие
                  <NuxtLink to="/policy">
                    с правилами обработки персональных данных.
                  </NuxtLink>
                </p>
                <Button
                  variable="primary"
                  :disabled="
                    formValues.phoneValue.length < 18 ||
                    formValues.username === 0
                  "
                  >Отправить</Button
                >
              </form>
            </div>
            <div class="bottom">
              <div class="socials">
                <a
                  href="https://t.me/hookahtohome"
                  target="_blank"
                  class="social tg"
                >
                  <TelegramIcon />
                </a>
                <a
                  href="https://wa.me/+79165993923"
                  target="_blank"
                  class="social wa"
                >
                  <WhatsappIcon />
                </a>
              </div>
              <a
                :href="`tel:${
                  techData?.CONTENT && techData?.CONTENT['Телефон']
                }`"
                >{{ techData?.CONTENT && techData?.CONTENT["Телефон"] }}</a
              >
            </div>
          </div>
          <div class="right">
            <div class="image-wrapper">
              <img
                :src="`https://admin.кальяннадом.рф/${partnersData.PREVIEW_PICTURE}`"
                alt="photo"
              />
            </div>
          </div>
        </div>
        <div class="contacts-info">
          <div class="left">
            <ul>
              <li>© 2024</li>
              <li>кальяннадом.рф</li>
              <li>Все права защищены</li>
              <li><a href="#">Политика конфиденциальности</a></li>
            </ul>
          </div>
          <div class="right">
            <ul>
              <li>
                <span>Москва, ул Примерная, 789, оф 101</span>
                <span>11:00 - 02:00</span>
              </li>
              <li>
                <a href="https://paradigma-digital.ru/" target="_blank">
                  <ParadigmaIcon />
                  <span>
                    Разработка сайта – <br />
                    Paradigma
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.partners-page {
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

.partners-page {
  padding-top: 150px;
  @media (max-width: $tab) {
    padding-top: 100px;
  }
}
</style>
