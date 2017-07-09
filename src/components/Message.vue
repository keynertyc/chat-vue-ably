<template>
  <div class="">
    <strong>{{ message.data.name }}:</strong> {{ message.data.message }}
  </div>
</template>

<script>
export default {
  name: 'message',
  props: ['message'],
  data() {
    return {};
  },
};
</script>

<style>
</style>
