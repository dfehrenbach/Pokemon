<template>
  <v-card >
    <v-card-title>
      Pokemon Bag
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="items"
      class="elevation-1"
      hide-actions
    >
      <template slot="items" scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.level }}</td>
        <td class="text-xs-right">{{ props.item.min_evolution_level }}</td>
        <td class="text-xs-right">{{ props.item.evolution_item }}</td>
        <td class="text-xs-right">{{ props.item.evolves_to_name }}</td>
        <td class="text-xs-right">
          <v-btn fab dark small color="red darken-4" @click="remove(props.item)">
            <v-icon dark>remove</v-icon>
          </v-btn>        
        </td>
        <div v-if="usable_items.filter(el => el.title == 'Rare Candy')[0].value > 0 && props.item.level != 100">
          <td class="text-xs-right">
            <v-btn fab dark small color="green darken-2" @click="levelup(props.item)">
              <v-icon dark>add</v-icon>
            </v-btn>
          </td>
        </div>
        <div v-else>
          <td class="text-xs-right">
            <v-btn fab dark small disabled color="green darken-2" @click="levelup(props.item)">
              <v-icon dark>add</v-icon>
            </v-btn>
          </td>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
  import bus from '../bus.js'
  export default {
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        search: [],
        headers: [
        {text: 'Name', align: 'left', sortable: true, value:'name'},
        {text: 'Level', sortable: true, value:'level'},
        {text: 'Evolving Level', sortable: true, value:'min_evolution_level'},
        {text: 'Evolving Item', sortable: true, value:'evolution_item'},
        {text: 'Evolution', sortable: true, value:'evolves_to_name'},
        {text: 'Remove'},
        {text: 'Level-Up'},
        ],
        items: [
        ],
        usable_items:[
        ],
      }
    },
    created() {
      bus.$on('push-pokemon', this.add);
      bus.$on('initialize-items', (items) => this.usable_items = items)
      bus.$on('increment-item', this.check_evolvable)
    },
    methods: {
      add(pokemon){
        this.items.push(pokemon)
        if(pokemon.evolvable(this.usable_items.filter(el=>el.value > 0).map(el=>el.title.toLowerCase()))){
            this.evolve(pokemon);
        }
      },
      remove(pokemon){
        this.items = this.items.filter(function(el) {
          return el !== pokemon;
        })
      },
      levelup(pokemon){
        if(pokemon.level != 100){
          var rare_candies_item = this.usable_items.filter(el => el.title == 'Rare Candy')[0];
          if(rare_candies_item.value > 0){
            rare_candies_item.value -= 1;
            pokemon.level += 1;
          }
        }
        if(pokemon.evolvable_by_level()){
          this.evolve(pokemon);
        } 
        else if(pokemon.evolvable(this.usable_items.filter(el=>el.value > 0).map(el=>el.title.toLowerCase()))) {
          this.evolve(pokemon);
          this.usable_items.filter(el=>el.title.toLowerCase() == pokemon.evolution_item)[0].value -= 1
        }
      },
      evolve(pokemon){
        if(pokemon.evolvable_by_level()){
          var new_p = pokemon.evolve();
          this.remove(pokemon);
          new_p.ready.done(() => this.add(new_p))
        } 
        else if(pokemon.evolvable(this.usable_items.filter(el=>el.value > 0).map(el=>el.title.toLowerCase()))){
          var new_p = pokemon.evolve();
          this.usable_items.filter(el=>el.title.toLowerCase() == pokemon.evolution_item)[0].value -= 1
          this.remove(pokemon);
          new_p.ready.done(() => this.add(new_p))
        }
      },
      check_evolvable(item){
        var poke_list = this.items.filter(el => el.evolution_item == item.title.toLowerCase());
        if(poke_list.length > 0){
          for(var p in poke_list){
            var evo_item = this.usable_items.filter(el => el.title == item.title)[0];
            if(evo_item.value > 0){
              this.evolve(poke_list[p])
            }
          }
        }
      },
    }
  }
</script>
