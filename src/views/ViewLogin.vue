<template>
  <div v-if="getViewer?.viewer" class="m-5">
    Welcome back {{ getViewer?.viewer?.name }} ({{ getViewer?.viewer?.email }})
  </div>

  <form v-else @submit.stop.prevent="sendLogin">
    <div>
      <input
        class="mt-1 pr-2 pl-2"
        type="email"
        name="email"
        v-model="email"
        required
        autofocus
        placeholder="email"
      />
    </div>
    <div class="mt-4">
      <input
        class="mt-1 pr-2 pl-2"
        type="password"
        name="password"
        v-model="password"
        placeholder="******"
        required
        autocomplete="current-password"
      />
    </div>
    <div class="block mt-4">
      <label>
        <input
          type="checkbox"
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          name="remember"
        />
        <span class="ml-2 text-sm text-gray-600">Remember me</span>
      </label>
    </div>
    <button
      class="mt-4 bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium"
      type="submit"
    >
      Login
    </button>
  </form>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const {
  result: getViewer,
  loading,
  error,
} = useQuery(gql`
  query UserQuery {
    viewer {
      id
      email
      name
      created_at
      updated_at
    }
  }
`);

const { mutate: sendLogin, onDone } = useMutation(
  gql`
    mutation sendLogin($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        name
        email
        created_at
        updated_at
      }
    }
  `,
  () => ({
    variables: {
      email: email.value,
      password: password.value,
    },
  })
);

onDone((result) => {
  console.log(result.data);
});
</script>
