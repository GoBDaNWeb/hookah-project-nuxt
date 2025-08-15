import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => {
    return { isActive: false };
  },
  
  actions: {
    handleOpenMenu() {
      this.isActive = !this.isActive;
    },
  },
});
