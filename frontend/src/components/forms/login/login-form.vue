<template>
  <q-form
    class="q-gutter-md q-mt-lg"
    @submit="tryLogin"
  >
    <q-input
      v-model="user.username"
      type="text"
      label="Login"
      :rules="[val => !!val || 'Informe o nome de usuário']"
      lazy-rules
      no-error-icon
    />

    <q-input
      v-model="user.password"
      label="Senha"
      :rules="[val => !!val || 'Informe sua senha']"
      lazy-rules
      no-error-icon
      :type="isPwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <div class="row q-mb-md">
<!--        <div class="col-6 q-pr-xs q-pt-sm">-->
<!--          <a-->
<!--            class="cursor-pointer text-body2"-->
<!--            @click="goForgotPass"-->
<!--          >-->
<!--            {{ $t('components.login.forgotPass') }}-->
<!--          </a>-->
<!--        </div>-->

      <div class="col-6"></div>

      <div class="col-6 q-pl-sm text-right">
        <q-btn
          :loading="user.loggingIn"
          class="full-width"
          color="primary"
          label="Entrar"
          push
          type="submit"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { api } from 'boot/axios';
import { LocalStorage, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { HOME } from 'src/router/routes/home';

const $q = useQuasar();
const router = useRouter();

const isPwd = ref(true);

const user: {
  loggingIn: boolean;
  username: string;
  password: string;
  selectRole: boolean;
} = reactive({
  loggingIn: false,
  username: '',
  password: '',
  selectRole: false,
});

async function tryLogin() {
  try {
    user.loggingIn = true;

    const { data }: { data: { token: string } } = await api.post('account/login', {
      username: user.username,
      password: user.password,
    });

    if (data.token) {
      LocalStorage.set('token', data.token);

      await router.push({
        name: HOME,
      });
    } else {
      $q.notify({
        type: 'warning',
        message: 'Nome ou senha inválidos.',
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    user.loggingIn = false;
  }
}
</script>
