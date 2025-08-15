<script setup>
import { CloseIcon, TelegramIcon, WhatsappIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { TheMask } from "vue-the-mask";
import { useModalStore } from "@/entities/modal-store";

defineProps(["isActive", "handleClose"]);
</script>

<template>
  <div
    @click="handleClose"
    class="success-modal"
    :class="isActive ? 'active' : ''"
  >
    <div class="success-modal-content" @click.stop>
      <Button :click="handleClose">
        <CloseIcon />
      </Button>
      <div class="modal-item">
        <p class="title">ваша заявка отправлена</p>
        <div class="contacts">
          <p>Наш специалист свяжется с вами <br />в ближайшее время</p>
        </div>
      </div>
      <div class="modal-item">
        <div class="image-wrapper">
          <img src="@/shared/assets/images/hookah-success.png" alt="hookah" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.success-modal.active {
  background: rgba(69, 64, 61, 0.8);
  pointer-events: all;
  .success-modal-content {
    transform: translateY(0);
  }
}
.success-modal {
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(69, 64, 61, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  pointer-events: none;
  transition: var(--trs-600);
  .success-modal-content {
    background: var(--bg-color);
    padding: 100px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    gap: 20px;
    transform: translateY(-200%);
    transition-delay: 300ms;
    transition: var(--trs-600);
    max-width: 1200px;

    & > button {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 35px;
      height: 35px;
      padding: 0;
      svg {
        stroke: var(--text-color);
        width: 100%;
        height: 100%;
      }
    }
    .modal-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-weight: 400;
        font-size: 64px;
        line-height: 54px;
        color: var(--text-color);
        position: relative;
        max-width: 470px;
        text-transform: uppercase;
        &:before {
          content: "";
          position: absolute;
          width: 45px;
          height: 45px;
          border-radius: 999px;
          background: var(--text-color);
          left: 0;
          top: -55px;
        }
      }
      .contacts {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-top: 40px;
        padding-top: 40px;
        border-top: 1px solid var(--text-color);
        p {
          font-weight: 400;
          font-size: 20px;
          line-height: 20px;
          color: var(--text-color);
        }
      }
      .image-wrapper {
        width: 100%;
        height: 100%;
        max-height: 400px;
        img {
          mix-blend-mode: multiply;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
}
</style>
