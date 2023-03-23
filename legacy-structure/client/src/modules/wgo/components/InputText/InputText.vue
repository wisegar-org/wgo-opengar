<template>
  <q-input
    :ref="oInputTextRef"
    v-model="stringValue"
    autogrow
    outlined
    :dense="options.small"
    :label="label"
    type="text"
    :rules="oInputTextRules"
    lazy-rules="ondemand"
    hide-bottom-space
    :readonly="options.readonly"
    @focus="onFocus"
    @change="onChangeValue"
  >
    <template v-slot:append>
      <q-icon
        :disabled="!stringValue"
        name="close"
        @click="onClear"
        class="cursor-pointer"
        :style="clearOption ? '' : 'display:none'"
      />
    </template>
  </q-input>
</template>
<script lang="ts" src="./InputText.ts" />
