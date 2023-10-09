<template>
  <div class="col">
    <div class="col q-py-xl">
      <div class="text-center">
        <TextVue
          text="Informazioni di contatto"
          class="text-h4 text-center"
          :largeFont="true"
        />
        <TextVue class="text-h5 q-pt-md" text="Indirizzo" />
        <TextVue
          class="text-body1 q-pt-sm"
          text="Assemblea Genitori di Vezia"
        />
        <TextVue
          class="text-body1 q-pt-sm"
          text="c/o Scuole Elementari Vezia"
        />
        <TextVue class="text-body1 q-pt-sm" text="Via S. Gottardo 30" />
        <TextVue class="text-body1 q-pt-sm" text="6943 Vezia" />
        <TextVue class="text-h5 q-pt-sm" text="Email" />
        <a href="mailto:assembleagenitorivezia@gmail.com" class="text-body1"
          >assembleagenitorivezia@gmail.com</a
        >
      </div>
    </div>
    <div class="col q-py-xl">
      <div class="q-pa-md q-gutter-sm">
        <q-banner rounded :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <div class="col-4 col-md-12 q-pa-xs text-center">
            <img src="images/qr-agv.png" style="width: 128px; height: 128px" />
          </div>
          <div class="col-8 col-md-12 q-pa-xs text-center">
            <div class="text-h6 q-pa-xs">
              Vuoi darci una mano ma non hai tempo disponibile?
            </div>
            <div class="text-body1 q-pa-xs">CH40 8080 8007 3682 5421 4</div>
            <div class="text-body1 q-pa-xs">Assemblea Genitori di Vezia</div>
          </div>
        </q-banner>
      </div>
    </div>
    <div class="col-12 q-py-xl">
      <MapComponent :tranStore="tranStore" :showLabels="false" />
    </div>
    <div>
      <TextVue text="Contattaci" class="text-h4 text-center" />
      <ContactForm @onSend="onSubmit" :showLoade="showLoader" />
    </div>
  </div>
</template>

<script lang="ts" src="./ContactComponent.ts" />
