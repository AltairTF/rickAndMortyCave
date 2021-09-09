<template>
  <div class="col-xs-10 col-sm-6 col-md-auto my-info-card">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InfoCard",
});
</script>

<style lang="sass" scoped>

.my-info-card
  min-height: 45vh
  width: 35vh
  padding: 1vh
  text-align: center
  margin: 1vh
  background: linear-gradient(45deg, $secondary, $primary )
  border-radius: 10px
  border: 2px solid $dark
</style>
