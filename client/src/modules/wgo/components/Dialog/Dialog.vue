<template>
  <q-dialog
    v-model="showModal"
    persistent
    :full-height="fullHeight"
    :full-width="fullWidth"
  >
    <q-card :style="styleDialog"
      ><q-toolbar class="bg-primary text-white">
        <q-avatar v-if="getIcon()" :icon="getIcon()" />
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn
          unelevated
          icon="close"
          flat
          round
          dense
          @click="close"
          v-close-popup
        />
      </q-toolbar>
      <q-card-section class="scroll q-pa-none">
        <div ref="placeholder" style="height: 1px "></div>
        <q-scroll-area
          :style="`max-height: 70vh; height: ${contentHeight}`"
          ref="placeholder2"
        >
          <slot name="content" ref="slot"></slot>
        </q-scroll-area>
      </q-card-section>
      <q-card-section class="">
        <div class="flex justify-around row">
          <slot name="buttons"></slot>
        </div>
      </q-card-section>
      <Loader :loading="loading" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" src="./Dialog.ts" />
