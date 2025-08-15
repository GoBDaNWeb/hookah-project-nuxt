<script setup>
import { ref, defineProps, watch } from "vue";
const props = defineProps(["type", "placeholder", "value", "modelValue"]);
</script>

<template>
  <input
    class="input"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;
.input::placeholder-shown {
  color: red;
}
.input {
  outline: none;
  background: none;
  border: none;
  font-size: 24px;
  line-height: 24px;
  font-weight: 400;
  color: var(--text-color);
  padding-bottom: 20px;
  border-bottom: 1px solid var(--text-color);
  width: 100%;
  @media (max-width: $tab) {
    font-size: 16px;
    line-height: 16px;
  }
}
</style>
