<template>
  <div>
    <Loader :loading="innerLoading || loading" />
    <div v-if="!innerLoading">
      <MediaDiv class="q-pb-xl" :image="indexContent.image" />
      <div class="q-pt-xl q-pb-lg text-h3" v-html="getLabel(translations.CASINA_INDEX_CONTENT_TEXT_TITLE)" />
      <div class="q-pt-xl q-pb-xl text-body1" v-html="getLabel(translations.CASINA_INDEX_CONTENT_TEXT)" />
      <div
        v-if="services.length > 0"
        class="q-pt-xl q-pb-xl text-h4"
        v-html="getLabel(translations.CASINA_INDEX_SERVICES_TEXT)"
      />
      <div v-if="services.length > 0" class="row justify-around q-py-xl">
        <div v-for="service in services" class="col-12 col-sm-5 col-md-4 q-pa-md" :key="'services' + service.id">
          <SimpleCard :title="service.content.title" :description="service.content.description" />
        </div>
      </div>
      <div
        v-if="doctors.length > 1"
        class="q-pt-xl q-pb-xl text-h4"
        v-html="getLabel(translations.CASINA_INDEX_DOCTORS_TEXT)"
      />
      <div v-if="doctors.length > 1" class="row justify-around q-pt-xl q-pb-xl">
        <div v-for="doctor in doctors" class="col-12 col-sm-5 col-md-4 q-pa-md" :key="'doctors' + doctor.id">
          <ProfileCard
            :image="doctor.image"
            icon="badge"
            :name="doctor.content.name"
            :description="doctor.content.description"
            :email="doctor.content.email"
          />
        </div>
      </div>
      <div v-else-if="doctors.length === 1" class="q-pa-md">
        <HorizontalProfileCard
          :image="doctors[0].image"
          icon="badge"
          :name="doctors[0].content.name"
          :description="doctors[0].content.description"
          :email="doctors[0].content.email"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./IndexContent.ts" />
