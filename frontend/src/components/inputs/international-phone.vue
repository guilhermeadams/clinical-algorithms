<template>
  <vue-tel-input
    v-model="data.phone"
    :input-options="{ placeholder: 'Teléfono', styleClasses: 'custom-vue-tel-input' }"
    @input="emitPhone"
    @country-changed="setCountry"
  ></vue-tel-input>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'src/css/vue-tel-input.css';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update']);

const data = reactive({
  phone: '',
  countryCode: '',
});

const setCountry = (country: { dialCode: string }) => {
  data.countryCode = country.dialCode;

  data.phone = '';
};

const emitPhone = () => {
  let finalPhone: string;

  // remove + from country code
  if (data.phone.includes('+')) {
    const phoneWithNoPlus = data.phone.replace(`+${data.countryCode}`, '');

    finalPhone = `${data.countryCode} ${phoneWithNoPlus}`;
  } else {
    finalPhone = `${data.countryCode} ${data.phone}`;
  }

  emit('update', finalPhone);
};

onBeforeMount(() => {
  data.phone = props.value;
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
