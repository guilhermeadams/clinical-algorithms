<template>
  <div>
    <div>Links</div>

    <metadata-link-form
      v-for="index of data.total"
      :key="`link-${index}`"
      :index="index"
      class="q-my-md"
    />

    <q-btn
      class="q-mt-sm full-width"
      label="Inserir link"
      color="primary"
      no-caps
      push
      @click="addLink"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import MetadataLinkForm from 'components/forms/editor/metadata-link-form.vue';

const data = reactive({
  total: 0,
});

const addLink = () => {
  data.total += 1;
};
</script>
