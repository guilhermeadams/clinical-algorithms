<template>
  <edit-modal
    :show="showEditUserDialog"
    title="Usuário"
    :deleting="data.deleting"
    :saving="data.saving"
    :editing="data.editing"
    :hide-delete="!users.data.user.id"
    @delete="deleteAndClose"
    @edit="setEditing"
    @save="submitUsersForm"
    @close="closeDialog"
  >
    <q-form
      ref="refUsersForm"
      @submit="saveAndClose"
    >
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-input
            v-if="canEdit"
            v-model="users.data.user.name"
            ref="inputUserName"
            label="Nombre"
            class="q-mb-md"
            :rules="[val => !!val || 'Introduzca el nombre del usuario']"
          />
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">Nombre:</div>
            <div>{{ users.data.user.name }}</div>
          </div>
        </div>
        <div class="col-6">
          <q-input
            v-if="canEdit"
            v-model="users.data.user.phone"
            label="Teléfono"
            class="q-mb-md"
            :rules="[val => !!val || 'Introduzca el teléfono del usuario']"
          />
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">Teléfono:</div>
            <div>{{ users.data.user.phone }}</div>
          </div>
        </div>
      </div>
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-input
            v-if="canEdit"
            v-model="users.data.user.email"
            label="E-mail"
            class="q-mb-md"
            :rules="[
              (val) => !!val || 'Introduzca el e-mail del usuario',
              (val) => validateEmail(val) || 'Este email es invalido',
            ]"
          />
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">E-mail:</div>
            <div>{{ users.data.user.email }}</div>
          </div>
        </div>
        <div class="col-6">
          <q-input
            v-if="canEdit"
            v-model="users.data.user.password"
            :type="isPwd ? 'password' : 'text'"
            class="q-mb-md"
            :rules="[(val) => !!val || 'Ingrese la contraseña de usuario.']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">Contraseña:</div>
            <div>*********</div>
          </div>
        </div>
      </div>

      <div class="row q-my-lg">
        <div class="col-6">
          <q-checkbox
            v-if="canEdit"
            v-model="users.data.user.maintainer"
            label="¿Eres mantenedor de algoritmos?"
          />
          <div v-else>
            <div>
              ¿Eres mantenedor de algoritmos?
              <check-or-not-icon
                class="q-ml-sm"
                :check="users.data.user.maintainer"
              />
            </div>
          </div>
        </div>

        <div class="col-6">
          <q-checkbox
            v-if="canEdit"
            v-model="users.data.user.master"
            label="¿Eres un usuario master?"
          />
          <div v-else>
            <div>
              ¿Eres un usuario master?
              <check-or-not-icon
                class="q-ml-sm"
                :check="users.data.user.master"
              />
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </edit-modal>
</template>

<script setup lang="ts">
import {
  computed,
  reactive,
  inject,
  watch,
  ref,
} from 'vue';

import Users from 'src/services/users';
import EditModal from 'components/modals/edit-modal.vue';
import { QForm, QInput, useQuasar } from 'quasar';
import CheckOrNotIcon from 'components/icons/check-or-not-icon.vue';
import { validateEmail } from 'src/services/validation';

const users = inject('users') as Users;
const $q = useQuasar();

const refUsersForm = ref<QForm>();

const showEditUserDialog = computed(() => users.data.showEditDialog);

const data = reactive({
  showDialog: false,
  deleting: false,
  editing: false,
  saving: false,
});

const isPwd = ref(true);

const inputUserName = ref<QInput>();

watch(() => showEditUserDialog.value, (value) => {
  data.showDialog = value;
});

const canEdit = computed(() => data.editing || !users.data.user.id);

const deleteAndClose = () => {
  data.deleting = true;

  setTimeout(() => {
    users.delete();

    data.deleting = false;
  }, 1500);
};

const closeDialog = () => users.toggleEditDialog();

const setEditing = (value: boolean) => {
  data.editing = value;

  setTimeout(() => {
    inputUserName.value?.focus();
  }, 250);
};

const saveAndClose = async () => {
  try {
    data.saving = true;

    await users.create();

    await users.get();
  } catch (error) {
    $q.notify({
      message: 'Erro ao salvar dados básicos do fluxograma',
    });
  } finally {
    data.saving = false;
  }
};

const submitUsersForm = async () => {
  refUsersForm.value?.submit();
};
</script>
