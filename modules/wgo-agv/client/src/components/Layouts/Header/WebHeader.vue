<template>
  <q-toolbar>
    <q-avatar @click="goToHome" class="cursor-pointer">
      <img src="icons/favicon.png" alt="favicon" />
    </q-avatar>
    <q-toolbar-title>
      <div class="cursor-pointer" @click="goToHome" style="width: fit-content">
        {{ getLabel(title) }}
      </div>
    </q-toolbar-title>
    <q-tabs shrink>
      <q-route-tab
        v-for="(path, key) in menuList"
        :key="'webMenu-' + key"
        :name="path.name"
        :label="getLabel(path.label)"
        class="q-px-md"
        :to="path.path"
      />
      <q-btn
        v-if="isUserAdmin()"
        flat
        stretch
        :label="getLabel(transBase.APP_ADMIN_TITLE)"
        @click="openNewTab"
      />
    </q-tabs>

    <!-- <q-btn
        unelevated
        v-for="(path, key) in menuList"
        :key="'webMenu-' + key"
        flat
        class="q-px-md"
        :to="path.url"
        >{{ path.name }}</q-btn
      > -->
  </q-toolbar>
</template>

<script lang="ts" src="./WebHeader.ts" />
