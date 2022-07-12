<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table title="Employees" :data="data" :schema="schema" :height="componentHeight" />
  </div>
</template>

<script lang="ts" src="./EmployeesList.ts" />
