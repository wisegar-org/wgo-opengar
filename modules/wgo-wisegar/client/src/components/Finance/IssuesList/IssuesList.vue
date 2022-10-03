<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      title="TRADUCIR"
      :data="issues"
      :schema="schema"
      :countData="issuesCount"
      :height="componentHeight"
      @getPagination="getDataByConfig"
    />
  </div>
</template>

<script lang="ts" src="./IssuesList.ts" />
