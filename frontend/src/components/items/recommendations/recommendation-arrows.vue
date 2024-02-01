<template>
  <div
    v-if="fixedMetadata && fixedMetadata.intervention && fixedMetadata.comparator"
    class="row"
  >
    <div class="col-4 text-caption q-pr-sm">
      {{ fixedMetadata.comparator }}
    </div>

    <div class="col-4 text-center">
      <recommendation-arrows-image
        :fixed-metadata="fixedMetadata"
      />
    </div>

    <div class="col-4 text-caption q-pl-sm">
      {{ fixedMetadata.intervention }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { IFixedMetadata } from 'src/services/editor/constants/metadata';

import RecommendationArrowsImage from 'components/images/recommendation-arrows-image.vue';

const { fixedMetadata } = defineProps({
  fixedMetadata: {
    type: Object as PropType<IFixedMetadata>,
    required: true,
  },
});
</script>
