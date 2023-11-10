<template>
  <router-view />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import Settings from 'src/services/settings';
import Index from 'src/services/editor';

const settings = new Settings();
settings.page.setTitle('Início');

const editor = new Index();

provide('settings', settings);
provide('editor', editor);
</script>
