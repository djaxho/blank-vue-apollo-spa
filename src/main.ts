import { createApp, provide, h } from 'vue'
import { createPinia } from "pinia";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'


import App from "./App.vue";
import router from "./router";
import "./index.css";
import getOrFetchCsrfToken from "@/utils/getOrFetchCsrfToken";

const token = await getOrFetchCsrfToken();
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `${import.meta.env.VITE_API_DOMAIN}${import.meta.env.VITE_API_PATH}`,
  credentials: "include",
  headers: {
    "X-XSRF-TOKEN": token,
  },
});

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(createPinia());
app.use(router);

app.mount("#app");
