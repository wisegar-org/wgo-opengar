<template>
  <div class="fit row" style="max-width: 900px;">
    <template v-for="(prop, index) in propsEditor">
      <div
        :key="`${id_item}-index${index}`"
        :class="!!prop.class ? prop.class : 'col-12 col-md-6 q-pa-sm'"
      >
        <InputNumber
          v-if="prop.type === 'number'"
          :label="prop.label"
          v-model="filterEdit[prop.prop]"
          :options="prop.options"
          :autofocus="index === 0"
        />
        <InputDate
          v-else-if="prop.type === 'date'"
          :label="prop.label"
          v-model="filterEdit[prop.prop]"
          :options="prop.options"
          :autofocus="index === 0"
        />
        <OInputSelect
          v-else-if="prop.type === 'select'"
          :label="prop.label"
          v-model="filterEdit[prop.prop]"
          :options="prop.options"
          :optionsSelect="prop.options.options"
          :autofocus="index === 0"
        />
        <InputText
          v-else
          :label="prop.label"
          v-model="filterEdit[prop.prop]"
          :options="prop.options"
          :autofocus="index === 0"
        />
      </div>
    </template>
    <div class="flex row justify-around col-12 q-px-sm q-pt-sm">
      <q-btn
        unelevated
        color="primary"
        label="Annulla"
        icon="close"
        @click="close"
        class="col-12 col-md-3 q-mt-sm"
      />
      <q-btn
        unelevated
        color="primary"
        label="Clean"
        icon="cached"
        @click="onResetFilter"
        class="col-12 col-md-3 q-mt-sm"
      />
      <q-btn
        unelevated
        color="primary"
        label="OK"
        icon="save"
        @click="onApplyFilter"
        class="col-12 col-md-3 q-mt-sm"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./ExpandableListFilter.ts" />
