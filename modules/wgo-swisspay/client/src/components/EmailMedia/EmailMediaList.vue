<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table title="Email media" :data="data" :schema="schema" :height="componentHeight" />
    <EmailDetailsDialog :open="open" @close="closeDetails" :email="emailDetails" />
  </div>
</template>

<script lang="ts" src="./EmailMediaList.ts" />
