<template>
  <q-card class="q-mb-md">
    <q-card-section class="q-pa-none">
      <q-expansion-item
        :label="blockName"
        default-opened
      >
        <q-card>
          <q-card-section class="q-pa-none">
            <div class="q-px-md q-pb-md">
              <q-input
                v-model="data.description"
                label="Descrição"
                type="textarea"
                spellcheck="false"
                dense
              />

              <q-select
                v-model="data.recommendation_type"
                :options="['Recomendação formal', 'Boa prática', 'Recomendação informal']"
                class="q-my-lg"
                label="Tipo de recomendação"
                dense
              />

              <q-select
                v-model="data.intervention_type"
                :options="['Tratamento', 'Diagnóstico', 'Classificação de população']"
                class="q-my-lg"
                label="Tipo de intervenção"
                dense
              />

              <q-input
                v-model="data.intervention"
                class="q-mt-md"
                label="Intervenção"
                spellcheck="false"
                dense
              />

              <q-input
                v-model="data.comparator"
                class="q-mt-md"
                label="Comparador"
                spellcheck="false"
                dense
              />

              <q-select
                v-model="data.direction"
                :options="['A favor da intervenção', 'Contra a intervenção', 'Ambas']"
                class="q-my-lg"
                label="Direção"
                dense
              />

              <q-select
                v-model="data.strength"
                :options="['Forte', 'Fraca']"
                class="q-my-lg"
                label="Força da evidência"
                dense
              />

              <q-select
                v-model="data.certainty_of_the_evidence"
                :options="['Alta', 'Moderada', 'Baixa', 'Não especificada']"
                class="q-my-lg"
                label="Certeza da evidência"
                dense
              />

              <q-input
                v-model="data.implementation_considerations"
                label="Considerações de implementação"
                class="q-my-lg"
                type="textarea"
                spellcheck="false"
                dense
              />

              <q-input
                v-model="data.additional_comments"
                label="Comentários adicionais"
                class="q-my-lg"
                type="textarea"
                spellcheck="false"
                dense
              />

              <q-input
                v-model="data.recommendation_source"
                label="Fonte da recomendação"
                class="q-my-lg"
                type="textarea"
                spellcheck="false"
                dense
              />

              <metadata-links-form
                :block-index="props.index"
              />
            </div>

            <q-separator />

            <div class="q-pa-md bg-grey-2">
              <q-btn
                :label="`Remove o bloco #${props.index}`"
                class="full-width"
                color="negative"
                icon="close"
                no-caps
                push
                dense
                @click="showDeleteBlockDialog = true"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <delete-modal
        :show="showDeleteBlockDialog"
        title="Deseja excluir o bloco de metadados?"
        :item-name="blockName"
        @cancel="showDeleteBlockDialog = false"
        @confirm="deleteBlock"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onBeforeMount,
  reactive,
  inject,
  watch,
  ref,
} from 'vue';

import MetadataLinksForm from 'components/forms/editor/metadata-links-form.vue';
import Editor from 'src/services/editor';
import DeleteModal from 'components/modals/delete-modal.vue';

const editor = inject('editor') as Editor;

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['deleted']);

const showDeleteBlockDialog = ref(false);

const data = reactive({
  index: 1,
  description: '',
  recommendation_type: '',
  intervention_type: '',
  intervention: '',
  comparator: '',
  direction: '',
  strength: '',
  certainty_of_the_evidence: '',
  implementation_considerations: '',
  additional_comments: '',
  recommendation_source: '',
  links: [],
});

const blockName = computed(() => `Bloco #${props.index}`);

watch(data, (value) => {
  editor.metadata.fixed.set(props.index, { ...value });
});

const deleteBlock = () => {
  editor.metadata.removeFixed(props.index);

  showDeleteBlockDialog.value = false;

  emit('deleted');
};

const setInitialValues = () => {
  const metadata = editor.metadata.getFromElement();

  data.index = props.index;

  if (metadata) {
    const { fixed } = metadata;

    const currentIndex = props.index - 1;

    if (fixed[currentIndex]) {
      data.description = fixed[currentIndex].description;
      data.recommendation_type = fixed[currentIndex].recommendation_type;
      data.intervention_type = fixed[currentIndex].intervention_type;
      data.intervention = fixed[currentIndex].intervention;
      data.comparator = fixed[currentIndex].comparator;
      data.direction = fixed[currentIndex].direction;
      data.strength = fixed[currentIndex].strength;
      data.certainty_of_the_evidence = fixed[currentIndex].certainty_of_the_evidence;
      data.implementation_considerations = fixed[currentIndex].implementation_considerations;
      data.additional_comments = fixed[currentIndex].additional_comments;
      data.recommendation_source = fixed[currentIndex].recommendation_source;
    }
  }

  setTimeout(() => {
    editor.metadata.data.mountingComponent = false;
  }, 500);
};

onBeforeMount(() => {
  setInitialValues();
});

onBeforeUnmount(() => {
  editor.metadata.clearMetadata();
});
</script>
