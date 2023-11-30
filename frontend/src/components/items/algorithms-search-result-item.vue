<template>
  <q-card class="shadow-light q-my-lg">
    <q-card-section
      class="search-result-item"
    >
      <q-list
        v-if="!result.nodes.length"
        separator
      >
        <q-item
          clickable
          v-ripple
          @click="goEditor(result.id, null)"
        >
          <div
            class="text-body1"
            style="margin-top:5px"
            v-html="`<b>Algoritmo:</b> ${highlightSearchKeyword(result.title, keyword)}`"
          />
        </q-item>
      </q-list>

      <div
        v-else
        class="text-body1"
        v-html="`<b>Algoritmo:</b> ${ highlightSearchKeyword(result.title, keyword) }`"
      />

      <q-list separator>
        <q-item
          v-for="node of result.nodes"
          :key="`node-${node.id}`"
          clickable
          v-ripple
          @click="goEditor(result.id, node)"
        >
          <div
            v-html="`<b>Nodo:</b> ${highlightSearchKeyword(node.label, keyword)}`"
            class="q-mt-sm"
          />
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { highlightSearchKeyword } from 'src/services/texts';
import { IAlgorithmThoroughSearchResultItem, INode } from 'src/services/algorithms';
import { PropType } from 'vue';
import { FLOWCHARTS_EDITOR } from 'src/router/routes/algorithms';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  keyword: {
    type: String,
    required: true,
  },
  result: {
    type: Object as PropType<IAlgorithmThoroughSearchResultItem>,
    required: true,
  },
});

const goEditor = (algorithmId: number, node: INode | null) => {
  if (node) {
    router.push({
      name: FLOWCHARTS_EDITOR,
      query: {
        id: node.algorithm_id,
        node: node.node_id,
        search: props.keyword,
      },
    });
  } else if (algorithmId) {
    router.push({
      name: FLOWCHARTS_EDITOR,
      query: {
        id: algorithmId,
        search: props.keyword,
      },
    });
  }
};
</script>
