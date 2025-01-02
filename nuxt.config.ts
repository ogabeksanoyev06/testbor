// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    // layoutTransition: { name: "layout", mode: "out-in" },

    head: {
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/pdfmake.min.js",
        defer: true
      }, {
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/vfs_fonts.min.js",
        defer: true
      }]
    }
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@samk-dev/nuxt-vcalendar",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "dayjs-nuxt",
  ],

  i18n: {
    types: "composition",
    strategy: "prefix_and_default",
    defaultLocale: "uz",
    lazy: true,
    langDir: "locales",
    locales: [
      { code: "ru", iso: "ru-RU", file: "ru.json" },
      { code: "uz", iso: "uz", file: "uz.json" },
      { code: "en", iso: "en", file: "en.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: true,
    },
  },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },

  build: {
    transpile: ["vue-toastification"],
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "https://api.talimpro.uz/api/",
    },
  },
});