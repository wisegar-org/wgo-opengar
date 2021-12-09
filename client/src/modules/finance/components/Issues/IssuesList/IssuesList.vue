<template>
  <ExpandableList
    :items="pageIssues"
    icon="bug_report"
    title="Issues"
    :loading="loading || innerLoading"
    :propsEditor="columns"
    :maxLabels="6"
    :options="options"
  >
    <template slot="addButton">
      <slot name="addButton"> </slot>
    </template>
    <template slot="headerButtons">
      <q-badge
        outline
        color="primary"
        class="q-ma-xs"
        :label="
          `${
            translationContent.WGO_FINANCE_ISSUES_COLUMN_HOURS
          }: ${getHourIssues()}`
        "
      />
    </template>
    <template slot="filterLabel">
      <slot name="filterLabel"></slot>
    </template>
    <template v-slot:details="{ item }">
      <IssueDetails :issue="item" />
    </template>
    <template slot="pagination">
      <div class="q-pa-none flex flex-center">
        <div>
          <q-select
            color="primary"
            v-model="itemsByPage"
            :options="itemByPageOptions"
            borderless
            class="q-ml-lg q-mr-lg"
          >
            <template slot="after">
              <div class="q-field">{{ itemsCount }}</div>
            </template>
          </q-select>
        </div>
        <div>
          <q-pagination
            v-if="pageIssues.length"
            v-model="currentPage"
            :max="maxPage"
            input
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
          />
        </div>
      </div>
    </template>
  </ExpandableList>
</template>

<script lang="ts" src="./IssuesList.ts" />
