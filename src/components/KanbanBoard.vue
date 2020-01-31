<template>
  <div class="board">
    <div class="row">
        <div class="col-md">
          <task-lane laneId="todo" title="Todo" :laneItems="todoItems"></task-lane>
        </div>
        <div class="col-md">
          <task-lane laneId="inProgress" title="In progress" :laneItems="inProgressItems"></task-lane>
        </div>
        <div class="col-md">
          <task-lane laneId="done" title="Done" :laneItems="doneItems"></task-lane>
        </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import TaskLane from './TaskLane';

export default {  
  name: 'KanbanBoard',
  components: {
    'task-lane': TaskLane
  },  
  computed: mapState({
    todoItems: s => s.items.todo,
    inProgressItems: s => s.items.inProgress,
    doneItems: s => s.items.done
  })
};
</script>
