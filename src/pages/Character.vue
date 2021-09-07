<template>
  <q-page class="flex flex-center">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <q-card-section class="my-info-card">
          <h4 class="my-font">{{ characterInfo.name }}</h4>
          <q-img
            class="my-character-image"
            :src="characterInfo.image"
            spinner-color="white"
          />
          <div class="row my-character-card">
            <p class="col-4 text-subtitle2">Species</p>
            <p class="col-8 text-body2 text-right">
              {{ characterInfo.species }}
            </p>
          </div>
          <div class="row my-character-card">
            <p class="col-4 text-subtitle2">Type</p>
            <p class="col-8 text-body2 text-right">
              {{ characterInfo.type }}
            </p>
          </div>
          <div class="row my-character-card">
            <p class="col-4 text-subtitle2">Gender</p>
            <p class="col-8 text-body2 text-right">
              {{ characterInfo.gender }}
            </p>
          </div>
          <div class="row my-character-card">
            <p class="col-4 text-subtitle2">Origin</p>
            <div class="col-8 text-body2 text-right">
              <div>
                <div class="row">
                  <p class="col-4 text-subtitle2">Name</p>
                  <p class="col-8 text-body2 text-right">
                    {{ origin.name }}
                  </p>
                </div>
                <div class="row">
                  <p class="col-4 text-subtitle2">Type</p>
                  <p class="col-8 text-body2 text-right">
                    {{ origin.type }}
                  </p>
                </div>
                <div class="row">
                  <p class="col-4 text-subtitle2">Dimension</p>
                  <p class="col-8 text-body2 text-right">
                    {{ origin.dimension }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-character-card" style="border: none">
            <p class="col-4 text-subtitle2">Location</p>
            <div class="col-8 text-body2 text-right">
              <div>
                <div class="row">
                  <p class="col-4 text-subtitle2">Name</p>
                  <p class="col-8 text-body2 text-right">
                    {{ location.name }}
                  </p>
                </div>
                <div class="row">
                  <p class="col-4 text-subtitle2">Type</p>
                  <p class="col-8 text-body2 text-right">
                    {{ location.type }}
                  </p>
                </div>
                <div class="row">
                  <p class="col-4 text-subtitle2">Dimension</p>
                  <p class="col-8 text-body2 text-right">
                    {{ location.dimension }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-list dense padding class="rounded-borders">
          <p class="text-subtitle2 q-pa-sm text-center">
            Episodes {{ characterInfo.name }} is in
          </p>
          <q-item
            clickable
            v-ripple
            v-for="x in episodes"
            :key="x"
            @click="retrieving(x.id)"
          >
            <q-item-section>{{ x.episode }}</q-item-section>
            <q-item-section>{{ x.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { SessionStorage } from "quasar";

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
    if (SessionStorage.id == undefined) {
      SessionStorage.set("id", this.id);
    }
  },

  created() {
    if (SessionStorage.id == this.id) {
      this.id = SessionStorage.getItem("id");
    }
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
              type
              dimension
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
  background-color: $info
  border-radius: 3%
.my-card
  max-width: 80vh
  background-color: $primary
  width: 75%
  margin: 2vh 0 2vh
.my-character-card
  padding: 2vh 0 0 0
  border-bottom: 1px solid $dark
.my-character-image
  margin: 0 0 2vh 0
  border: 2px solid $dark
  border-radius: 3%
  height: 30%
  max-width: 30%
.my-font
  font-family: 'customfont'
  color: $primary
  -webkit-text-stroke: 1px black
</style>
