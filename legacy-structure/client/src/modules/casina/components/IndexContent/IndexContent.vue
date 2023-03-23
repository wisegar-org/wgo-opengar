<template>
  <div>
    <Loader :loading="innerLoading || loading" />
    <div v-if="!innerLoading">
      <MediaDiv :image="indexContent.image" />
      <div
        class="q-pt-xl q-pb-lg"
        v-html="translationContent.CASINA_INDEX_CONTENT_TEXT"
      />
      <div
        class="q-pt-xl q-pb-lg"
        v-html="translationContent.CASINA_INDEX_SERVICES_TEXT"
      />
      <div class="row justify-around q-py-xl">
        <template v-for="service in services">
          <div
            class="col-12 col-sm-5 col-md-4 q-pa-md"
            :key="'services' + service.id"
          >
            <SimpleCard
              :title="service.content.title"
              :description="service.content.description"
            />
          </div>
        </template>
      </div>
      <div
        class="q-pt-xl q-pb-lg"
        v-html="translationContent.CASINA_INDEX_DOCTORS_TEXT"
      />
      <div v-if="doctors.length > 1" class="row justify-around q-pt-xl q-pb-lg">
        <template v-for="doctor in doctors">
          <div
            class="col-12 col-sm-5 col-md-4 q-pa-md"
            :key="'doctors' + doctor.id"
          >
            <ProfileCard
              :image="doctor.image"
              icon="badge"
              :name="doctor.content.name"
              :description="doctor.content.description"
              :email="doctor.content.email"
            />
          </div>
        </template>
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
