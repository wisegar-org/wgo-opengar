<template>
  <div>
    <MediaDiv
      v-if="indexContent && indexContent.image"
      :image="indexContent.image"
    />
    <div
      class="q-pt-xl q-pb-lg text-h3"
      v-html="getLabel(translations.INDEX_TITLE)"
    />
    <div
      class="q-pt-xl q-pb-xl text-body1"
      v-html="getLabel(translations.INDEX_CONTENT)"
    />
    <div v-if="modules.length > 0" class="row justify-around q-pt-xl q-pb-lg">
      <div
        v-for="moduleItem in modules"
        class="col-12 col-sm-5 col-md-4 q-pa-md"
        :key="'modulesList' + moduleItem.id"
      >
        <ModuleCard
          :image="moduleItem.image"
          icon="badge"
          :name="moduleItem.content.name"
          :description="moduleItem.content.description"
          :path="moduleItem.content.path"
          :labelBtn="moduleItem.content.labelBtn"
        />
      </div>
    </div>

    <div class="col-12 q-py-xl">
      <MapComponent :tranStore="tranStore" />
    </div>
    <div class="col-12 q-py-xl">
      <ContactComponent :tranStore="tranStore" />
    </div>
  </div>
</template>

<script lang="ts" src="./IndexContent.ts" />
