<template>
  <v-app id="inspire" dark>
    <item_drawer></item_drawer>
    <v-toolbar app fixed clipped-left color="red lighten-1">
      <v-toolbar-title class="white--text">Pokemon Bag App</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <v-layout column align-center>
            <img src="/public/go.svg" alt="Vuetify.js" class="mb-5" 
                style="max-width: 150px"/>
            <v-flex>
              <pokemon_adder></pokemon_adder>
            </v-flex>
            <v-flex style="padding: 16px">
              <pokemon_bag></pokemon_bag>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  import pokemon_adder from './components/pokemon_adder';
  import pokemon_bag from './components/pokemon_bag';
  import item_drawer from './components/item_drawer';
  import bus from './bus.js';
  import Pokemon from './pokemon.js';

  export default {
    name: 'app',
    components: { item_drawer, pokemon_bag, pokemon_adder },
    data () {
      return {
        pokemon: []
      }
    },
    created() {
      bus.$on('add-pokemon', this.create_pokemon);
    },
    methods: {
      create_pokemon(pokemon) {
        var p = new Pokemon(pokemon.name, pokemon.url);
        p.ready.done(() => { this.pokemon.push(p); bus.$emit('push-pokemon', p); });
      },
    }
  }
</script>
