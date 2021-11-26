<template>
  <div class="q-pa-md" style="width: 100%">
    <Loader :loading="innerLoading || loading" />
    <q-card v-if="!innerLoading" flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ translationContent.WGO_LANGUAGE_TITLE }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="add"
              :label="translationContent.WGO_LANGUAGE_CREATE_LANGUAGE_LABEL"
              @click="() => showEditLanguageDialog(null)"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-none" style="width: 100%">
          <q-list v-if="languages.length">
            <template v-for="(lang, index) in languages">
              <EditLanguageExpanded
                :key="lang.code + index"
                :language="lang"
                :prop="lang.code"
                :onSuccess="onSuccessEdit"
                :showLoading="showLoading => (loading = showLoading)"
                icon="language"
                groupName="languageGrup"
              />
            </template>
          </q-list>
        </div>
      </q-card-section>
    </q-card>

    <!-- <q-table
      v-if="!innerLoading && userLogged"
      bordered
      flat
      title=""
      :data="languages"
      :columns="columns"
      row-key="nameIncome"
      :loading="loading"
      :rows-per-page-label="translationContent.WGO_RECORD_PER_PAGE_LABEL"
    >
      <template v-slot:top>
        <q-toolbar>
          <q-toolbar-title>{{
            translationContent.WGO_LANGUAGE_TITLE
          }}</q-toolbar-title>
          <q-separator />
          <q-btn
            unelevated
            color="primary"
            icon="add"
            :label="translationContent.WGO_LANGUAGE_CREATE_LANGUAGE_LABEL"
            @click="() => showEditLanguageDialog(null)"
            class="q-ml-sm"
            no-caps
          />
        </q-toolbar>
      </template>
      <template v-slot:body-cell-logoLanguage="props">
        <q-td :props="props">
          <div>
            <q-img
              v-if="props.row.logo && props.row.logo.url"
              :src="props.row.logo.url"
              width="40px"
            />
            <q-icon v-else size="30px" name="language" color="primary" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-buttonsLanguage="props">
        <q-td :props="props">
          <div>
            <q-btn
              unelevated
              color="primary"
              icon="edit"
              @click="() => showEditLanguageDialog(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table> -->
    <EditLanguageDialog
      :showModal="showEditLanguage"
      :close="() => (showEditLanguage = false)"
      :language="selectedLanguage"
    />
  </div>
</template>

<script lang="ts" src="./Language.ts" />
