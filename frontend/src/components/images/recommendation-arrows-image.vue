<template>
  <img
    v-if="image"
    :src="image"
    class="full-width"
    alt=""
  />
</template>

<script setup lang="ts">
import { onBeforeMount, ref, PropType } from 'vue';

import { IFixedMetadata } from 'src/services/editor/constants/metadata';

import StrongInFavorIntervention from 'assets/imgs/recommendation_arrows/strong_in_favor_intervention.png';
import StrongInFavorComparator from 'assets/imgs/recommendation_arrows/strong_in_favor_comparator.png';
import ConditionalBothDirections from 'assets/imgs/recommendation_arrows/conditional_both_directions.png';
import ConditionalInFavorIntervention from 'assets/imgs/recommendation_arrows/conditional_in_favor_intervention.png';
import ConditionalInFavorComparator from 'assets/imgs/recommendation_arrows/conditional_in_favor_comparator.png';

import {
  IN_FAVOR_OF_THE_INTERVENTION,
  AGAINST_THE_INTERVENTION,
  BOTH,
} from 'src/services/editor/constants/metadata/direction';

import {
  CONDITIONAL_RECOMMENDATION,
  STRONG_RECOMMENDATION,
} from 'src/services/editor/constants/metadata/recommendation_strength';

const { fixedMetadata: data } = defineProps({
  fixedMetadata: {
    type: Object as PropType<IFixedMetadata>,
    required: true,
  },
});

const image = ref('');

onBeforeMount(() => {
  if (!data) return;

  // STRONG, IN FAVOR
  if (
    data.strength === STRONG_RECOMMENDATION
    && data.direction === IN_FAVOR_OF_THE_INTERVENTION
  ) {
    image.value = String(StrongInFavorIntervention);
  }

  // CONDITIONAL, IN FAVOR
  if (
    data.strength === CONDITIONAL_RECOMMENDATION
    && data.direction === IN_FAVOR_OF_THE_INTERVENTION
  ) {
    image.value = String(ConditionalInFavorIntervention);
  }

  // CONDITIONAL, BOTH
  if (
    data.strength === CONDITIONAL_RECOMMENDATION
    && data.direction === BOTH
  ) {
    image.value = String(ConditionalBothDirections);
  }

  // CONDITIONAL, AGAINST
  if (
    data.strength === CONDITIONAL_RECOMMENDATION
    && data.direction === AGAINST_THE_INTERVENTION
  ) {
    image.value = String(ConditionalInFavorComparator);
  }

  // STRONG, AGAINST
  if (
    data.strength === STRONG_RECOMMENDATION
    && data.direction === AGAINST_THE_INTERVENTION
  ) {
    image.value = String(StrongInFavorComparator);
  }
});
</script>
