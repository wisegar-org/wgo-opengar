<template>
  <div class="q-pa-md">
    <Text
      class="text-center text-h1"
      text="Assemblea Genitori Vezia"
      :largeFont="true"
    />
    <Text
      class="text-h5 text-center q-pt-md"
      text="BENVENUTI NEL VOSTRO NUOVO SITO"
    />
    <Text class="text-body1 q-pt-xl" text="Cari Bambini e Cari Genitori," />
    <Text
      class="text-body1 q-pt-sm"
      text="qui troverere le informazioni sui prossimi appuntamenti,
              doposcuola ed eventi organizzati dal Comitato Genitori o dal
              nostro Comune."
    />
    <Text
      class="text-body1 q-pt-sm"
      text="Venite a dare un’occhiata... stiamo lavorando per voi!"
    />
    <div class="row justify-center q-py-lg">
      <div class="col-12">
        <BannerComponent
          :text="pollData?.textBanner?.text"
          :button="pollData?.textBanner?.clickText"
          :url="pullPath"
        />
      </div>
    </div>
    <div class="row justify-center q-py-lg">
      <div class="col-12">
        <BannerComponent
          :text="pollData?.textBannerReedme?.text"
          :button="pollData?.textBannerReedme?.clickText"
          :url="rulesPath"
        />
      </div>
    </div>
    <div class="row justify-center" v-if="!loadingEvents">
      <div v-if="!!corso" class="col-sm-8 col-md-6">
        <ItemCard
          title="Prossimo Corso"
          :item="corso"
          @onEventClick="(item) => onItemClick(item, false)"
        />
      </div>

      <div v-if="!!evento" class="col-sm-8 col-md-6">
        <ItemCard
          title="Prossimo Evento"
          :item="evento"
          @onEventClick="(item) => onItemClick(item, true)"
        />
      </div>
    </div>
    <div v-else class="row justify-center q-pt-xl q-pb-md">
      <q-spinner size="50px" color="primary" />
    </div>
  </div>
</template>

<script lang="ts" src="./HomeComponent.ts" />