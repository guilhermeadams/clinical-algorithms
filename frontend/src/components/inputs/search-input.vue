<template>
  <div>
    <q-input
      v-model="text"
      :label="props.label"
      maxlength="12"
      bottom-slots
      @update:model-value="emitSearch"
    >
      <template v-slot:append>
        <q-icon
          v-if="text !== ''"
          name="close"
          class="cursor-pointer"
          @click="emitClear"
        />

        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['search', 'clear']);

const text = ref('');

function emitSearch() {
  emit('search', text.value);
}

function emitClear() {
  text.value = '';

  emit('clear', '');
}
</script>
