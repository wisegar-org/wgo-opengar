<template>
  <div style="width: 100%">
    <q-card v-if="!innerLoading" flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ translationContent.CASINA_SERVICES_ADMIN_TITLE }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="translationContent.WGO_SAVE_BTN"
              @click="() => saveData()"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
          </div>
        </div>
        <div>
          <TranslationComponent
            :translation="transService"
            :onChange="
              (langId, value) =>
                onChangeIndexContent(traslationServiceValue, langId, value)
            "
          />
        </div>
      </q-card-section>

      <q-separator v-if="true" inset />
      <q-card-section>
        <div>
          <q-input
            flat
            dense
            v-model="search"
            lazy-rules="ondemand"
            standout="bg-primary text-white"
            :autofocus="true"
            :label="translationContent.CASINA_SERVICES_ADMIN_SEARCH_LABEL"
            @keydown.enter.prevent="searchFilter"
          >
            <template v-slot:append>
              <q-icon
                v-if="search !== ''"
                name="close"
                @click="cleanFilter"
                class="cursor-pointer"
              />
              <q-icon
                name="search"
                @click="searchFilter"
                class="cursor-pointer"
              />
            </template>
            <template v-slot:after>
              <q-btn
                unelevated
                color="primary"
                icon="add"
                :label="translationContent.WGO_ADD_BTN"
                @click="() => (showAddEditorDialog = true)"
                class="q-ml-sm"
                no-caps
              />
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-none" style="width: 100%">
          <q-list v-if="services.length">
            <template v-for="service in services">
              <ServiceEditorExpanded
                :key="service.id"
                :service="service"
                :onSuccess="onSuccess"
                icon="medical_services"
                :title="service.content.title"
                groupName="storageServices"
                :showLoading="isLoading => (loading = isLoading)"
              />
            </template>
          </q-list>
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-if="services.length"
              v-model="currentPage"
              :max="maxPage"
              input
              icon-first="skip_previous"
              icon-last="skip_next"
              icon-prev="fast_rewind"
              icon-next="fast_forward"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <ServiceEditorDialog
      :showModal="showAddEditorDialog"
      :onSuccess="onSuccess"
    />
    <Loader :loading="innerLoading || loading" />
  </div>
</template>

<script lang="ts" src="./ServicesComponent.ts" />
