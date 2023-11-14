<template>
  <q-card>
    <q-card-section class="q-pa-none">
      <div class="q-px-md">
        <div class="q-pt-md q-mb-sm">
          Link #{{ props.linkIndex }}
        </div>

        <q-input
          v-model="data.link"
          label="URL"
          spellcheck="false"
          dense
        />

        <div class="q-pb-xs">
          <q-select
            v-model="data.link_type"
            :options="['Texto completo', 'Banco de dados BIG', 'Banco de dados BIGREC']"
            class="q-my-lg"
            label="Tipo de link"
            dense
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = defineProps({
  blockIndex: {
    type: Number,
    default: 0,
  },
  linkIndex: {
    type: Number,
    default: 0,
  },
});

const data = reactive({
  link: '',
  link_type: '',
});

// TODO: save links data
// watch(data, (value) => {
//
// });
</script>
