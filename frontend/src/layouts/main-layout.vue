<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ settings.page.title }}
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="settings.page.mainMenu"
      show-if-above
      bordered
      class="bg-secondary"
    >
      <main-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import Settings from 'src/services/settings';
import MainMenu from 'components/menus/main-menu.vue';

const settings = inject('settings') as Settings;

function toggleLeftDrawer() {
  settings.page.mainMenu = !settings.page.mainMenu;
}
</script>
