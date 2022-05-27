<template>
  <main>
    {{ loading ? "loading" : "" }}<br />
    <div v-if="loading">Loading</div>
    <div v-if="!loading">
      id: {{ result?.viewer?.id }} ({{ result?.viewer?.email }})<br />
      created: {{ result?.viewer?.created_at }}<br />
      updated: {{ result?.viewer?.updated_at }}<br />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { result, loading, error } = useQuery(gql`
  query UserQuery {
    viewer {
      id
      email
      created_at
      updated_at
    }
  }
`);
</script>
