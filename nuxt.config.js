export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      },
      { property: "og:title", content: "MRoulette" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MRoulette" },
      {
        property: "og:description",
        content: process.env.npm_package_description || ""
      },
      {
        property: "og:url",
        content: "https://masibw.github.io/MRoulette/"
      },

      {
        property: "og:image",
        content: "https://masibw.github.io/MRoulette/favicon.ico"
      },
      { name: "twitter:site", content: "@masi19bw" },
      { name: "twitter:card", content: "Summary Card" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/MRoulette/favicon.ico" }
    ]
  },
  router: {
    base: "/MRoulette/"
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [],
  /*
   ** Nuxt.js modules
   */

  modules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-141695337-3"
      }
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
