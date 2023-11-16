<template>
  <q-card>
    <q-card-section class="q-pa-none">
      <div class="q-px-md">
        <div class="q-pt-md q-mb-sm">
          Link #{{ props.linkIndex }}
        </div>

        <q-input
          v-model="data.url"
          label="URL"
          spellcheck="false"
          dense
        />

        <div class="q-pb-xs">
          <q-select
            v-model="data.type"
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
import {
  onBeforeMount,
  reactive,
  inject,
  watch,
} from 'vue';

import Editor from 'src/services/editor';

const editor = inject('editor') as Editor;

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
  blockIndex: props.blockIndex,
  linkIndex: props.linkIndex,
  url: '',
  type: '',
});

watch(data, (value) => {
  editor.metadata.fixed.setLinks({ ...value });
});

const setInitialValues = () => {
  const link = editor.metadata.fixed.getLinks(props.blockIndex, props.linkIndex);

  data.url = link?.url || '';
  data.type = link?.type || '';
};

onBeforeMount(() => {
  setInitialValues();
});
</script>
