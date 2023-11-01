<template>
  <edit-modal
    :show="showEditUserDialog"
    :title="title"
    :deleting="data.deleting"
    :saving="data.saving"
    :editing="data.editing"
    :hide-delete="!flowcharts.data.flowchart.id"
    @delete="deleteAndClose"
    @edit="setEditing"
    @save="saveAndClose"
    @close="closeDialog"
  >
    <div>
      <q-input
        v-if="canEdit"
        v-model="flowcharts.data.flowchart.title"
        ref="inputFlowchartTitle"
        label="Título do fluxograma"
        class="q-mb-md"
      />
      <div class="q-mb-lg" v-else>
        <div class="text-caption text-grey-7">Título do fluxograma:</div>
        <div>{{ flowcharts.data.flowchart.title }}</div>
      </div>

      <q-input
        v-if="canEdit"
        v-model="flowcharts.data.flowchart.summary"
        label="Síntese do fluxograma"
        type="textarea"
        class="q-mb-md"
      />
      <div class="q-mb-lg" v-else>
        <div class="text-caption text-grey-7">Síntese do fluxograma:</div>
        <div>{{ flowcharts.data.flowchart.summary }}</div>
      </div>

      <div class="row">
        <div class="col-9 q-pr-lg">
          <q-input
            v-if="canEdit"
            v-model="flowcharts.data.flowchart.author"
            label="Autor do fluxograma"
            class="q-mb-md"
          />
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">Autor do fluxograma:</div>
            <div>{{ flowcharts.data.flowchart.author }}</div>
          </div>
        </div>

        <div class="col-3">
          <q-input
            v-if="canEdit"
            v-model="flowcharts.data.flowchart.version"
            label="Versão"
            class="q-mb-md"
          />
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">Versão:</div>
            <div>{{ flowcharts.data.flowchart.version }}</div>
          </div>
        </div>
      </div>

      <q-select
        v-if="canEdit"
        v-model="flowcharts.data.flowchart.categories"
        :options="categoriesMocked"
        :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
        bg-color="white"
        label="Categorias"
        class="q-mb-md"
        multiple
        use-chips
      >
        <template v-slot:selected-item="scope">
          <q-chip
            :label="scope.opt.name"
            removable
            color="primary"
            text-color="white"
            @remove="scope.removeAtIndex(scope.index)"
          >
            {{ scope.opt.name }}
          </q-chip>
        </template>
      </q-select>
      <div class="q-mb-lg" v-else>
        <div class="text-caption text-grey-7">Categorias:</div>
        <q-chip
          v-for="category of flowcharts.data.flowchart.categories"
          :key="category.name"
          :label="category.name"
        />
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

import Flowcharts from 'src/services/flowcharts';
import EditModal from 'components/modals/edit-modal.vue';
import { QInput } from 'quasar';

const flowcharts = inject('flowcharts') as Flowcharts;

const showEditUserDialog = computed(() => flowcharts.data.showEditDialog);

const inputFlowchartTitle = ref<QInput>();

const data = reactive({
  showDialog: false,
  deleting: false,
  editing: false,
  saving: false,
});

const canEdit = computed(() => data.editing || !flowcharts.data.flowchart.id);

const title = computed(() => {
  if (!flowcharts.data.flowchart.id) return 'Cadastrar dados básicos do fluxograma';
  if (data.editing && flowcharts.data.flowchart.id) return 'Editar dados básicos do fluxograma';
  return 'Dados básicos do fluxograma';
});

const categoriesMocked = ref([
  { name: 'Doenças' },
  { name: 'Prevenção' },
  { name: 'Emergências' },
]);

watch(() => showEditUserDialog.value, (value) => {
  data.showDialog = value;
});

const deleteAndClose = () => {
  data.deleting = true;

  setTimeout(() => {
    flowcharts.delete();

    data.deleting = false;
  }, 1500);
};

const closeDialog = () => flowcharts.toggleEditDialog();

const saveAndClose = () => {
  data.saving = true;

  setTimeout(() => {
    flowcharts.save();

    data.saving = false;
  }, 1500);
};

const setEditing = (value: boolean) => {
  data.editing = value;

  setTimeout(() => {
    inputFlowchartTitle.value?.focus();
  }, 250);
};
</script>
