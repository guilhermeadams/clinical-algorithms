<template>
  <q-dialog
    v-model="showDialog"
    persistent
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <q-btn
          style="margin: 10px"
          class="absolute-top-right"
          icon="close"
          color="primary"
          round
          flat
          @click="emitEvent('close')"
        />

        <div class="text-h6 text-primary">
          {{ props.title }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none q-px-md">
        <slot />
      </q-card-section>

      <q-card-actions class="q-pa-md">
        <div class="row full-width">
          <div class="col-12">
            <q-btn
              v-if="!props.hideDelete && !props.editing"
              :loading="props.deleting"
              class="float-right"
              style="padding: 0 30px"
              label="Borrar"
              color="negative"
              push
              @click="emitEvent('delete', true)"
            />

            <q-btn
              v-if="!props.editing && !hideDelete"
              :loading="props.editing"
              class="float-right q-mr-md"
              style="padding: 0 30px"
              label="Editar"
              color="primary"
              push
              @click="emitEvent('edit', true)"
            />

            <q-btn
              v-else
              :loading="props.saving"
              style="padding: 0 30px"
              class="float-right"
              label="Guardar"
              color="positive"
              push
              @click="emitEvent('save')"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emitEvent = defineEmits(['save', 'delete', 'close', 'edit']);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  deleting: {
    type: Boolean,
    default: false,
  },
  saving: {
    type: Boolean,
    default: false,
  },
  editing: {
    type: Boolean,
    default: false,
  },
  hideDelete: {
    type: Boolean,
    default: false,
  },
});

const showDialog = ref(false);

watch(() => props.show, (value) => {
  showDialog.value = value;

  if (!showDialog.value) {
    emitEvent('edit', false);
  }
});
</script>
