<template>
  <q-page class="flex flex-center" v-if="episodeInfo.name">
    <div class="row flex-center" bordered>
      <InfoCard>
        <p class="text-subtitle2" style="padding: 1vh">
          {{ episodeInfo.episode }}
        </p>
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
      </InfoCard>
      <InfoCard>
        <q-list dense padding class="rounded-borders">
          <p class="text-subtitle2">Characters in {{ episodeInfo.name }}</p>
          <div style="max-height: 37vh" class="scroll">
            <q-item
              clickable
              v-ripple
              v-for="x in characters"
              :key="x"
              @click="retrieving(x.id)"
            >
              <q-item-section avatar>
                <q-img class="my-avatar" :src="x.image" spinner-color="white" />
              </q-item-section>
              <q-item-section>{{ x.name }}</q-item-section>
            </q-item>
          </div>
        </q-list>
      </InfoCard>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { SessionStorage } from "quasar";
import { Loading } from "quasar";
import InfoCard from "components/InfoCard.vue";

export default defineComponent({
  name: "Episode",

  data() {
    return {
      episodeInfo: [],
      characters: [],
      id: this.$route.params.episodeId,
    };
  },

  components: {
    InfoCard,
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
                image
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
      })
      .catch((err) => {
        this.$router.push("/404");
      });
  },
});
</script>

<style lang="sass" scoped>
.my-avatar
  border: 1px outset $dark
  border-radius: 25%
  height: 45px
  max-width: 45px
</style>
