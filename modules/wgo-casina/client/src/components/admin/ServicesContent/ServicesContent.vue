<template>
  <div style="width: 100%">
    <q-card v-if="!innerLoading" flat class="fit">
      <q-card-section class="q-py-md">
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis text-h6">
              {{ getLabel(translations.CASINA_SERVICES_TITLE) }}
            </div>
          </div>
          <div class="flex justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="getLabel(transBase.SAVE)"
              @click="() => saveData()"
              class="col-12 col-sm-auto"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <TranslationComponent
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="transContent"
          @onChange="onChangeServicesContent"
        />
      </q-card-section>
      <q-card-section class="q-py-none">
        <q-separator />
      </q-card-section>
      <q-card-section>
        <Table
          :title="translations.CASINA_SERVICES_TABLE_TITLE"
          :data="services"
          :schema="schema"
          :height="componentHeight"
          :countData="countData"
          @getPagination="getDataByConfig"
        >
          <template v-slot:subtitle>
            <div class="fit">
              <q-input
                flat
                dense
                v-model="search"
                lazy-rules="ondemand"
                standout="bg-primary text-white"
                :autofocus="true"
                :label="getLabel(transBase.SEARCH)"
                @keydown.enter.prevent="searchFilter"
              >
                <template v-slot:append>
                  <q-icon v-if="search !== ''" name="close" @click="cleanFilter" class="cursor-pointer" />
                  <q-icon name="search" @click="searchFilter" class="cursor-pointer" />
                </template>
                <template v-slot:after>
                  <q-btn
                    unelevated
                    color="primary"
                    icon="add"
                    :label="getLabel(transBase.ADD)"
                    @click="() => (showAddEditorDialog = true)"
                    class="q-ml-sm"
                    no-caps
                  />
                </template>
              </q-input>
            </div>
          </template>
        </Table>
      </q-card-section>
    </q-card>
    <Loader :loading="innerLoading || loading" />
    <ServiceContentDialog
      :open="showAddEditorDialog"
      :langStore="langStore"
      :tranStore="tranStore"
      :service="serviceSelected"
      @close="closeDialog"
      @success="loadServicesContent"
    />
  </div>
</template>

<script lang="ts" src="./ServicesContent.ts" />
