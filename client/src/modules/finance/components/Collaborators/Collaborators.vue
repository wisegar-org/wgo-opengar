<template>
  <div class="q-pa-none" style="width: 100%">
    <CollaboratorList
      :collaborators="collaboratorFiltered"
      :columns="columns"
      :filterStr="filterStr"
      :loading="loading"
      :headerButtons="headerButtons"
      :editCollaborator="openEditor"
    >
      <template slot="addButton">
        <q-btn
          unelevated
          v-if="userLogged && userLogged.isAdmin"
          color="primary"
          icon="add"
          class="q-ml-xs"
          no-caps
          size="sm"
          :label="
            translationContent.WGO_FINANCE_COLLABORATOR_CREATE_CONTACT_BTN
          "
          @click="() => openEditor(null)"
        />
      </template>
      <template slot="filterLabel">
        <ExpandableListFilterLabel
          :filterStr="filterStr"
          :cleanFilter="() => applyFilter(emptyFilter)"
          :openFilter="() => (showFilter = true)"
        />
      </template>
    </CollaboratorList>
    <!-- <q-table
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
              v-if="userLogged && userLogged.isAdmin"
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
    </q-table> -->
    <EditAccountingCollaboratorDialog
      :close="() => (showEditor = false)"
      :showModal="showEditor"
      :collaborator="collaboratorSelected"
    />
    <CollaboratorsFilterDialog
      :showModal="showFilter"
      :close="() => (showFilter = false)"
      :filters="filters"
      :title="
        translationContent.WGO_FINANCE_COLLABORATOR_FILTER_TITLE || 'Filter'
      "
      icon="filter_alt"
      :applyFilter="applyFilter"
    ></CollaboratorsFilterDialog>
  </div>
</template>

<script lang="ts" src="./Collaborators.ts" />

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
