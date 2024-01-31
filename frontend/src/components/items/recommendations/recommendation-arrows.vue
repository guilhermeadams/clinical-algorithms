<template>
  <div
    v-if="fixedMetadata.intervention && fixedMetadata.comparator"
    class="row"
  >
    <div class="col-4 text-caption q-pr-sm">
      {{ fixedMetadata.comparator }}
    </div>

    <div class="col-4 text-center">
      <img :src="StrongInFavorIntervention" class="full-width" />
    </div>

    <div class="col-4 text-caption q-pl-sm">
      {{ fixedMetadata.intervention }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { IFixedMetadata } from 'src/services/editor/metadata';
import { PropType } from 'vue';

import StrongInFavorIntervention from 'assets/imgs/recommendation_arrows/conditional_both_directions.png';

const props = defineProps({
  fixedMetadata: {
    type: Object as PropType<IFixedMetadata>,
    required: true,
  },
});
</script>
