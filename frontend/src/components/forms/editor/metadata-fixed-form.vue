<template>
  <div class="q-mt-lg text-caption text-primary">Bloco #{{ props.index }}</div>

  <q-card class="q-mt-sm">
    <q-btn
      class="absolute-top-right z-max"
      style="margin-top: -22px; margin-right: -8px"
      color="negative"
      icon="delete"
      size="13px"
      dense
      round
    />

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
        :options="['Tratamento', 'Diagnóstico', 'Classificação de população']"
        class="q-my-lg"
        label="Direção"
        dense
      />

      <div class="q-mt-md">
        <div class="text-grey-7 q-mb-sm">Força da evidência</div>

        <q-radio
          v-model="data.strength"
          class="q-mr-xl"
          val="strong"
          label="Forte"
          dense
        />

        <q-radio
          v-model="data.strength"
          val="weak"
          label="Fraca"
          dense
        />
      </div>

      <q-select
        v-model="data.certainty_of_the_evidence"
        :options="['Alta', 'Moderada', 'Baixa', 'Não especificada']"
        class="q-my-lg"
        label="Certeza da evidência"
        dense
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

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
});
</script>
