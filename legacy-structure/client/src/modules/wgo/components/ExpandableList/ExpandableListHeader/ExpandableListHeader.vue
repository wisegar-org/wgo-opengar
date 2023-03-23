<template>
  <q-card-section class="q-py-sm">
    <div class="row items-center justify-between q-table">
      <div class="col-12 no-wrap">
        <div class="text-h6 q-mr-md ellipsis">
          {{ title }}
        </div>
      </div>
    </div>
    <div class="flex row justify-between">
      <div class="flex row q-pt-sm">
        <slot name="addButton">
          <q-btn
            v-if="options.showAddBotton"
            unelevated
            size="sm"
            class="q-mr-md"
            color="primary"
            icon="add"
            :label="options.labelShowAddBotton"
            @click="itemForm => addItem(itemForm, closeDialog)"
          />
        </slot>
      </div>
      <div class="flex">
        <slot name="headerButtons"> </slot>
        <template v-for="(btn, index) in options.headerButtons || []">
          <q-btn
            :key="`${id_button}-index-${index}`"
            flat
            dense
            color="primary"
            @click="btn.click"
            :icon="btn.icon"
          >
            <q-tooltip v-if="!!btn.tooltip">{{ btn.tooltip }}</q-tooltip>
          </q-btn>
        </template>
        <ExpandableListFilterButton
          v-if="!options.disableFilters"
          :filter="filter"
          :propsEditor="propsEditor"
          :applyFilter="applyFilter"
          ref="filter"
        />
        <ExpandableListExportClipboardButton
          v-if="!options.disableExportClipboard"
          :items="items"
          :propsEditor="propsEditor"
        />
        <ExpandableListExportExcelButton
          v-if="!options.disableExportExcel"
          :items="items"
          :propsEditor="propsEditor"
        />
        <ExpandableListExportCSVButton
          v-if="!options.disableExportCSV"
          :items="items"
          :propsEditor="propsEditor"
        />
        <ExpandableListSelectColumnsButtton
          v-if="!options.disableSelectColumns"
          :propsEditor="propsEditor"
        />
        <q-btn
          v-if="!options.disableFullscreen"
          flat
          dense
          color="primary"
          @click="toggleFullScreen"
          :icon="
            $q && $q.fullscreen && $q.fullscreen.isActive
              ? 'fullscreen_exit'
              : 'fullscreen'
          "
          ><q-tooltip>Visualizza tabella a schermo intero</q-tooltip></q-btn
        >
      </div>
    </div>
  </q-card-section>
</template>

<script lang="ts" src="./ExpandableListHeader.ts" />
