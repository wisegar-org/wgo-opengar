<template>
  <q-input
    v-model.number="stringValue"
    :ref="oInputNumberRef"
    outlined
    :dense="denseOption"
    :label="label"
    inputmode="decimal"
    step="any"
    :rules="oInputNumberRules"
    lazy-rules="ondemand"
    hide-bottom-space
    :readonly="readonlyOption"
    @blur="onBlur"
    @focus="onFocus"
    @input="onInput"
    type="number"
    ><template v-slot:append>
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
<script lang="ts" src="./InputNumber.ts" />
