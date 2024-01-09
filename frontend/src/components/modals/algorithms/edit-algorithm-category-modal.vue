<template>
  <edit-modal
    :show="showEditUserDialog"
    :title="`${categories.data.category.id ? 'Editar' : 'Nueva'} categoría`"
    :saving="data.saving"
    :editing="data.editing"
    @save="submitCategoryForm"
    @close="closeDialog"
    hide-delete
  >
    <q-form
      ref="refCategoryForm"
      @submit="saveAndClose"
    >
      <q-input
        v-model="categories.data.category.name"
        ref="inputCategoryName"
        label="Nombre"
        :rules="[val => !!val || 'Introduzca el título del algoritmo']"
        lazy-rules
      />
    </q-form>
  </edit-modal>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  inject,
  watch,
  ref,
} from 'vue';

import { QForm, QInput, useQuasar } from 'quasar';

import EditModal from 'components/modals/edit-modal.vue';
import AlgorithmsCategories from 'src/services/algorithms-categories';

const categories = inject('algorithmsCategories') as AlgorithmsCategories;
const $q = useQuasar();

const refCategoryForm = ref<QForm>();

const showEditUserDialog = computed(() => categories.data.showEditDialog);

const inputCategoryName = ref<QInput>();

const data = reactive({
  showDialog: false,
  editing: false,
  saving: false,
});

watch(() => showEditUserDialog.value, (value) => {
  data.showDialog = value;
});

const closeDialog = () => categories.toggleEditDialog();

const saveAndClose = async () => {
  try {
    data.saving = true;

    if (categories.data.category.id) {
      await categories.update();
    } else {
      await categories.save();
    }

    categories.toggleEditDialog();

    await categories.get();
  } catch (error) {
    $q.notify({
      message: 'Error while trying to save category',
    });
  } finally {
    data.saving = false;
  }
};

const submitCategoryForm = async () => {
  refCategoryForm.value?.submit();
};

onMounted(() => {
  inputCategoryName.value?.focus();
});
</script>
