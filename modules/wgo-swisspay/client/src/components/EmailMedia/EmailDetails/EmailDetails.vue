<template>
  <div class="row">
    <q-item class="fit">
      <q-item-section top class="self-center">
        <div class="text-h6 text-left">{{ getLabel(translations.DETAILS_TITLE) }} {{ emailMedia.name }}</div>
      </q-item-section>
      <q-item-section top side class="self-center">
        <q-btn class="gt-xs" color="primary" flat dense :label="getLabel(tranBase.GO_BACK)" @click="goBack" />
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
        <q-tab :name="emailMediaTab.name" :label="getLabel(emailMediaTab.label)" />
        <q-tab :name="emailTab.name" :label="getLabel(emailTab.label)" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="selectedTab" animated>
        <q-tab-panel :name="emailMediaTab.name">
          <div class="text-h6">{{ getLabel(emailMediaTab.label) }}</div>
          <EmailDetailsMediaTab :emailMedia="emailMedia" />
        </q-tab-panel>
        <q-tab-panel :name="emailTab.name">
          <div class="text-h6">{{ getLabel(emailTab.label) }}</div>
          <EmailDetailsEmailTab :email="email" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script lang="ts" src="./EmailDetails.ts" />
