<template>
  <Dialog
    :title="title"
    :icon="icon"
    :open="open"
    :close="close"
    style="z-index: 9999;"
  >
    <template slot="content">
      <div class="col-12">
        <ExpandableListFilter
          :propsEditor="propsEditor"
          :applyFilter="applyFilter"
          :filter="filter"
          :close="close"
        />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" src="./ExpandableListFilterDialog.ts" />
