<template>
  <edit-modal
    :show="showEditUserDialog"
    :title="title"
    :deleting="data.deleting"
    :saving="data.saving"
    :editing="data.editing"
    :hide-delete="!flowcharts.data.flowchart.id"
    @delete="showDeleteDialog"
    @edit="setEditing"
    @save="submitFlowchartForm"
    @close="closeDialog"
  >
    <q-form
      ref="refFlowchartForm"
      class="q-gutter-md q-mt-lg"
      @submit="saveAndClose"
    >
      <!-- TITLE -->
      <q-input
        v-if="canEdit"
        v-model="flowcharts.data.flowchart.title"
        ref="inputFlowchartTitle"
        label="Título do fluxograma"
        class="q-mb-md"
        :rules="[val => !!val || 'Informe o título do fluxograma']"
        lazy-rules
      />
      <div class="q-mb-lg" v-else>
        <div class="text-caption text-grey-7">Título do fluxograma:</div>
        <div>{{ flowcharts.data.flowchart.title }}</div>
      </div>

      <!-- DESCRIPTION -->
      <q-input
        v-if="canEdit"
        v-model="flowcharts.data.flowchart.description"
        label="Síntese do fluxograma"
        type="textarea"
        class="q-mb-md"
        :rules="[val => !!val || 'Informe a síntese do fluxograma']"
        lazy-rules
      />
      <div class="q-mb-lg" v-else>
        <div class="text-caption text-grey-7">Síntese do fluxograma:</div>
        <div>{{ flowcharts.data.flowchart.description }}</div>
      </div>

      <!-- AUTHOR / VERSION  -->
      <div class="row">
        <div class="col-8 q-pr-lg">
          <q-input
            v-if="canEdit"
            v-model="flowcharts.data.flowchart.author"
            label="Autor do fluxograma"
            class="q-mb-md"
            disable
          />
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">Autor do fluxograma:</div>
            <div>{{ flowcharts.data.flowchart.author }}</div>
          </div>
        </div>

        <div class="col-4">
          <q-input
            v-if="canEdit"
            v-model="flowcharts.data.flowchart.updated_at"
            label="Última atualização"
            maxlength="10"
            clearable
            :rules="[val => !!val || 'Informe data da atualização']"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="flowcharts.data.flowchart.updated_at"
                    :locale="myLocale"
                    mask="DD/MM/YYYY"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Concluir"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">Última atualização:</div>
            <div>{{ flowcharts.data.flowchart.updated_at }}</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-10 q-pr-lg">
          <!-- CATEGORIES -->
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
            disable
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
            <div v-if="hasCategories">
              <q-chip
                v-for="category of flowcharts.data.flowchart.categories"
                :key="category.name"
                :label="category.name"
              />
            </div>
            <div v-else>
              Nenhuma categoria.
            </div>
          </div>
        </div>

        <div class="col-2">
          <q-input
            v-if="canEdit"
            v-model="flowcharts.data.flowchart.version"
            label="Versão"
            class="q-mb-md"
            :rules="[val => !!val || 'Informe a versão']"
            lazy-rules
          />
          <div class="q-mb-lg" v-else>
            <div class="text-caption text-grey-7">Versão:</div>
            <div>{{ flowcharts.data.flowchart.version }}</div>
          </div>
        </div>
      </div>
    </q-form>

    <delete-modal
      :show="data.confirmDeleting"
      title="Tem certeza que deseja excluir o fluxograma?"
      :item-name="flowcharts.data.flowchart.title"
      @cancel="showDeleteDialog(false)"
      @confirm="deleteAndClose"
    />
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
import { QForm, QInput, useQuasar } from 'quasar';
import { myLocale } from 'src/services/locale';
import DeleteModal from 'components/modals/delete-modal.vue';

const flowcharts = inject('flowcharts') as Flowcharts;
const $q = useQuasar();

const refFlowchartForm = ref<QForm>();

const showEditUserDialog = computed(() => flowcharts.data.showEditDialog);

const hasCategories = computed(
  () => flowcharts.data.flowchart.categories && flowcharts.data.flowchart.categories.length,
);

const inputFlowchartTitle = ref<QInput>();

const data = reactive({
  showDialog: false,
  confirmDeleting: false,
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

const showDeleteDialog = (value: boolean) => {
  data.confirmDeleting = value;
};

const deleteAndClose = async () => {
  try {
    showDeleteDialog(false);

    data.deleting = true;

    await flowcharts.delete();
  } catch (error) {
    $q.notify({
      message: 'Erro ao excluir os dados básicos do fluxograma',
    });
  } finally {
    data.deleting = false;
  }
};

const closeDialog = () => flowcharts.toggleEditDialog();

const saveAndClose = async () => {
  try {
    data.saving = true;

    if (flowcharts.data.flowchart.id) {
      await flowcharts.update();
    } else {
      await flowcharts.save();
    }
  } catch (error) {
    $q.notify({
      message: 'Erro ao salvar dados básicos do fluxograma',
    });
  } finally {
    data.saving = false;
  }
};

const setEditing = (value: boolean) => {
  data.editing = value;

  setTimeout(() => {
    inputFlowchartTitle.value?.focus();
  }, 250);
};

const submitFlowchartForm = async () => {
  refFlowchartForm.value?.submit();
};
</script>
