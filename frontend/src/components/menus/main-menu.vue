<template>
  <q-list separator>
    <q-expansion-item
        v-for="section in sections"
        :key="section.name"
        expand-separator
        :label="section.name"
        group="main-menu"
    >
      <q-item
          v-for="item in section.items"
          :key="item.name"
          clickable
          v-ripple
          @click="goPage(item.name)"
      >
        <q-item-section class="q-pl-md">{{ item.label }}</q-item-section>
      </q-item>
    </q-expansion-item>
  </q-list>
</template>

<script setup lang="ts">
import { HOME } from 'src/router/routes/home';
import { useRouter } from 'vue-router';
import sections from 'src/router/sections';

const router = useRouter();

function goPage(pageName?: string) {
  router.push({
    name: pageName || HOME,
  });
}
</script>
