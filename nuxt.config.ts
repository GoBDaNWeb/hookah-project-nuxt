// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          href: "https://awards.infcdn.net/2024/circle_v3.css",
          rel: "stylesheet",
        },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
      ],
      meta: [
        {
          name: "yandex-verification",
          content: "7abb6cf63906c8d6",
        },
      ],
      script: [
        {
          src: "https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU",
          async: true,
          defer: true,
        },
        {
          innerHTML: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','//mc.yandex.ru/metrika/tag.js', 'ym');
            ym(42668894, 'init', {accurateTrackBounce:true, trackLinks:true, webvisor:true, clickmap:true, params: {__ym: {isFromApi: 'yesIsFromApi'}}});
          `,
          type: "text/javascript",
          tagPosition: "bodyOpen",
        },
      ],
    },
  },
  modules: ["@pinia/nuxt", "@vueuse/motion/nuxt"],
  plugins: [{ src: "src/shared/plugins/mask.js", mode: "client" }],
  devtools: { enabled: true },

  alias: {
    "@": "/src",
  },

  compatibilityDate: "2025-03-25",
});
