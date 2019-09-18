export default {
  mode: "universal",

  head: {
    title: process.env.npm_package_name || "",
    htmlAttrs: {
      prefix: "og: http://ogp.me/ns#",
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      },
      {
        name: "google-site-verification",
        content: "CHfIRkry56Za9PB8hW-ncJr1FnNPm6GQnU9L7NGOpjc"
      },
      { property: "og:title", content: "MRoulette" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MRoulette" },
      {
        property: "og:image",
        content: "https://masibw.github.io/MRoulette/ogImg.jpg"
      },
      {
        property: "og:description",
        content: process.env.npm_package_description || ""
      },
      {
        property: "og:url",
        content: "https://masibw.github.io/MRoulette/"
      },
      { name: "twitter:site", content: "@masi19bw" },
      { name: "twitter:card", content: "summary" }
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
    ],
    ["@nuxtjs/pwa"]
  ],
  workbox: {
    dev: false
  },
  manifest: {
    name: "MRoulette",
    short_name: "MRoulette",
    title: "MRoulette",
    "og:title": "MRoulette",
    description: "This is RouletteApp easy to use.",
    "og:description": "This is RouletteApp easy to use.",
    lang: "ja",
    theme_color: "#ffffff",
    background_color: "#ffffff"
  },
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
