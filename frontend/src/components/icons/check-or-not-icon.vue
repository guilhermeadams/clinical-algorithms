<template>
  <q-icon
    v-if="props.check"
    name="check"
    size="24px"
    color="positive"
  />

  <q-icon
    v-else
    name="close"
    size="24px"
    color="negative"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  check: {
    type: Boolean,
    required: true,
  },
});
</script>
