<template>
  <q-page class="flex flex-center">
    <q-list dense bordered padding class="rounded-borders">
      <q-input filled v-model="filter" label="Search by Name">
        <q-btn
          color="secondary"
          @click="charactersRequest(this.next, this.filter)"
          >Search</q-btn
        >
      </q-input>
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
      <q-btn
        color="primary"
        v-if="this.prev > 0"
        @click="charactersRequest(this.prev)"
        >Previous Page</q-btn
      >
      <q-btn
        color="primary"
        v-if="charactersName.length > 0"
        @click="charactersRequest(this.next)"
        >Next Page</q-btn
      >
    </q-list>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { Notify } from "quasar";

export default defineComponent({
  name: "Characters",

  data() {
    return {
      charactersName: [],
      next: 0,
      prev: 0,
      filter: "",
    };
  },

  methods: {
    triggerNegative() {
      Notify.create({
        type: "positive",
        color: "positive",
        timeout: 1000,
        position: "center",
        message: "Yeah. Data saved. Great Job!",
      });
    },
    retrieving(id) {
      const userId = id;
      this.$router.push({
        name: "characterPage",
        params: { userId },
      });
    },
    charactersRequest(page, filter) {
      axios
        .post(
          "https://rickandmortyapi.com/graphql",
          {
            query: `query SearchCharacters($page: Int, $name: String) {
            characters(page: $page, filter: {name: $name}) {
              results{
                id
                name
              }
              info{
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
          const query = res.data;
          this.charactersName = query.data.characters.results;
          this.next = query.data.characters.info.next;
          this.prev = query.data.characters.info.prev;
        })
        .catch(function (error) {
          Notify.create({
            type: "negative",
            message: "Character Not Found",
          });
        });
    },
  },

  created() {
    this.charactersRequest();
    // axios({
    //   url: "https://rickandmortyapi.com/graphql",
    //   method: "post",
    //   data: {
    //     query: `
    //       {
    //         characters {
    //           results {
    //             name
    //             id
    //           }
    //           info{
    //             next
    //             prev
    //           }
    //         }
    //       }
    //     `,
    //   },
    // }).then((response) => {
    //   const query = response.data;
    //   console.log(query.data.characters.info.next);
    //   this.charactersName = query.data.characters.results;
    // });
  },
});
</script>
