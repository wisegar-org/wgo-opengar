<template>
  <Expanded :labels="labels" icon="person" group="userExpanded">
    <template slot="content">
      <div class="row q-py-sm">
        <div class="col-12 col-sm-6">
          <q-input
            v-model="userModel.userName"
            readonly
            square
            outlined
            class="q-mx-md q-my-sm"
            :label="translationContent.WGO_USERS_COLUMN_USERNAME_LABEL"
            dense
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            readonly
            v-model="userModel.email"
            square
            outlined
            class="q-mx-md q-my-sm"
            :label="translationContent.WGO_USERS_COLUMN_EMAIL_LABEL"
            dense
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            readonly
            v-model="userModel.name"
            square
            outlined
            class="q-mx-md q-my-sm"
            :label="translationContent.WGO_USERS_COLUMN_NAME_LABEL"
            dense
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            readonly
            v-model="userModel.lastName"
            square
            outlined
            class="q-mx-md q-my-sm"
            :label="translationContent.WGO_USERS_COLUMN_LASTNAME_LABEL"
            dense
          />
        </div>
        <div class="col-12 col-sm-6 q-px-sm">
          <q-select
            readonly
            v-model="userModel.roles"
            multiple
            option-value="id"
            option-label="name"
            :label="translationContent.WGO_USERS_COLUMN_ROLES_LABEL"
            class="q-mx-md q-my-sm"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-toggle
            disable
            v-model="userModel.isEmailConfirmed"
            :label="translationContent.WGO_USERS_COLUMN_ISEMAILCONFIRMED_LABEL"
            class="q-mx-md q-my-sm"
          />
        </div>
      </div>
    </template>
    <template slot="buttons">
      <slot></slot>
    </template>
  </Expanded>
</template>

<script lang="ts">
import { languageGetters, languageNamespace } from '../../store/Language';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { UsersModel } from '../../models';
import Expanded from '../Expanded/Expanded.vue';

@Component({ components: { Expanded } })
export default class UserExpanded extends Vue {
  @Prop() userModel!: UsersModel;

  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };

  labels = [this.userModel.userName, this.userModel.email, this.getRoles()];

  getRoles() {
    return this.userModel.roles.map(item => item.name).join(', ');
  }
}
</script>
