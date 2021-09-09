<template>
  <q-page class="flex flex-center" v-if="episodeInfo.name">
    <div class="row flex-center" bordered>
      <div class="col-xs-10 col-sm-6 col-md-auto my-info-card self-start">
        <p class="text-subtitle2">{{ episodeInfo.episode }}</p>
        <div class="row">
          <p class="col-6 text-subtitle2">Name</p>
          <p class="col-6 text-body2">
            {{ episodeInfo.name }}
          </p>
        </div>
        <div class="row">
          <p class="col-6 text-subtitle2">Episode</p>
          <p class="col-6 text-body2">
            {{ episodeInfo.episode }}
          </p>
        </div>
        <div class="row">
          <p class="col-6 text-subtitle2">Air Date</p>
          <p class="col-6 text-body2">
            {{ episodeInfo.air_date }}
          </p>
        </div>
      </div>
      <div class="col-xs-10 col-sm-6 col-md-auto my-info-card">
        <q-list dense padding class="rounded-borders">
          <p class="text-subtitle2">Characters in {{ episodeInfo.name }}</p>
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
      </div>
    </div>
  </q-page>
  <!-- <q-page class="flex flex-center">
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
  </q-page> -->
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { SessionStorage } from "quasar";
import { Loading } from "quasar";

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
      this.$router.push({
        name: "characterPage",
        params: { userId },
      });
    },
  },

  mounted() {
    if (SessionStorage.episode_id == undefined) {
      SessionStorage.set("episode_id", this.id);
    }
  },

  created() {
    if (SessionStorage.episode_id == this.id) {
      this.id = SessionStorage.getItem("episode_id");
    }
    Loading.show({
      delay: 500,
      message: "Please wait...",
    });
    axios
      .post(
        "https://rickandmortyapi.com/graphql",
        {
          query: `query SearchEpisode($id: ID!) {
            episode (id: $id){
              id
              name
              air_date
              episode
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
        Loading.hide();
        this.episodeInfo = res.data.data.episode;
        this.characters = res.data.data.episode.characters;
      });
  },
});
</script>

<style lang="sass" scoped>
.my-info-card
  padding: 1vh
  text-align: center
  margin: 1vh
  background: linear-gradient(45deg, $secondary, $primary )
  border-radius: 10px
  border: 2px solid $dark
  height: 100%
</style>
