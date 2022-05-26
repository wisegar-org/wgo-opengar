<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12">
      <example-component
        title="Example component template"
        active
        :todos="todos"
        :meta="meta"
      ></example-component>
    </div>
    <div class="col-12"><DummyComponent /></div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from "components/models";
import ExampleComponent from "components/ExampleComponent.vue";
import { defineComponent, ref } from "vue";
import DummyComponent from "../../../../wgo-base/components/DummyComponent.vue";

export default defineComponent({
  name: "IndexPage",
  components: { ExampleComponent, DummyComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: "ct1",
      },
      {
        id: 2,
        content: "ct2",
      },
      {
        id: 3,
        content: "ct3",
      },
      {
        id: 4,
        content: "ct4",
      },
      {
        id: 5,
        content: "ct5",
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { todos, meta };
  },
});
</script>
