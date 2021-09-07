<template>
  <div
    class="
      fullscreen
      bg-primary
      text-white text-center
      q-pa-md
      flex flex-center
    "
  >
    <div>
      <div class="text-h2 my-font">Something Went Wrong...</div>

      <q-btn
        class="q-mt-xl"
        color="secondary"
        text-color="dark"
        unelevated
        to="/"
        label="Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error404",
});
</script>

<style lang="sass" scoped>
.my-font
  font-family: 'customfont'
  color: $info
  opacity: 0.9
  -webkit-text-stroke: 1px black
</style>
