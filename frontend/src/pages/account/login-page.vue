<template>
  <q-card
    class="shadow-light rounded-borders q-pa-lg"
    style="width:400px"
  >
    <div>
      <q-img :src="Logo" />
    </div>

    <login-form />
  </q-card>
</template>

<script setup lang="ts">
import LoginForm from 'components/forms/login/login-form.vue';
import Logo from 'assets/imgs/logo.png';
</script>
