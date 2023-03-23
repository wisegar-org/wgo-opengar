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
        <wgo-exp-list-filter-lab
          :filterStr="filterStr"
          :cleanFilter="() => applyFilter(emptyFilter)"
          :openFilter="() => (showFilter = true)"
        />
      </template>
    </CollaboratorList>
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
