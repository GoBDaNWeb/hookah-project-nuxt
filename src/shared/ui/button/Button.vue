<script setup>
const props = defineProps(["title", "variable", "click", "type"]);
</script>

<template>
  <button :class="[variable]" @click="click">
    <slot></slot>
  </button>
</template>

<style lang="scss">
a.social {
  background: var(--white-color);
  border-radius: 9999px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
a.social.wa {
  background: #4dbd66;
  transition: var(--trs-300);
  &:hover {
    background: #309b48;
  }
}
a.social.tg {
  background: #44b5c4;
  transition: var(--trs-300);

  &:hover {
    background: #24a4b6;
  }
}
</style>
<style lang="scss" scoped>
button {
  border-radius: 99px;
  height: 35px;
  padding: 0 20px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -7%;
  color: var(--text-color);
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
button.outline:hover {
  color: var(--hover-color);
  border-color: var(--hover-color);
}
button.outline {
  border: 1px solid var(--text-color);
  text-transform: uppercase;
  transition: var(--trs-300);
}

button.primary:hover {
  background: var(--hover-color);
}
button.primary {
  height: 60px;
  padding: 0 48px;
  background: var(--text-color);
  color: var(--white-color);
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: -7%;
  text-transform: uppercase;
  transition: var(--trs-300);
}
</style>
