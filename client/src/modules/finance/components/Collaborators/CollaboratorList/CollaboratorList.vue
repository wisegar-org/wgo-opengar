<template>
  <wgo-exp-list
    :items="pageCollaborators"
    icon="contacts"
    :title="translationContent.WGO_FINANCE_COLLABORATOR_TITLE || 'Contacts'"
    :loading="loading || innerLoading"
    :propsEditor="columns"
    :maxLabels="3"
    :options="options"
    :filterStr="filterStr"
    :watchProps="watchProps"
  >
    <template slot="addButton">
      <slot name="addButton"> </slot>
    </template>
    <template slot="filterLabel">
      <slot name="filterLabel"></slot>
    </template>
    <template v-slot:details="{ item }">
      <ViewAccountingCollaborator :collaborator="item" />
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
            v-if="pageCollaborators.length"
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
  </wgo-exp-list>
</template>

<script lang="ts" src="./CollaboratorList.ts" />
