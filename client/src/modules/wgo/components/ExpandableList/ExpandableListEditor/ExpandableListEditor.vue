<template>
  <q-form @submit="onSave" class="row q-pa-sm" ref="oAdminEditor">
    <template v-for="(prop, index) in propsEditor">
      <div :key="`${id_item}-index${index}`" class="col-12 col-md-6 q-pa-sm">
        <InputNumber
          v-if="prop.type === 'number'"
          :label="prop.label"
          v-model="itemForm[prop.prop]"
          :options="prop.options"
          :autofocus="index === 0"
        />
        <InputDate
          v-else-if="prop.type === 'date'"
          :label="prop.label"
          :date="getDateValue(itemForm[prop.prop])"
          :options="getDateOptions(prop.options, itemForm, prop.prop)"
          :autofocus="index === 0"
        />
        <InputText
          v-else
          :label="prop.label"
          v-model="itemForm[prop.prop]"
          :options="prop.options"
          :autofocus="index === 0"
        />
      </div>
    </template>
    <div
      :class="
        showClose
          ? 'flex row col-12 q-px-sm q-pt-sm justify-around'
          : 'flex row col-12 q-px-sm q-pt-sm justify-end'
      "
    >
      <q-btn
        v-if="showClose"
        unelevated
        color="primary"
        label="Close"
        icon="close"
        @click="close"
        class="col-12 col-md-3 q-mt-sm"
      />
      <q-btn
        unelevated
        color="primary"
        label="OK"
        icon="save"
        type="submit"
        :class="showClose ? 'col-12 col-md-3 q-mt-sm' : 'col-auto'"
      />
    </div>
  </q-form>
</template>

<script lang="ts" src="./ExpandableListEditor.ts" />
