<template>
  <q-page class="flex flex-center">
    <q-list dense bordered padding class="rounded-borders">
      <q-item>{{ episodeInfo.name }}</q-item>
      <q-item
        clickable
        v-ripple
        v-for="x in characters"
        :key="x"
        @click="retrieving(x.id)"
      >
        <q-item-section>{{ x.name }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Episode",

  data() {
    return {
      episodeInfo: [],
      characters: [],
      id: this.$route.params.episodeId,
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
    axios
      .post(
        "https://rickandmortyapi.com/graphql",
        {
          query: `query SearchEpisode($id: ID!) {
            episode (id: $id){
              id
              name
              characters{
                id
                name
              }
            }
          }`,
          variables: {
            id: this.id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        this.episodeInfo = res.data.data.episode;
        this.characters = res.data.data.episode.characters;
      });
  },
});
</script>
