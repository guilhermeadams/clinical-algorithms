<template>
  <q-card class="q-mb-md">
    <q-card-section class="q-pa-none">
      <q-expansion-item
        :label="blockName"
        default-opened
        header-class="bg-grey-2 text-primary text-body1"
        expand-icon-class="text-primary"
      >
        <q-card>
          <q-card-section class="q-pa-none">
            <div class="q-px-md q-py-md">
              <q-select
                v-model="data.recommendation_type"
                :options="['Recomendación formal', 'Buenas practicas', 'Recomendación informal']"
                class="q-mb-lg"
                label="Tipo de recomendación"
                dense
              />

              <q-input
                v-model="data.description"
                label="Descripción"
                type="textarea"
                spellcheck="false"
                dense
              />

              <q-select
                v-model="data.intervention_type"
                :options="['Tratamiento', 'Diagnóstico', 'Clasificación de la población']"
                class="q-my-lg"
                label="Tipo de intervención"
                dense
              />

              <q-input
                v-model="data.intervention"
                class="q-mt-md"
                label="Intervención"
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
                :options="['A favor de la intervención', 'En contra de la intervención', 'Ambos']"
                class="q-my-lg"
                label="Dirección"
                dense
              />

              <q-select
                v-if="isFormal"
                v-model="data.strength"
                :options="['Fuerte', 'Débil']"
                class="q-my-lg"
                label="Fuerza de la evidencia"
                dense
              />

              <q-select
                v-if="isFormal"
                v-model="data.certainty_of_the_evidence"
                :options="['Alta', 'Moderada', 'Baja', 'No especificada']"
                class="q-my-lg"
                label="Certeza de la evidencia"
                dense
              />

              <q-input
                v-model="data.implementation_considerations"
                label="Consideraciones de implementación"
                class="q-my-lg"
                type="textarea"
                spellcheck="false"
                dense
              />

              <q-input
                v-model="data.additional_comments"
                label="Comentarios adicionales"
                class="q-my-lg"
                type="textarea"
                spellcheck="false"
                dense
              />

              <q-input
                v-model="data.recommendation_source"
                label="Fuente de recomendación"
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

            <div class="bg-grey-2">
              <q-btn
                :label="`Eliminar ${blockName}`"
                class="full-width"
                color="negative"
                icon="close"
                no-caps
                flat
                @click="showDeleteBlockDialog = true"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- REMOVE METADATA BLOCK -->
      <delete-modal
        :show="showDeleteBlockDialog"
        title="¿Tienes certeza de que deseas eliminar estas informaciones?"
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

import MetadataLinksForm from 'components/forms/editor/fixed-metadata-links-form.vue';
import Editor from 'src/services/editor';
import DeleteModal from 'components/modals/simple-modal.vue';

const editor = inject('editor') as Editor;

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

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

const blockName = computed(() => `${props.index}. ${data.recommendation_type}`);

const isFormal = computed(() => data.recommendation_type === 'Recomendación formal');

watch(data, (value) => {
  editor.metadata.fixed.set(props.index, { ...value });
});

const deleteBlock = () => {
  showDeleteBlockDialog.value = false;

  editor.metadata.fixed.removeBlock(props.index);
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
