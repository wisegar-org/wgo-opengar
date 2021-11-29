<template>
  <q-card-section v-if="getFilterLabel()" class="q-py-none">
    <q-btn-group unelevated class="row fit">
      <q-btn
        class="col fit"
        align="left"
        unelevated
        flat
        color="primary"
        @click="() => openFilter()"
        no-caps
      >
        {{ getFilterLabel() }}
      </q-btn>
      <q-btn
        flat
        class="col-auto"
        unelevated
        icon="cached"
        color="primary"
        @click="() => cleanFilter()"
      />
    </q-btn-group>
  </q-card-section>
</template>

<script lang="ts" src="./ExpandableListFilterLabel.ts" />
