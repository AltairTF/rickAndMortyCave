<template>
  <q-page class="flex flex-center" v-if="characterInfo.name">
    <div class="row flex-center" bordered>
      <div class="col-xs-10 col-sm-6 col-md-auto my-info-card self-start">
        <q-img
          class="my-character-image"
          :src="characterInfo.image"
          spinner-color="white"
        />
        <p class="text-subtitle2">{{ characterInfo.name }}</p>
        <div class="row">
          <p class="col-6 text-subtitle2">Species</p>
          <p class="col-6 text-body2">
            {{ characterInfo.species }}
          </p>
        </div>
        <div class="row" v-if="characterInfo.type">
          <p class="col-6 text-subtitle2">Type</p>
          <p class="col-6 text-body2">
            {{ characterInfo.type }}
          </p>
        </div>
        <div class="row">
          <p class="col-6 text-subtitle2">Gender</p>
          <p class="col-6 text-body2">
            {{ characterInfo.gender }}
          </p>
        </div>
        <div class="row">
          <p class="col-6 text-subtitle2">Origin</p>
          <p class="col-6 text-body2">
            {{ origin.name }}
          </p>
        </div>
        <div class="row">
          <p class="col-6 text-subtitle2">Location</p>
          <p class="col-6 text-body2">
            {{ location.name }}
          </p>
        </div>
      </div>
      <div class="col-xs-10 col-sm-6 col-md-auto my-info-card">
        <q-list dense padding class="rounded-borders">
          <p class="text-subtitle2">Episodes {{ characterInfo.name }} is in</p>
          <q-item
            clickable
            v-ripple
            v-for="x in episodes"
            :key="x"
            @click="retrieving(x.id)"
          >
            <q-item-section class="text-subtitle2">{{
              x.episode
            }}</q-item-section>
            <q-item-section>{{ x.name }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { SessionStorage } from "quasar";
import { Loading } from "quasar";

export default defineComponent({
  name: "Character",

  data() {
    return {
      characterInfo: [],
      origin: [],
      location: [],
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

  mounted() {
    if (SessionStorage.character_id == undefined) {
      SessionStorage.set("character_id", this.id);
    }
  },

  created() {
    if (SessionStorage.character_id == this.id) {
      this.id = SessionStorage.getItem("character_id");
    }
    Loading.show({
      delay: 500,
      message: "Please wait...",
    });
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
            }
            location {
              name
            }
            image
            episode{
              id
              name
              episode
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
        this.characterInfo = res.data.data.character;
        this.origin = res.data.data.character.origin;
        this.location = res.data.data.character.location;
        this.episodes = res.data.data.character.episode;
      })
      .catch((err) => {
        this.$router.push("/404");
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
  min-width: 250px
.my-character-image
  margin: 0 0 2vh 0
  border: 2px solid $dark
  border-radius: 50%
  min-width: 100px
  min-height: 100px
  max-width: 50%
  max-height: 50%
.my-font
  font-family: 'customfont'
  color: $primary
  -webkit-text-stroke: 1px black
</style>
