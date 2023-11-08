<template>
  <q-dialog
    v-model="showDialog"
    persistent
  >
    <q-card>
      <q-card-section class="row items-center">
        <b class="q-px-md q-pt-sm">{{ props.title }}</b>
      </q-card-section>

      <q-card-section class="text-center q-pb-lg">
        {{ props.itemName }}
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          style="padding: 0 30px"
          label="Cancelar"
          color="primary"
          @click="emitEvent('cancel')"
          flat
        />

        <q-btn
          style="padding: 0 30px"
          label="Excluir"
          color="primary"
          push
          @click="emitEvent('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['cancel', 'confirm']);

const showDialog = ref(false);

watch(() => props.show, (value) => {
  showDialog.value = value;
});

const emitEvent = (eventName: 'cancel' | 'confirm') => {
  emits(eventName);
};
</script>
