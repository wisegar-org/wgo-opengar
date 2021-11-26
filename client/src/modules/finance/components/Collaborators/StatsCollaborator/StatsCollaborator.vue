<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      bordered
      flat
      title=""
      :data="filterStats"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <q-toolbar>
          <q-toolbar-title>{{ collaborator.name }}</q-toolbar-title>
          <q-separator />
          <q-input
            outlined
            readonly
            dense
            flat
            :value="average"
            type="number"
            prefix="Average: "
          />
        </q-toolbar>
        <div class="row q-col-gutter-none justify-end" style="width: 100%">
          <div class="col-12 col-md-4">
            <q-input
              clearable
              dense
              outlined
              v-model="minDateFilter"
              mask="date"
              label="Start date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="minDateFilter">
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-4">
            <q-input
              clearable
              dense
              outlined
              v-model="maxDateFilter"
              mask="date"
              label="End date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="maxDateFilter">
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template v-slot:loading>
        <Loader :loading="true" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { CollaboratorRecord, WeeklyStats } from '../../../models/models';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { StatsCollaboratorColumns } from '../ColumnsCollaborators';
import { Action } from 'vuex-class';
import { githubActions, githubNamespace } from '../../../store';

@Component({})
export default class StatsCollaborator extends Vue {
  @Action(githubActions.loadCollaboratorStats, { namespace: githubNamespace })
  loadStats!: (idCollaborator: number) => Promise<WeeklyStats[]>;
  @Prop() collaborator!: CollaboratorRecord;
  @Prop() showLoading!: (value: boolean) => unknown;
  columns = StatsCollaboratorColumns;
  filterStats: WeeklyStats[] = [];
  stats: WeeklyStats[] = [];
  average = 0;
  minDateFilter = '';
  maxDateFilter = '';

  getAverage() {
    const average =
      this.filterStats.length > 0
        ? this.filterStats
            .map(week => {
              return week.average;
            })
            .reduce((a, b) => a + b, 0) / this.filterStats.length
        : 0;

    return Math.round(average * 10) / 10;
  }

  @Watch('collaborator')
  @Watch('minDateFilter')
  @Watch('maxDateFilter')
  async updateStats() {
    if (this.stats.length === 0) {
      this.stats = await this.loadStats(this.collaborator.id);
    }
    this.filterStats = this.getFilterStats();
    this.average = this.getAverage();
  }

  getFilterStats() {
    const minDate = this.minDateFilter
      ? new Date(this.minDateFilter)
      : undefined;
    const maxDate = this.maxDateFilter
      ? new Date(this.maxDateFilter)
      : undefined;
    if (minDate) {
      minDate.setHours(0, 0, 0, 0);
      minDate.setDate(minDate.getDate() - minDate.getDay());
    }
    if (maxDate) {
      maxDate.setHours(0, 0, 0, 0);
      maxDate.setDate(maxDate.getDate() - maxDate.getDay() + 7);
    }
    return this.stats.filter(stat => {
      if (!minDate && !maxDate) return true;
      const date = new Date(stat.weekly);
      if (minDate && date.getTime() - minDate.getTime() < 0) {
        return false;
      }
      if (maxDate && maxDate.getTime() - date.getTime() < 0) {
        return false;
      }
      return true;
    });
  }

  async mounted() {
    this.showLoading(true);
    await this.updateStats();
    this.showLoading(false);
  }
}
</script>

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
