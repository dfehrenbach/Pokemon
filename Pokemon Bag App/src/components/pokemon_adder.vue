<template>
  <v-card color="dark" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12 sm6>
            <v-subheader v-text="'Add to Bag'" style="justify-content: center"></v-subheader>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm10 justify-start>
            <v-select
              autocomplete
              :items="items"
              item-value="url"
              item-text="name"
              label="Pokemon"
              v-model="select"
              single-line
              return-object
              cache-items
            ></v-select>
          </v-flex>
          <v-flex justify-end>
            <div v-if="select.length != null">
              <v-btn fab dark disabled color="red accent-2" @click.stop="selected(select)">
                <v-icon dark>add</v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-btn fab dark color="red accent-2" @click.stop="selected(select)">
                <v-icon dark>add</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  import axios from 'axios';
  import bus from '../bus.js';

  export default {
    data: () => ({
      items: [],
      select: []
    }),
    created() {
      axios.get('https://pokeapi.co/api/v2/generation/1/')
        .then(response => {
          this.items = response.data.pokemon_species;
          for(var i in this.items){
            this.items[i].name = this.items[i].name.charAt(0).toUpperCase() + this.items[i].name.slice(1)
          }
        })
        .catch(function(e) {
          console.log('There was an ERROR: ', e);
        });
    },
    methods: {
      selected(pokemon) {
        this.select = [];
        bus.$emit('add-pokemon', pokemon);
      }
    }
  }
</script>