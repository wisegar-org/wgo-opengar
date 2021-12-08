<template>
  <Dialog
    :title="title"
    :icon="icon"
    :open="open"
    :close="close"
    :styleDialog="styleDialog"
    style="z-index: 9999;"
  >
    <template slot="content">
      <div class="col-12">
        <ExpandableListEditor
          :propsEditor="propsEditor"
          :item="item"
          :onSaveItem="onSaveItem"
          :showClose="true"
          :close="close"
        />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" src="./ExpandableListEditorDialog.ts" />
