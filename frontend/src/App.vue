<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue';

import Settings from 'src/services/settings';
import { useRoute, useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';
import { ACCOUNT_LOGIN } from 'src/router/routes/account';

const route = useRoute();
const router = useRouter();

const settings = new Settings({ route });

settings.page.setTitle('Início');

provide('settings', settings);

onMounted(() => {
  const token = LocalStorage.getItem('token');

  setTimeout(() => {
    if (!token && !settings.isPublicView) {
      void router.push({
        name: ACCOUNT_LOGIN,
      });
    }
  }, 100);
});
</script>
