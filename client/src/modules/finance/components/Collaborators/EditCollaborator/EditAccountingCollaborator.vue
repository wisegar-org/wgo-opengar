<template>
  <div>
    <q-input
      v-if="collaborator && collaborator.isCollaborator"
      square
      outlined
      class="q-mx-md q-mb-lg q-mt-md"
      v-model="editProps.login"
      :autofocus="true"
      label="User name"
      dense
      readonly
    />
    <q-input
      square
      outlined
      :class="
        collaborator && collaborator.isCollaborator
          ? 'q-mx-md q-my-lg'
          : 'q-mx-md q-mb-lg q-mt-md'
      "
      v-model="editProps.name"
      :autofocus="true"
      label="Name"
      dense
    />
    <q-input
      v-if="!collaborator || !collaborator.isCollaborator"
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="editProps.description"
      autogrow
      :autofocus="true"
      label="Description"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="editProps.email"
      label="Email"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="editProps.address"
      label="Address"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      type="number"
      v-model="editProps.cap"
      label="CAP"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="editProps.place"
      label="Place"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="editProps.card_number"
      mask="#### - #### - #### - ####"
      dense
      label="Card number"
      :readonly="!loggedUser.isSuperAdmin"
    />
    <q-input
      v-if="collaborator && collaborator.isCollaborator"
      square
      outlined
      class="q-mx-md q-my-lg"
      type="number"
      v-model="editProps.pay_by_hours"
      dense
      label="Pay by hours"
      :readonly="!loggedUser.isSuperAdmin"
    />
    <!-- <q-input
      v-if="collaborator && collaborator.isCollaborator"
      square
      outlined
      class="q-mx-md q-my-lg"
      type="number"
      v-model="editProps.pay_to_internet"
      dense
      label="Pay to internet"
      :readonly="!loggedUser.isSuperAdmin"
    /> -->
    <q-card-section class="row items-center justify-center text-primary">
      <q-btn
        unelevated
        @click="() => updateProps()"
        color="primary"
        align="center"
        :disable="!isValid()"
        class="col-12 col-sm-auto"
        label="Update"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { CollaboratorRecord } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { githubActions, githubNamespace } from '../../../store';
import { ApiSettings } from '../../../settings/ApiSettings';
import { INotify, UserLogged } from '../../../../wgo/models';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';

@Component({})
export default class EditAccountingCollaborator extends Vue {
  @Prop() collaborator!: CollaboratorRecord;
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Action(githubActions.updateCollAccountingProps, {
    namespace: githubNamespace
  })
  updateProperties!: (item: CollaboratorRecord) => Promise<boolean>;
  @Action(githubActions.addClientProvider, {
    namespace: githubNamespace
  })
  createClientProvider!: (item: CollaboratorRecord) => Promise<boolean>;
  @Action(ApiSettings.USER_LOGGED_ACTION, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  loadLoggedUser!: () => Promise<void>;
  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  loggedUser!: UserLogged;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  editProps: {
    name: string;
    login: string;
    card_number: string;
    pay_by_hours: string;
    // pay_to_internet: string;
    email: string;
    address: string;
    cap: string;
    place: string;
    description: string;
  };

  constructor() {
    super();
    this.editProps = this.collaborator
      ? {
          name: `${this.collaborator.name || this.collaborator.login}`,
          login: `${this.collaborator.login}`,
          card_number: `${this.collaborator.card_number || ''}`,
          pay_by_hours: `${this.collaborator.pay_by_hours || ''}`,
          // pay_to_internet: `${this.collaborator.pay_to_internet || ''}`,
          email: `${this.collaborator.email || ''}`,
          address: `${this.collaborator.address || ''}`,
          cap: `${this.collaborator.cap || ''}`,
          place: `${this.collaborator.place || ''}`,
          description: `${this.collaborator.bio || ''}`
        }
      : {
          name: '',
          login: '',
          card_number: '',
          email: '',
          address: '',
          pay_by_hours: '',
          cap: '',
          place: '',
          // pay_to_internet: '',
          description: ''
        };
  }

  isValid() {
    return (
      !!this.editProps.name &&
      (this.loggedUser.isSuperAdmin ||
        (!!this.editProps.card_number &&
          !!this.editProps.pay_by_hours &&
          !!this.editProps.email &&
          !!this.editProps.cap &&
          !!this.editProps.place &&
          !!this.editProps.address))
    );
  }

  async updateProps() {
    this.showLoading(true);
    const result = this.collaborator
      ? await this.updateProperties(<CollaboratorRecord>{
          id: this.collaborator.id,
          name: this.editProps.name,
          card_number: this.editProps.card_number,
          pay_by_hours: parseFloat(this.editProps.pay_by_hours),
          // pay_to_internet: parseFloat(this.editProps.pay_to_internet),
          email: this.editProps.email,
          bio: this.editProps.description,
          address: this.editProps.address,
          cap: this.editProps.cap,
          place: this.editProps.place
        })
      : this.createClientProvider(<CollaboratorRecord>{
          name: this.editProps.name,
          login: this.editProps.name,
          bio: this.editProps.description,
          email: this.editProps.email,
          card_number: this.editProps.card_number,
          address: this.editProps.address,
          cap: this.editProps.cap,
          place: this.editProps.place
        });

    if (result) {
      this.notify({
        message: `Collaborator ${
          this.collaborator ? 'updated' : 'created'
        } successfully`,
        type: 'positive'
      });
      if (
        this.collaborator &&
        this.loggedUser.userName === this.collaborator.login
      ) {
        await this.loadLoggedUser();
      }
      this.close();
    }
    this.showLoading(false);
  }
}
</script>
