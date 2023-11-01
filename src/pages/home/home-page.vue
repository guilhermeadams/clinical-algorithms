<template>
  <q-page padding>
    ...
  </q-page>
</template>

<script setup lang="ts">
import { inject, onBeforeMount } from 'vue';
import Settings from 'src/services/settings';

const settings = inject('settings') as Settings;

onBeforeMount(() => {
  settings.page.setTitle('Início');
});
</script>
