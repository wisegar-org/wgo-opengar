<template>
  <div class="row">
    <q-item class="fit">
      <q-item-section top class="self-center">
        <div class="text-h6 text-left">Email Media Details: {{ emailMedia.name }}</div>
      </q-item-section>
      <q-item-section top side class="self-center">
        <q-btn class="gt-xs" color="primary" flat dense :label="'Go Back'" @click="goBack" />
      </q-item-section>
    </q-item>
    <div class="col-12">
      <q-tabs
        v-model="selectedTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab :name="emailMediaTab.name" :label="emailMediaTab.label" />
        <q-tab :name="emailTab.name" :label="emailTab.label" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="selectedTab" animated>
        <q-tab-panel :name="emailMediaTab.name">
          <div class="text-h6">{{ emailMediaTab.label }}</div>
          <EmailDetailsMediaTab :emailMedia="emailMedia" />
        </q-tab-panel>
        <q-tab-panel :name="emailTab.name">
          <div class="text-h6">{{ emailTab.label }}</div>
          <EmailDetailsEmailTab :email="email" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script lang="ts" src="./EmailDetails.ts" />
