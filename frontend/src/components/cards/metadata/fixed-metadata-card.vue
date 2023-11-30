<template>
  <pre>{{ fixedMetadata }}</pre>
</template>

<script setup lang="ts">
import Editor from 'src/services/editor';
import { onBeforeMount, inject, ref } from 'vue';
import { IFixedMetadata } from 'src/services/editor/metadata';

const editor = inject('editor') as Editor;

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const fixedMetadata = ref<IFixedMetadata | null>(null);

onBeforeMount(() => {
  const metadata = editor.metadata.getFromElement();

  if (metadata) {
    const { fixed } = metadata;

    fixedMetadata.value = { ...fixed[props.index - 1] };
  }
});
</script>
