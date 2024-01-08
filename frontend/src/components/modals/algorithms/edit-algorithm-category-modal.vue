<template>
  <edit-modal
    :show="showEditUserDialog"
    title="Editar categoría"
    :deleting="data.deleting"
    :saving="data.saving"
    :editing="data.editing"
    @delete="showDeleteDialog"
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

<!--    <delete-modal-->
<!--      :show="data.confirmDeleting"-->
<!--      title="¿Está seguro de que desea eliminar el algoritmo?"-->
<!--      :item-name="algorithms.data.algorithm.title"-->
<!--      @cancel="showDeleteDialog(false)"-->
<!--      @confirm="deleteAndClose"-->
<!--    />-->
  </edit-modal>
</template>

<script setup lang="ts">
import {
  computed,
  reactive,
  inject,
  watch,
  ref, onMounted,
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
  confirmDeleting: false,
  deleting: false,
  editing: false,
  saving: false,
});

watch(() => showEditUserDialog.value, (value) => {
  data.showDialog = value;
});

const showDeleteDialog = (value: boolean) => {
  data.confirmDeleting = value;
};

const deleteAndClose = async () => {
  try {
    showDeleteDialog(false);

    data.deleting = true;

    // await categories.delete();
  } catch (error) {
    $q.notify({
      message: 'Erro ao excluir os dados básicos do fluxograma',
    });
  } finally {
    data.deleting = false;
  }
};

const closeDialog = () => categories.toggleEditDialog();

const saveAndClose = async () => {
  try {
    data.saving = true;

    if (categories.data.category.id) {
      await categories.update();
    } else {
      // await categories.save();
    }
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
