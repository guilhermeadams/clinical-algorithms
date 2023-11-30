<template>
  <q-card
    v-if="fixedMetadata"
    class="q-ma-xs q-mb-lg"
  >
    <q-card-section class="q-pa-none">
      <div class="q-pa-md">
        <div>
          <div class="float-right q-mt-sm">
            <b>Tipo:</b> {{ fixedMetadata.intervention_type }}
          </div>

          <div class="text-h6" style="text-transform: uppercase">
            {{ fixedMetadata.recommendation_type }}
          </div>
        </div>

        <div class="q-pt-md">
          <b>Dirección:</b> {{ fixedMetadata.direction }}
        </div>

        <div
          v-if="isFormal"
          class="q-pt-md"
        >
          <div class="float-right">
            <b>Certeza de la evidencia:</b> {{ fixedMetadata.certainty_of_the_evidence }}
          </div>

          <div>
            <b>Fuerza de la evidencia:</b> {{ fixedMetadata.strength }}
          </div>
        </div>
      </div>

      <q-separator />

      <div class="q-pa-md">
        <div class="q-pb-lg">
          <div class="q-pb-sm"><b>Descripción</b></div>

          <div>{{ fixedMetadata.description }}</div>
        </div>

        <div class="q-pb-lg">
          <div class="q-pb-sm"><b>Intervención</b></div>

          <div>{{ fixedMetadata.intervention }}</div>
        </div>

        <div class="q-pb-lg">
          <div class="q-pb-sm"><b>Comparador</b></div>

          <div>{{ fixedMetadata.comparator }}</div>
        </div>

        <div class="q-pb-lg">
          <div class="q-pb-sm"><b>Consideraciones de implementación</b></div>

          <div>{{ fixedMetadata.implementation_considerations }}</div>
        </div>

        <div class="q-pb-lg">
          <div class="q-pb-sm"><b>Comentarios adicionales</b></div>

          <div>{{ fixedMetadata.additional_comments }}</div>
        </div>

        <div class="q-pb-lg">
          <div class="q-pb-sm"><b>Fuente de recomendación</b></div>

          <div>{{ fixedMetadata.recommendation_source }}</div>
        </div>

        <div
          v-if="fixedMetadata.links.length"
          class="q-pb-lg"
        >
          <q-separator class="q-mb-lg" />

          <div class="q-pb-sm"><b>Enlaces</b></div>

          <q-card
            v-for="link of fixedMetadata.links"
            :key="`link-${fixedMetadata.index}-${link.index}`"
            class="q-mb-md"
          >
            <q-card-section>
              <div class="q-pb-sm"><b>URL</b></div>
              <a
                :href="link.url"
                target="_blank"
                class="text-primary"
                style="word-break: break-all"
              >
                {{ link.url }}
              </a>

              <div class="q-pb-sm"><b>Tipo:</b> {{ link.type }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onBeforeMount,
  inject,
  ref,
} from 'vue';

import { IFixedMetadata } from 'src/services/editor/metadata';

import Editor from 'src/services/editor';

const editor = inject('editor') as Editor;

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const fixedMetadata = ref<IFixedMetadata | null>(null);

const isFormal = computed(
  () => fixedMetadata.value && fixedMetadata.value.recommendation_type === 'Recomendación formal',
);

onBeforeMount(() => {
  const metadata = editor.metadata.getFromElement();

  if (metadata) {
    const { fixed } = metadata;

    fixedMetadata.value = { ...fixed[props.index - 1] };
  }
});

onBeforeUnmount(() => {
  editor.metadata.clearMetadata();
});
</script>
