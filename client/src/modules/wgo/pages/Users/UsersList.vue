<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <UserListComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserListComponent from '../../components/Users/UsersListComponent.vue';

@Component({
  components: {
    UserListComponent
  }
})
export default class UsersPage extends Vue {
  
}
</script>
