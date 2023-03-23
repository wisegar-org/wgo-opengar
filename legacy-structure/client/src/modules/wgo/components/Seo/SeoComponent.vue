<template>
  <div style="width: 100%">
    <q-card v-if="!innerLoading" flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ translationContent.WGO_SEO_TITLE }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="translationContent.WGO_SAVE_BTN"
              @click="() => clickSaveSeoData()"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="flex justify-center q-pb-md">
          <UploadFavIconDiv
            :img="imgFavIcon"
            :onSavedImg="setFaviconImage"
            :showLoading="showLoading"
          />
        </div>
        <q-separator v-if="metaProps.length > 0" inset class="q-mt-md" />
      </q-card-section>
      <q-card-section>
        <div>
          <q-input
            flat
            dense
            clearable
            v-model="search"
            lazy-rules="ondemand"
            standout="bg-primary text-white"
            :autofocus="true"
            :label="translationContent.WGO_SEO_SEARCH_BTN"
          />
        </div>
      </q-card-section>
      <q-card-section v-if="metaProps.length > 0">
        <div class="q-pa-none" style="width: 100%">
          <q-list v-if="metaProps.length">
            <template v-for="(prop, index) in metaProps">
              <SeoExpandedEditor
                v-if="!search || prop.indexOf(search) !== -1"
                :key="prop + index"
                :meta="metaData[prop]"
                :prop="prop"
                :onChange="value => (metaData[prop].content = value)"
                icon="code"
                groupName="seoColumn"
              />
            </template>
          </q-list>
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-if="metaProps.length"
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

      <q-separator v-if="metaProps.length > 0" inset />
      <q-card-section>
        <q-input
          outlined
          standout="bg-primary text-white"
          v-model="path"
          :label="translationContent.WGO_SEO_META_INDEX_PATH_LABEL"
        />
      </q-card-section>
    </q-card>

    <Loader :loading="innerLoading || loading" />
  </div>
</template>

<script lang="ts" src="./SeoComponent.ts" />
