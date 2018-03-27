<template>
  <v-navigation-drawer
    clipped
    permanent
    v-model="drawer"
    enable-resize-watcher
    app
  >
    <v-list class="pt-0" dense>
      <v-divider light></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" @click="increment_item(item)">
        <v-list-tile-content>
          {{ item.value}}
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import bus from '../bus.js';
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Rare Candy',    value:20},
          { title: 'Water-Stone',   value:0 },
          { title: 'Thunder-Stone', value:0 },
          { title: 'Moon-Stone',    value:0 },
          { title: 'Leaf-Stone',    value:0 },
          { title: 'Fire-Stone',    value:0 },
        ],
      }
    },
    mounted() {
      bus.$emit('initialize-items', this.items);
    },
    methods: {
      toggle_drawer() {
        this.drawer = !this.drawer
      },
      increment_item(item) {
        item.value += 1
        bus.$emit('increment-item', item);
      }
    }
  }
</script>