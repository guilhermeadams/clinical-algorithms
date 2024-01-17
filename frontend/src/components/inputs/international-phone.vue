<template>
  <vue-tel-input
    v-model="phone"
    :input-options="{ placeholder: 'Teléfono', styleClasses: 'custom-vue-tel-input' }"
    @input="emit('update', phone)"
  ></vue-tel-input>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'src/css/vue-tel-input.css';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update']);

const phone = ref('');

onBeforeMount(() => {
  phone.value = props.value;
});
</script>

<style lang="sass">
.vue-tel-input,
.vue-tel-input:active,
.vue-tel-input:hover,
.vue-tel-input:focus,
.vue-tel-input:not(:focus)
  border: none
  box-shadow: none

.vti__input
  border-bottom: 1px solid #B8B8B8
  padding: 10px

.vti__input:focus
  border-bottom: 1px solid #B8B8B8

.vti__dropdown-list
  max-width: 322px !important
</style>
