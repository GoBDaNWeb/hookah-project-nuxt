<script>
export default {
  props: {
    options: Object,
  },
  async mounted() {
    const { Fancybox } = await import("@fancyapps/ui");
    import("@fancyapps/ui/dist/fancybox/fancybox.css");

    Fancybox.bind(this.$refs.container, "[data-fancybox]", {
      ...(this.options || {}),
    });
  },
  async updated() {
    const { Fancybox } = await import("@fancyapps/ui");

    Fancybox.unbind(this.$refs.container);
    Fancybox.close();

    Fancybox.bind(this.$refs.container, "[data-fancybox]", {
      ...(this.options || {}),
    });
  },
  async unmounted() {
    const { Fancybox } = await import("@fancyapps/ui");
    Fancybox.destroy();
  },
};
</script>

<template>
  <div ref="container">
    <slot></slot>
  </div>
</template>
