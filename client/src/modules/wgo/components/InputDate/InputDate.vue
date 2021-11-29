<template>
  <div>
    <q-input
      ref="input"
      v-model="model"
      :label="label"
      fill-mask
      :outlined="outlined"
      hide-bottom-space
      :mask="inputMask"
      lazy-rules="ondemand"
      debounce
      :readonly="isReadonly"
      :dense="isSmall"
      :rules="getRules"
      @keypress.enter="onSelectionChange()"
      @input="onSelectionChange()"
      @focus="onFocus"
    >
      <template v-slot:append>
        <q-icon v-show="!isReadonly" name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="model"
              today-btn
              minimal
              first-day-of-week="1"
              :mask="qDateMask"
              :options="optionsFn"
              @input="onSelectionChange()"
            >
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts" src="./InputDate.ts"></script>
