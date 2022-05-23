
<template>
  <main>
    <TheWelcome />
    {{ loading ? 'loading still' : 'done' }}
    {{ error }}
    {{ result }}
  </main>
</template>

<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result, loading, error } = useQuery(gql`
      query UserQuery {
        user(id: 1) {
          id
          email
          created_at
          updated_at
        }
      }
    `)
</script>
