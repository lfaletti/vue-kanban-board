<template>
    <div class="card">
        <h3 class="card-header">{{title}}</h3>
        <div class="card-body">
         <draggable v-model="draggables" @change="change" :options="{ group: 'default' }">             
              <div v-for="item in laneItems" :key="item.id">
                <item :item="item"></item>
             </div>
    </draggable>
  </div>
        <div class="card-footer text-muted">
            {{itemCount}}
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
import TaskLaneItem from './TaskLaneItem';

export default {
    name: 'TaskLane',
    props: ['laneItems', 'title', 'laneId'],
    components: {
        item: TaskLaneItem,
        draggable: Draggable
    },
    methods: {
        change(e) {
            //console.log(e);
            if (e.added) {
                var addedElement = e.added.element;
                var modifiedItem = { id: addedElement.id , text: addedElement.text, type: this.laneId };

                this.$store.dispatch('updateItemAction', modifiedItem );
            }
        }
    },
    computed: {
        itemCount() {
            if (!this.laneItems) return '';
            if (this.laneItems.length === 1) return '1 task';
            return `${this.laneItems.length} tasks`;
        },
       draggables: {
            get() {
            return this.laneItems;
            },
            set(laneItems) {        
                this.$store.commit('updateItem', {
                laneItems: laneItems,
                laneId: this.laneId
        });               
             
        },
    },          
    }
}
</script>

  <style>
    .card-body > * {
      min-height: 50px;
    }
  </style>