<template>
  <router-view />
</template>

<script setup lang="ts">
import { provide } from 'vue';

import Settings from 'src/services/settings';

const settings = new Settings();
settings.page.setTitle('Início');

provide('settings', settings);
</script>
