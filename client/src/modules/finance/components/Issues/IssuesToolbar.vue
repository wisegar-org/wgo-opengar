<template>
  <q-toolbar>
    <q-toolbar-title>Issues</q-toolbar-title>
    <q-separator />
    <q-btn
      unelevated
      v-if="$q.screen.width < 840"
      color="primary"
      icon="more_vert"
      dense
    >
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item
            clickable
            v-close-popup
            @click="() => clickShowAccountingStepper()"
            :disable="!!disableAccounting"
          >
            <q-item-section avatar>
              <q-avatar icon="add" />
            </q-item-section>
            <q-item-section>Create Accounting</q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            @click="() => exportTableFn(columns, getExportData())"
          >
            <q-item-section avatar>
              <q-avatar icon="archive" />
            </q-item-section>
            <q-item-section>Export to csv</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="() => syncroGithubData()">
            <q-item-section avatar>
              <q-avatar icon="sync" />
            </q-item-section>
            <q-item-section>Sync Data</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <div v-else>
      <q-btn
        unelevated
        v-if="userLogged && userLogged.isSuperAdmin"
        color="primary"
        icon="add"
        label="Create Accounting"
        class="q-ml-sm"
        no-caps
        :disable="!!disableAccounting"
        @click="() => clickShowAccountingStepper()"
      />
      <q-btn
        unelevated
        color="primary"
        icon="archive"
        label="Export to csv"
        class="q-ml-sm"
        no-caps
        @click="() => exportTableFn(columns, getExportData())"
      />
      <q-btn
        unelevated
        color="primary"
        icon="sync"
        label="Sync Data"
        no-caps
        class="q-ml-sm"
        @click="() => syncroGithubData()"
      />
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ColumnTable, IssuesRecord } from '../../models/models';
import { ApiSettings } from '../../settings/ApiSettings';
import { Getter } from 'vuex-class';
import { UserLogged } from '../../../wgo/models';

@Component({})
export default class IssuesToolbar extends Vue {
  @Prop() clickShowAccountingStepper!: () => unknown;
  @Prop() exportTable!: (
    columns: ColumnTable[],
    data: IssuesRecord[]
  ) => unknown;
  @Prop() syncroGithubData!: () => unknown;
  @Prop() exportTableFn!: (
    columns: ColumnTable[],
    data: IssuesRecord[]
  ) => unknown;
  @Prop() getExportData!: () => IssuesRecord[];
  @Prop() columns!: ColumnTable[];
  @Prop({ default: true }) disableAccounting!: boolean;

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;
}
</script>
