<template>
  <div class="row display-flex justify-center">
    <div
      v-for="(item, key) in items"
      :key="key"
      class="col-12 col-sm-10 col-md-9 q-pa-none q-py-md"
    >
      <ItemComponent :item="item" :onItemClick="onItemClick" />
    </div>
  </div>
</template>

<script lang="ts" src="./ItemListComponent.ts" />
