<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue';

import Settings from 'src/services/settings';
import { useRoute, useRouter } from 'vue-router';
import { ALGORITHMS_PUBLIC_EDITOR, ALGORITHMS_PUBLIC_SEARCH } from 'src/router/routes/algorithms';
import { LocalStorage } from 'quasar';
import { ACCOUNT_LOGIN } from 'src/router/routes/account';

const settings = new Settings();

settings.page.setTitle('Início');

provide('settings', settings);

onMounted(() => {
  const token = LocalStorage.getItem('token');

  const route = useRoute();
  const router = useRouter();

  setTimeout(() => {
    if (
      !token
      && ![
        ALGORITHMS_PUBLIC_SEARCH,
        ALGORITHMS_PUBLIC_EDITOR,
      ].includes(String(route.name))
    ) {
      void router.push({
        name: ACCOUNT_LOGIN,
      });
    }
  }, 100);
});
</script>
