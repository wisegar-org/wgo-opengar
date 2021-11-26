<template>
  <div>
    <q-inner-loading :showing="innerLoading || loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-if="!innerLoading">
      <MediaDiv v-if="indexContent" :image="indexContent.image" />
      <div
        class="q-pt-xl q-pb-lg"
        v-html="translationContent.WGO_FINANCE_INDEX_CONTENT_TEXT"
      />
      <div
        class="q-pt-xl q-pb-lg"
        v-html="translationContent.FINANCE_INDEX_MODULE_TEXT"
      />
      <div v-if="modulesList.length > 1" class="row justify-around q-pt-xl q-pb-lg">
        <template v-for="moduleItem in modulesList">
          <div
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
        </template>
      </div>
      <div v-else-if="modulesList.length === 1" class="q-pa-md">
        <ModuleCard
          :image="modulesList[0].image"
          icon="badge"
          :name="modulesList[0].content.name"
          :description="modulesList[0].content.description"
          :path="modulesList[0].content.path"
          :labelBtn="modulesList[0].content.labelBtn"
        />
      </div>
      <MapComponent 
        :contentMapPhoneNumberLabel="this.contentMapPhoneNumberLabel"
        :contentMapEmailLabel="this.contentMapEmailLabel"
        :mapTitleSection="this.mapTitleSection"
        :WGOModule="this.moduleName"
      />
      <ContactComponent 
        :TranslationsKeys="this.ContactTranslationsKeys"
        :contactTitle="this.contactTitle"
        :contactBody="this.contactBody"
        :nameFieldLabel="this.nameFieldLabel"
        :nameFieldPlaceholder="this.nameFieldPlaceholder"
        :emailFieldLabel="this.emailFieldLabel"
        :emailFieldPlaceholder="this.emailFieldPlaceholder"
        :msgFieldLabel="this.msgFieldLabel"
        :msgFieldPlaceholder="this.msgFieldPlaceholder"
        :btnSendLabel="this.btnSendLabel"
        :subjectEmail="this.subjectEmail"
        :successEmailSend="this.successEmailSend"
        :failEmailSend="this.failEmailSend"
        :nameFieldRequiered="this.nameFieldRequiered"
        :emailFieldRequiered="this.emailFieldRequiered"
        :msgFieldRequiered="this.msgFieldRequiered"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./IndexContent.ts" />
