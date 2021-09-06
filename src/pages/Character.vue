<template>
  <q-page class="flex flex-center">
    <q-list dense bordered padding class="rounded-borders">
      <q-item>{{ characterInfo.name }}</q-item>
      <q-item
        clickable
        v-ripple
        v-for="x in episodes"
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
  name: "Character",

  data() {
    return {
      characterInfo: [],
      episodes: [],
      id: this.$route.params.userId,
    };
  },

  methods: {
    retrieving(id) {
      const episodeId = id;
      this.$router.push({
        name: "episodePage",
        params: { episodeId },
      });
    },
  },

  created() {
    axios
      .post(
        "https://rickandmortyapi.com/graphql",
        {
          query: `query SearchCharacter($id: ID!) {
          character (id: $id){
            id
            name
            species
            type
            gender
            origin {
              name
              type
              dimension
            }
            location {
              name
            }
            image
            episode{
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
        console.log(res.data.data.character);
        this.characterInfo = res.data.data.character;
        this.episodes = res.data.data.character.episode;
      });
  },
});
</script>
