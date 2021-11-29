<template>
  <div style="width: 100%">
    <q-card v-if="!loading" flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              {{ getContent(contactPageTitle) }}
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              color="primary"
              icon="save"
              :label="translationContent.WGO_SAVE_BTN"
              @click="() => clickSaveContactData()"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        {{ translationContent.WGO_CASINA_CONTACT_ADMIN_PAGE_MAP_TITLE_FIELD }}
        <TranslationComponent
          :translation="objMapTitle"
          :onChange="
            (langId, value) =>
              onChangeIndexContent(translationsMapTitle, langId, value)
          "
        />

        <q-input
          dense
          outlined
          square
          standout="bg-primary text-white"
          :label="getContent(mapField)"
          v-model="mapPath"
          type="textarea"
        />
        <br />
        <div class="text-h6">{{ getContent(mapPreviewField) }}</div>
        <iframe
          style="border: 0;"
          tabindex="0"
          :src="mapPath"
          width="250px"
          height="250px"
          frameborder="0"
          allowfullscreen="allowfullscreen"
          aria-hidden="false"
        >
        </iframe>
        <br />
        <q-input
          dense
          outlined
          square
          standout="bg-primary text-white"
          :label="getContent(contactNameField)"
          v-model="contactName"
        />
        <br />
        <q-input
          dense
          outlined
          square
          standout="bg-primary text-white"
          :label="getContent(addressField)"
          v-model="address"
        />
        <br />
        <q-input
          dense
          outlined
          square
          standout="bg-primary text-white"
          :label="getContent(phoneNumberField)"
          v-model="phoneNumber"
        />
        <br />
        <q-input
          dense
          outlined
          square
          standout="bg-primary text-white"
          :label="getContent(emailField)"
          v-model="email"
        />
        <br />
        {{
          translationContent.WGO_CASINA_CONTACT_ADMIN_PAGE_CONTACT_TITLE_FIELD
        }}
        <TranslationComponent
          :translation="objContactTitle"
          :onChange="
            (langId, value) =>
              onChangeIndexContent(translationsContactTitle, langId, value)
          "
        />
        {{
          translationContent.WGO_CASINA_CONTACT_ADMIN_PAGE_CONTACT_CONTENT_FIELD
        }}
        <TranslationComponent
          :translation="objContactContent"
          :onChange="
            (langId, value) =>
              onChangeIndexContent(translationsContactContent, langId, value)
          "
        />
      </q-card-section>
    </q-card>

    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {
  contactActions,
  contactGetters,
  wgoContactNamespace
} from '../../store/Contact';
import {
  WgoContactInputGql,
  WgoContactResponseGql,
  LanguageResponseGql,
  TranslationFilterResponseGql,
  TranslationInputGql
} from '../../../../graphql';
import { IContact } from '../../models/IContact';
import TranslationComponent from '../Translations/TranslationEditors/TranslationComponent.vue';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../store/ComponentsState';
import { INotify, NumberDictionary } from '../../models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';

@Component({
  components: {
    TranslationComponent
  }
})
export default class ContactAdminComponent extends Vue {
  @Action(contactActions.getContact, { namespace: wgoContactNamespace })
  loadContactData!: (module: string) => Promise<unknown>;
  @Action(contactActions.saveContact, { namespace: wgoContactNamespace })
  setContactData!: (record: WgoContactInputGql) => Promise<boolean>;
  @Getter(contactGetters.getContactData, { namespace: wgoContactNamespace })
  contactData!: WgoContactResponseGql;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };

  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;

  @Action(languageActions.setTranslation, { namespace: languageNamespace })
  setTranslation!: (obj: TranslationInputGql) => boolean;

  loading = true;
  contactName = '';
  address = '';
  phoneNumber = '';
  email = '';
  mapPath = '';

  moduleName = 'finance';

  @Prop() keyMapTitleField!: string;
  @Prop() keyContactTitleField!: string;
  @Prop() keyContactContentField!: string;
  @Prop() contactPageTitle!: string;
  @Prop() contactNameField!: string;
  @Prop() phoneNumberField!: string;
  @Prop() addressField!: string;
  @Prop() emailField!: string;
  @Prop() mapField!: string;
  @Prop() mapPreviewField!: string;
  @Prop() successSave!: string;
  @Prop() failSave!: string;
  @Prop() keyMapTitle!: string;
  @Prop() keyContactTitle!: string;
  @Prop() keyContactContent!: string;

  objMapTitle: TranslationFilterResponseGql = <TranslationFilterResponseGql>{
    key: this.keyMapTitle,
    id: this.keyMapTitle
  };

  objContactTitle: TranslationFilterResponseGql = <
    TranslationFilterResponseGql
  >{
    key: this.keyContactTitle,
    id: this.keyContactTitle
  };

  objContactContent: TranslationFilterResponseGql = <
    TranslationFilterResponseGql
  >{
    key: this.keyContactContent,
    id: this.keyContactContent
  };

  translationsMapTitle: NumberDictionary = {};
  translationsContactTitle: NumberDictionary = {};
  translationsContactContent: NumberDictionary = {};

  constructor() {
    super();
  }

  getContent(key: string) {
    return key in this.translationContent ? this.translationContent[key] : key;
  }

  getTranslationItem(traslationValue: NumberDictionary, key: string) {
    return Object.keys(traslationValue).map(langId => {
      const lang = parseInt(langId);
      return {
        languageId: lang,
        key: key,
        value: traslationValue[lang]
      };
    });
  }

  async clickSaveContactData() {
    this.loading = true;

    let result = true;
    let translationsToSet: TranslationInputGql[] = [];
    translationsToSet = translationsToSet.concat(
      this.getTranslationItem(this.translationsMapTitle, this.keyMapTitle),
      this.getTranslationItem(
        this.translationsContactTitle,
        this.keyContactTitle
      ),
      this.getTranslationItem(
        this.translationsContactContent,
        this.keyContactContent
      )
    );

    translationsToSet.forEach(elem => {
      result = result && this.setTranslation(elem);
    });

    if (result) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const contactData = <WgoContactInputGql>{
        module: this.moduleName,
        contactName: this.contactName,
        address: this.address,
        email: this.email,
        phoneNumber: this.phoneNumber,
        mapPath: this.mapPath
      };
      if (await this.setContactData(contactData)) {
        this.notify({
          message: this.getContent(this.successSave),
          type: 'positive'
        });
      } else {
        this.notify({
          message: this.getContent(this.failSave),
          type: 'negative'
        });
      }
    } else {
      this.notify({
        message: this.getContent(this.failSave),
        type: 'negative'
      });
    }
    this.loading = false;
  }

  onChangeIndexContent(
    translations: NumberDictionary,
    langId: number,
    value: string
  ) {
    translations[langId] = value;
  }

  async created() {
    await this.registerTranslations({
      [this.keyMapTitleField]: false,
      [this.keyContactTitleField]: false,
      [this.keyContactContentField]: false,
      [this.contactPageTitle]: false,
      [this.contactNameField]: false,
      [this.phoneNumberField]: false,
      [this.addressField]: false,
      [this.emailField]: false,
      [this.mapField]: false,
      [this.mapPreviewField]: false,
      [this.successSave]: false,
      [this.failSave]: false,
      [this.keyMapTitle]: false,
      [this.keyContactTitle]: false,
      [this.keyContactContent]: false
    });

    this.objMapTitle.value = this.getContent(this.keyMapTitle);
    this.objContactTitle.value = this.getContent(this.keyContactTitle);
    this.objContactContent.value = this.getContent(this.keyContactContent);

    const response = (await this.loadContactData(this.moduleName)) as IContact;
    this.contactName = response.contactName;
    this.address = response.address;
    this.phoneNumber = response.phoneNumber;
    this.email = response.email;
    this.mapPath = response.mapPath;

    this.loading = false;
  }
}
</script>
