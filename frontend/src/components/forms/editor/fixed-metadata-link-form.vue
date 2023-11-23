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
            class="q-mt-lg"
            label="Tipo de link"
            dense
          />
        </div>
      </div>

      <q-separator class="q-mt-md" />

      <div class="bg-grey-2">
        <q-btn
          :label="`Remover o link #${props.linkIndex}`"
          class="full-width"
          color="negative"
          icon="close"
          no-caps
          flat
          @click="showRemoveLinkDialog = true"
        />
      </div>

      <simple-modal
        :show="showRemoveLinkDialog"
        :title="`Deseja remover o link do bloco #${props.blockIndex}?`"
        :item-name="`Link #${props.linkIndex}`"
        @cancel="showRemoveLinkDialog = false"
        @confirm="removeLink"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  reactive,
  inject,
  watch,
  ref,
} from 'vue';

import Editor from 'src/services/editor';
import SimpleModal from 'components/modals/simple-modal.vue';

const editor = inject('editor') as Editor;

const showRemoveLinkDialog = ref(false);

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
  editor.metadata.fixed.saveLink({ ...value });
});

const removeLink = () => {
  editor.metadata.fixed.removeLink(props.blockIndex, props.linkIndex);
};

const setInitialValues = () => {
  const link = editor.metadata.fixed.getLinks(props.blockIndex, props.linkIndex);

  data.url = link?.url || '';
  data.type = link?.type || '';
};

onBeforeMount(() => {
  setInitialValues();
});
</script>
