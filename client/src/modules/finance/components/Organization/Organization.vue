<template>
  <div class="q-pa-md" style="width: 100%">
    <q-card
      v-if="userLogged && userLogged.isSuperAdmin"
      flat
      bordered
      class="my-card bg-grey-1"
    >
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">Organization</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <div class="q-pa-md" style="width: 100%">
          <q-list>
            <q-expansion-item
              popup
              default-opened
              icon="location_city"
              label="Organization config"
            >
              <q-separator />
              <q-card>
                <q-card-section class="q-pa-none">
                  <OrganizationEditor />
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              default-opened
              icon="payment"
              label="Accounting config"
            >
              <q-separator />
              <q-card>
                <q-card-section class="q-pa-none">
                  <OrganizationAccountingEditor />
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              popup
              default-opened
              icon="account_balance"
              label="Bank config"
            >
              <q-separator />
              <q-card>
                <q-card-section class="q-pa-none">
                  <OrganizationBankEditor />
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { Vue, Component } from 'vue-property-decorator';
import { githubActions, githubNamespace } from '../../store';
import OrganizationAccountingEditor from './OrganizationEditors/OrganizationAccountingEditor.vue';
import OrganizationEditor from './OrganizationEditors/OrganizationEditor.vue';
import OrganizationBankEditor from './OrganizationEditors/OrganizationBankEditor.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { UserLogged } from '../../../wgo/models';

@Component({
  components: {
    OrganizationAccountingEditor,
    OrganizationEditor,
    OrganizationBankEditor
  }
})
export default class Organization extends Vue {
  @Action(githubActions.loadOrganizationData, { namespace: githubNamespace })
  loadOrganizationData!: () => Promise<void>;

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;

  async mounted() {
    await this.loadOrganizationData();
  }
}
</script>

<style scoped>
.my-card {
  background-color: white !important;
}
</style>
