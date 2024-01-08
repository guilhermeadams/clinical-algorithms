<template>
  <q-page class="bg-grey-1" padding>
    <algorithms-categories-table />

    <edit-algorithm-category-modal />
  </q-page>
</template>

<script setup lang="ts">
import AlgorithmsCategoriesTable from 'components/tables/algorithms-categories-table.vue';
import EditAlgorithmCategoryModal from 'components/modals/algorithms/edit-algorithm-category-modal.vue';
import AlgorithmsCategories from 'src/services/algorithms-categories';
import { provide } from 'vue';

const algorithmsCategories = new AlgorithmsCategories();

provide('algorithmsCategories', algorithmsCategories);
</script>
