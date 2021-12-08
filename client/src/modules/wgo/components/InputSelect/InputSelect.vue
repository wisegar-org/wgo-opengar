<template>
  <q-select
    full
    v-model="selected"
    :options="optionsSelect"
    :label="label || ''"
    outlined
    stack-label
    hide-bottom-space
    options-dense
    :dense="options.small"
    :readonly="options.readonly"
  >
    <template v-slot:append>
      <q-icon
        :disabled="!selected"
        name="close"
        @click="onClear"
        class="cursor-pointer"
        :style="options.clearable ? '' : 'display:none'"
      />
    </template>
  </q-select>
</template>

<script lang="ts" src="./InputSelect.ts" />
