<template>
  <q-page class="flex flex-center">
    <q-list dense bordered padding class="rounded-borders">
      <q-item
        clickable
        v-ripple
        v-for="characters in charactersName"
        :key="characters"
        @click="retrieving(characters.id)"
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

  methods: {
    retrieving(id) {
      const userId = id;
      console.log("USERID", userId);
      this.$router.push({
        name: "characterPage",
        params: { userId },
      });
    },
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
                id
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
