<template>
  <q-page class="flex flex-center">
    <q-list dense bordered padding class="rounded-borders">
      <q-item
        clickable
        v-ripple
        v-for="characters in charactersName"
        :key="characters"
      >
        <q-item-section>
          {{ characters.name }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Characters",

  data() {
    return {
      charactersName: [],
    };
  },

  created() {
    axios({
      url: "https://rickandmortyapi.com/graphql",
      method: "post",
      data: {
        query: `
          {
            characters {
              results {
                name
              }
            }
          }
        `,
      },
    }).then((response) => {
      const query = response.data;
      this.charactersName = query.data.characters.results;
    });
  },
});
</script>
