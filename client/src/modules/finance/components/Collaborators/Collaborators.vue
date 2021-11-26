<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      bordered
      flat
      title=""
      :data="collaborators"
      :columns="columns"
      row-key="nameColl"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              Collaborators
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              v-if="userLogged && userLogged.isSuperAdmin"
              color="primary"
              icon="add"
              label="Create Client/Provider"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
              @click="() => openEditor(null)"
            />
          </div>
        </div>
      </template>
      <template v-slot:body-cell-buttonsColl="props">
        <q-td :props="props">
          <div>
            <q-btn unelevated color="primary" icon="more_vert" dense>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="() => openEditor(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="assignment" />
                    </q-item-section>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item
                    v-if="!!props.row.isCollaborator"
                    clickable
                    v-close-popup
                    @click="() => showStatsDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="monetization_on" />
                    </q-item-section>
                    <q-item-section>Stats</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-urlColl="props">
        <q-td :props="props">
          <div>
            <a
              v-if="!!props.row.isCollaborator"
              :href="`https://github.com/${props.row.login}`"
              target="_blank"
              >View more</a
            >
          </div>
        </q-td>
      </template>
      <template v-slot:loading>
        <Loader :loading="true" />
      </template>
    </q-table>
    <EditAccountingCollaboratorDialog
      :close="() => (showEditor = false)"
      :showModal="showEditor"
      :collaborator="collaboratorSelected"
    />
    <StatsCollaboratorDialog
      :collaborator="collaboratorSelected"
      :showModal="showStats"
      :close="() => (showStats = false)"
    />
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { Vue, Component } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import { CollaboratorRecord } from '../../models/models';
import { ColumnsCollaborators } from './ColumnsCollaborators';
import EditAccountingCollaboratorDialog from './EditCollaborator/EditAccountingCollaboratorDialog.vue';
import StatsCollaboratorDialog from './StatsCollaborator/StatsCollaboratorDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { UserLogged } from 'src/modules/wgo/models/models';

@Component({
  components: {
    EditAccountingCollaboratorDialog,
    StatsCollaboratorDialog
  }
})
export default class Collaborators extends Vue {
  @Action(githubActions.loadAllCollaborators, { namespace: githubNamespace })
  loadData!: () => Promise<void>;
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  collaborators!: CollaboratorRecord[];
  loading = false;
  columns = ColumnsCollaborators;
  collaboratorSelected: CollaboratorRecord | null = null;
  showEditor = false;
  showStats = false;

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;

  openEditor(item: CollaboratorRecord | null) {
    this.collaboratorSelected = item;
    this.showEditor = true;
  }

  showStatsDialog(item: CollaboratorRecord) {
    this.collaboratorSelected = item;
    this.showStats = true;
  }

  async mounted() {
    if (this.collaborators.length === 0) {
      this.loading = true;
      await this.loadData();
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
