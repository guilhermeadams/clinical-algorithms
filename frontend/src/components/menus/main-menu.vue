<template>
  <q-list separator>
    <q-expansion-item
      v-for="section in sections"
      :key="section.name"
      expand-separator
      :label="section.name"
      group="main-menu"
      :default-opened="isOpen(section)"
    >
      <q-item
        v-for="item in section.items"
        :key="item.name"
        :active="isActive(item.name)"
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
import { useRoute, useRouter } from 'vue-router';
import sections, { IMainMenuSection } from 'src/router/sections';

const route = useRoute();
const router = useRouter();

const goPage = (pageName?: string) => {
  router.push({
    name: pageName || HOME,
  });
};

const isOpen = (data: IMainMenuSection) => !!data.items.find((item) => item.name === route.name);

const isActive = (routeName: string) => routeName === route.name;
</script>
