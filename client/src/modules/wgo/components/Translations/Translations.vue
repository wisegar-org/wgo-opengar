<template>
  <div class="q-pa-md" style="width: 100%">
    <q-card v-if="!innerLoading" flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ translationContent.WGO_TRANSLATIONS_TITLE }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <div class="col-12 col-sm-auto q-mb-sm">
              <LanguageSimpleSelect
                :fullWidth="true"
                :language="language"
                :langSelected="changeLanguage"
              />
            </div>

            <q-btn
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              unelevated
              color="primary"
              icon="download"
              :label="translationContent.WGO_TRANSLATIONS_EXPORT_BTN"
              @click="() => clickExportTranslations()"
              no-caps
            />
            <q-file
              @input="
                val => {
                  clickImportTranslations(val);
                }
              "
              accept=".csv"
              :multiple="false"
              :ref="id_input"
              style="display: none"
            />
            <q-btn
              unelevated
              color="primary"
              icon="upload"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              :label="translationContent.WGO_TRANSLATIONS_IMPORT_BTN"
              no-caps
              :for="id_input"
              @click="openLoadFile"
            />
          </div>
        </div>
        <div>
          <q-input
            flat
            dense
            v-model="search"
            lazy-rules="ondemand"
            standout="bg-primary text-white"
            :autofocus="true"
            :label="translationContent.WGO_TRANSLATIONS_SEARCH_BTN"
            @keydown.enter.prevent="loadFilter"
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
                @click="loadFilter"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <div class="q-pa-md" style="width: 100%">
          <q-list v-if="!!translations">
            <template v-for="(item, key) in translations">
              <SimpleExpanded
                :key="item.key + key"
                icon="language"
                :label="item.key"
                group="translationsExpanded"
              >
                <template slot="content">
                  <TranslationEditor :translation="item" :language="language" />
                </template>
              </SimpleExpanded>
            </template>
          </q-list>
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-if="translations.length"
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
    <Loader :loading="innerLoading || loading" />
  </div>
</template>

<script lang="ts" src="./Translations.ts" />
