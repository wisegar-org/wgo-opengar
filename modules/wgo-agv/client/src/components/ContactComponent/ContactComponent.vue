<template>
  <div>
    <div class="text-center">
      <Text
        text="Informazioni di contatto"
        class="text-h1 q-pt-xl"
        :largeFont="true"
      />
      <Text class="text-h5 q-pt-md" text="Indirizzo" />
      <Text class="text-body1 q-pt-sm" text="Assemblea Genitori di Vezia" />
      <Text class="text-body1 q-pt-sm" text="c/o Scuole Elementari Vezia" />
      <Text class="text-body1 q-pt-sm" text="Via S. Gottardo 30" />
      <Text class="text-body1 q-pt-sm" text="6943 Vezia" />
      <Text class="text-h5 q-pt-sm" text="Email" />
      <a href="mailto:assembleagenitorivezia@gmail.com" class="text-body1"
        >assembleagenitorivezia@gmail.com</a
      >
    </div>
    <div class="col-12 q-py-xl">
      <MapComponent :tranStore="tranStore" :showLabels="false" />
    </div>
    <div>
      <Text text="Contattaci" class="text-h4 text-center" />
      <ContactForm @onSend="onSubmit" :showLoade="showLoader" />
    </div>
  </div>
</template>

<script lang="ts" src="./ContactComponent.ts" />