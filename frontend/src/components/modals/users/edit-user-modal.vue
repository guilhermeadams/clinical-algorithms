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
    @save="saveAndClose"
    @close="closeDialog"
  >
    <q-input
      v-if="canEdit"
      v-model="users.data.user.name"
      ref="inputUserName"
      label="Nome do usuário"
      class="q-mb-md"
    />
    <div class="q-mb-lg" v-else>
      <div class="text-caption text-grey-7">Nome do usuário:</div>
      <div>{{ users.data.user.name }}</div>
    </div>

    <q-input
      v-if="canEdit"
      v-model="users.data.user.email"
      label="E-mail do usuário"
      class="q-mb-md"
    />
    <div class="q-mb-lg" v-else>
      <div class="text-caption text-grey-7">E-mail do usuário:</div>
      <div>{{ users.data.user.email }}</div>
    </div>

    <q-input
      v-if="canEdit"
      v-model="users.data.user.phone"
      label="Telefone de contato do usuário"
      class="q-mb-md"
      mask="(##) #####-####"
    />
    <div class="q-mb-lg" v-else>
      <div class="text-caption text-grey-7">Telefone de contato do usuário:</div>
      <div>{{ users.data.user.phone }}</div>
    </div>

    <div class="row q-my-lg">
      <div class="col-6">
        <q-checkbox
          v-if="canEdit"
          v-model="users.data.user.maintainer"
          label="É mantenedor de fluxogramas / metadados"
        />
        <div v-else>
          <div>
            <check-or-not-icon :check="users.data.user.maintainer" />
            É mantenedor de fluxogramas / metadados
          </div>
        </div>
      </div>

      <div class="col-6">
        <q-checkbox
          v-if="canEdit"
          v-model="users.data.user.master"
          label="É usuário master"
        />
        <div v-else>
          <div>
            <check-or-not-icon :check="users.data.user.master" />
            É usuário master
          </div>
        </div>
      </div>
    </div>
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
import { QInput } from 'quasar';
import CheckOrNotIcon from 'components/icons/check-or-not-icon.vue';

const users = inject('users') as Users;

const showEditUserDialog = computed(() => users.data.showEditDialog);

const data = reactive({
  showDialog: false,
  deleting: false,
  editing: false,
  saving: false,
});

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

const saveAndClose = () => {
  data.saving = true;

  setTimeout(() => {
    users.save();

    data.saving = false;
  }, 1500);
};
</script>
