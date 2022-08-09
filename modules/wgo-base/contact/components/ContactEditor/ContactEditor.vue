<template>
  <div style="width: 100%">
    <q-card v-if="!loading" flat>
      <q-card-section class="q-py-md">
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis text-h6">
              {{ getLabel(translations.CONTACT_ADM_TITLE) }}
            </div>
          </div>
          <div class="flex justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="getLabel(tranBase.SAVE)"
              @click="() => clickSaveContactData()"
              class="col-12 col-sm-auto"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <TranslationComponent
          :label="getLabel(translations.CONTACT_ADM_MAP_TITLE_FL)"
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="objMapTitle"
          class="q-px-sm"
          @onChange="
            (langId, value) =>
              onChangeIndexContent(translationsMapTitle, langId, value)
          "
        />

        <TranslationComponent
          :label="getLabel(translations.CONTACT_ADM_CONTACT_TITLE_FL)"
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="objContactTitle"
          class="q-px-sm"
          @onChange="
            (langId, value) =>
              onChangeIndexContent(translationsContactTitle, langId, value)
          "
        />
        <TranslationComponent
          :label="getLabel(translations.CONTACT_ADM_CONTACT_CONTENT_FL)"
          :langStore="langStore"
          :tranStore="tranStore"
          :translation="objContactContent"
          class="q-px-sm"
          @onChange="
            (langId, value) =>
              onChangeIndexContent(translationsContactContent, langId, value)
          "
        />

        <div class="row">
          <div class="col-12 col-md-6 q-pa-sm">
            <q-input
              dense
              outlined
              square
              standout="bg-primary text-white"
              :label="getLabel(translations.CONTACT_ADM_CONTACT_NAME_FL)"
              v-model="contact.contactName"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <q-input
              dense
              outlined
              square
              standout="bg-primary text-white"
              :label="getLabel(translations.CONTACT_ADM_CONTACT_ADDRESS_FL)"
              v-model="contact.address"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <q-input
              dense
              outlined
              square
              standout="bg-primary text-white"
              :label="getLabel(translations.CONTACT_ADM_CONTACT_PHONE_FL)"
              v-model="contact.phoneNumber"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-sm">
            <q-input
              dense
              outlined
              square
              standout="bg-primary text-white"
              :label="getLabel(translations.CONTACT_ADM_CONTACT_EMAIL_FL)"
              v-model="contact.email"
            />
          </div>
        </div>

        <q-input
          dense
          outlined
          square
          standout="bg-primary text-white"
          class="q-pa-sm"
          :label="getLabel(translations.CONTACT_ADM_CONTACT_MAP_FL)"
          v-model="contact.mapPath"
          type="textarea"
        />
        <div v-if="contact.mapPath" class="text-h6">
          {{ getLabel(translations.CONTACT_ADM_CONTACT_PREVIEW_FL) }}
        </div>
        <iframe
          v-if="contact.mapPath"
          style="border: 0"
          tabindex="0"
          :src="contact.mapPath"
          width="250px"
          height="250px"
          frameborder="0"
          allowfullscreen="allowfullscreen"
          aria-hidden="false"
        />
      </q-card-section>
    </q-card>

    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { TranslationStore } from "../../../translation/models/TranslationStore";
import TranslationComponent from "../../../translation/components/TranslationComponent/TranslationComponent.vue";
import Loader from "../../../core/components/Loader/Loader.vue";
import { NumberDictionary } from "../../../core/models";
import { TranslationResponse } from "../../../translation/resolvers/TranslationResponses";
import { BaseTranslateComponent } from "../../../core/components/BaseComponents";
import { translations } from "../../models/translations";
import { translations as tranBase } from "../../../core/models";
import { ContactService } from "../../services/ContactService";
import { IContactModel } from "../../models";
import { LanguageStore } from "../../../language/models/LanguageStore";
import { ContactMeInput } from "../../resolvers/ContactMeInputs";
import { TranslationInput } from "../../../translation/resolvers/TranslationInputs";

export default defineComponent({
  name: "ContactEditor",
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
  },
  components: {
    TranslationComponent,
    Loader,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const contact: IContactModel = {
      address: "",
      contactName: "",
      email: "",
      mapPath: "",
      phoneNumber: "",
    } as IContactModel;
    const contactService = new ContactService();

    const objMapTitle: TranslationResponse = <TranslationResponse>{
      key: translations.MAP_TITLE,
      id: translations.MAP_TITLE,
      value: getLabel(this.tranStore, translations.MAP_TITLE),
    };

    const objContactTitle: TranslationResponse = <TranslationResponse>{
      key: translations.CONTACT_TITLE,
      id: translations.CONTACT_TITLE,
      value: getLabel(this.tranStore, translations.CONTACT_TITLE),
    };

    const objContactContent: TranslationResponse = <TranslationResponse>{
      key: translations.CONTACT_BODY,
      id: translations.CONTACT_BODY,
      value: getLabel(this.tranStore, translations.CONTACT_BODY),
    };

    const translationsMapTitle: NumberDictionary = {};
    const translationsContactTitle: NumberDictionary = {};
    const translationsContactContent: NumberDictionary = {};

    return {
      contact,
      loading: false,
      tranBase,
      translations,
      objMapTitle,
      objContactTitle,
      objContactContent,
      translationsContactContent,
      translationsMapTitle,
      translationsContactTitle,
      contactService,
      getLabel: (name: string) => getLabel(this.tranStore, name),
    };
  },
  methods: {
    onChangeIndexContent(
      translations: NumberDictionary,
      langId: number,
      value: string
    ) {
      translations[langId] = value;
    },
    getTranslationItem(traslationValue: NumberDictionary, key: string) {
      return Object.keys(traslationValue).map((langId) => {
        const lang = parseInt(langId);
        return {
          languageId: lang,
          key: key,
          value: traslationValue[lang],
        };
      });
    },
    async clickSaveContactData() {
      this.loading = true;

      let translationsToSet: TranslationInput[] = [];
      translationsToSet = translationsToSet.concat(
        this.getTranslationItem(
          this.translationsMapTitle,
          translations.MAP_TITLE
        ),
        this.getTranslationItem(
          this.translationsContactTitle,
          translations.CONTACT_TITLE
        ),
        this.getTranslationItem(
          this.translationsContactContent,
          translations.CONTACT_BODY
        )
      );

      const contactData = <ContactMeInput>{
        contactName: this.contact.contactName,
        address: this.contact.address,
        email: this.contact.email,
        phoneNumber: this.contact.phoneNumber,
        mapPath: this.contact.mapPath,
      };
      if (await this.contactService.setContactData(contactData)) {
        await this.tranStore.setTranslation({
          translations: translationsToSet,
        });
        this.$emit(
          "showMessage",
          true,
          this.getLabel(translations.CONTACT_ADM_SUCCESS_MSG)
        );
      } else {
        this.$emit(
          "showMessage",
          false,
          this.getLabel(translations.CONTACT_ADM_FAIL_MSG)
        );
      }
      this.loading = false;
    },
    async loadContactData() {
      const result = await this.contactService.getContactData();
      if (result) this.contact = result;
    },
  },
  async mounted() {
    await this.loadContactData();
  },
  emits: ["showMessage"],
});
</script>
