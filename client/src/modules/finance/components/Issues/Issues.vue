<template>
  <div class="q-pa-none" style="width: 100%">
    <IssuesList
      :issues="filteredIssues"
      :filterStr="filterStr"
      :columns="columns"
      :loading="loading"
      :openFilterDialog="openFilterDialog"
      :headerButtons="headerButtons"
    >
      <template slot="addButton">
        <q-btn
          unelevated
          v-if="userLogged && userLogged.isSuperAdmin"
          color="primary"
          icon="add"
          label="Create Accounting"
          class="q-ml-xs"
          no-caps
          size="sm"
          :disable="!!filters && (!filters.minDate || !filters.maxDate)"
          @click="() => (showAccountingStepper = true)"
        />
      </template>
      <template slot="filterLabel">
        <ExpandableListFilterLabel
          :filterStr="filterStr"
          :cleanFilter="() => applyFilter(emptyFilter)"
          :openFilter="() => (showFilter = true)"
        />
      </template>
    </IssuesList>
    <IssuesFilter
      :open="showFilter"
      :close="() => (showFilter = false)"
      :filters="filters"
      :title="translationContent.WGO_FINANCE_ISSUES_FILTER_TITLE"
      icon="filter_alt"
      :applyFilter="applyFilter"
    />
    <AccountingStepperDialog
      :showModal="showAccountingStepper"
      :close="() => (showAccountingStepper = false)"
      :filterIssues="filteredIssues"
      :collaborator="filters.assignedTo"
      :organizationData="organizationData"
      :initDate="filters.minDate"
      :endDate="filters.maxDate"
    />
  </div>
</template>

<script lang="ts" src="./Issues.ts" />

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
