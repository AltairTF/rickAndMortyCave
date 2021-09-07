<template>
  <q-page class="flex flex-center column">
    <h4 class="my-font">Rick and Morty Character List</h4>
    <q-list dense bordered padding class="my-list">
      <q-input
        color="dark"
        v-model="filter"
        label="Search by Name"
        v-if="charactersName.length > 0"
      >
        <q-btn
          class="my-rounded-btn"
          color="accent"
          icon="search"
          @click="charactersRequest((this.next = 1), this.filter)"
        />
      </q-input>
      <div>
        <q-item
          clickable
          v-ripple
          v-for="characters in charactersName"
          :key="characters"
          @click="retrieving(characters.id)"
        >
          <q-item-section avatar>
            <q-img
              class="my-avatar"
              :src="characters.image"
              spinner-color="white"
            />
          </q-item-section>
          <q-item-section>
            {{ characters.name }}
          </q-item-section>
        </q-item>
      </div>
      <div class="q-pa-sm doc-container row">
        <q-btn
          class="my-rounded-btn-navigate col"
          color="accent"
          v-if="charactersName.length > 0"
          @click="charactersRequest(this.prev)"
          icon="chevron_left"
        />
        <p v-if="charactersName.length > 0" class="col-8 text-center">
          {{ this.next - 1 }} of {{ this.pages }}
        </p>
        <q-btn
          class="my-rounded-btn-navigate col"
          color="accent"
          v-if="charactersName.length > 0"
          @click="charactersRequest(this.next)"
          icon="chevron_right"
        />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { Notify } from "quasar";
import { Loading } from "quasar";

export default defineComponent({
  name: "Characters",

  data() {
    return {
      charactersName: [],
      imageURL: "",
      next: 0,
      prev: 0,
      filter: "",
      pages: 0,
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
    charactersRequest(page, filter) {
      Loading.show({
        delay: 500,
        message: "Please wait...",
      });
      axios
        .post(
          "https://rickandmortyapi.com/graphql",
          {
            query: `query SearchCharacters($page: Int, $name: String) {
            characters(page: $page, filter: {name: $name}) {
              results{
                id
                name
                image
              }
              info{
                pages
                next
                prev
              }
            }
          }`,
            variables: {
              page: page,
              name: filter,
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
          const query = res.data.data.characters;
          this.charactersName = query.results;
          this.next = query.info.next;
          this.prev = query.info.prev;
          this.imageURL = query.results.image;
          this.pages = query.info.pages;
        })
        .catch(function (error) {
          console.log(error);
          Notify.create({
            type: "negative",
            timeout: 600,
            message: "Character Not Found",
          });
        });
    },
  },

  created() {
    this.charactersRequest();
  },
});
</script>

<style lang="sass" scoped>
.doc-container > div + div
  margin-top: 1rem
.my-list
  background-color: $primary
  min-width: 45vh
  max-width: 100vh
  padding: 2vh
  margin-bottom: 2vh
  border-radius: 25px
  border: 2px solid $dark
.my-avatar
  border: 1px outset $dark
  border-radius: 25%
  height: 45px
  max-width: 45px
.my-rounded-btn
  border-radius: 25%
  max-width: 45px
  height: 45px
.my-font
  font-family: 'customfont'
  color: $info
  -webkit-text-stroke: 1px black
</style>
