<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title>
          <a href="/" style="text-decoration: none; color: black"
            >Rick and Morty Cave</a
          >
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      style="background-color: #97ce4c"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header> Navigation </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container class="my-page-container">
      <div class="blur">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Characters List",
    icon: "mood",
    link: "/",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  // components: {
  //   EssentialLink,
  // },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.my-drawer
  background-color: red
.my-page-container
  background-image: url('../assets/space.jpg')
  background-repeat: no-repeat
  background-size: cover
.blur
  animation: changeWidth 8s ease-in-out infinite
  backdrop-filter: blur(3px)
</style>
