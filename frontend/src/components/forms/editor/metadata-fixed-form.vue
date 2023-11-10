<template>
  <q-card class="q-mb-md">
    <q-card-section class="q-pa-none">
      <q-expansion-item
        :label="`Bloco #${props.index}`"
        default-opened
      >
        <q-card class="q-mt-sm">
          <q-card-section class="q-pt-sm">
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

            <metadata-links-form />

            <q-btn
              label="Remove este bloco"
              class="full-width q-mt-md"
              color="negative"
              icon="close"
              push
              dense
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import MetadataLinksForm from 'components/forms/editor/metadata-links-form.vue';

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
});

const data = reactive({
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
});
</script>
