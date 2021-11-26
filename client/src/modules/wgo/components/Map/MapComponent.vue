<template>
  <div class="q-pa-md">
    <div v-html="getContent(mapTitleSection)"></div>
    <iframe
      style="border: 0;"
      tabindex="0"
      :src="mapPath"
      width="100%"
      height="500"
      frameborder="0"
      allowfullscreen="allowfullscreen"
      aria-hidden="false"
    >
    </iframe>
    <div>
      <q-card class="my-card" flat>
        <q-card-section>
          <div class="text-h6 text-center">{{ contactName }}</div>
          <div class="text-body1 text-center">{{ address }}</div>
          <br />
          <div class="text-body1 text-center">
            {{ getContent(contentMapPhoneNumberLabel) }}: {{ phoneNumber }}
          </div>
          <div class="text-body1 text-center">
            {{ getContent(contentMapEmailLabel) }}: {{ email }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { WgoContactResponseGql } from 'src/graphql';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { IContact } from '../../models/IContact';
import {
  contactActions,
  contactGetters,
  wgoContactNamespace
} from '../../store/Contact';

@Component({
  components: {}
})
export default class MapComponent extends Vue {
  @Action(contactActions.getContact, { namespace: wgoContactNamespace })
  loadContactData!: (module: string) => Promise<unknown>;
  @Getter(contactGetters.getContactData, { namespace: wgoContactNamespace })
  contactData!: WgoContactResponseGql;

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };

  @Prop() contentMapPhoneNumberLabel!: string
  @Prop() contentMapEmailLabel!: string
  @Prop() mapTitleSection!: string

  @Prop() WGOModule!: string
  
  loading = true;

  contactName = '';
  address = '';
  phoneNumber = '';
  email = '';
  mapPath = '';

  constructor() {
    super();
  }

  getContent(key: string) {
    return key in this.translationContent ? this.translationContent[key] : key;
  }

  async created() {
    await this.registerTranslations({
      [this.contentMapPhoneNumberLabel]: true,
      [this.contentMapEmailLabel]: true,
      [this.mapTitleSection]: false,
    });

    const response = (await this.loadContactData(this.WGOModule)) as IContact;
    this.contactName = response.contactName;
    this.address = response.address;
    this.phoneNumber = response.phoneNumber;
    this.email = response.email;
    this.mapPath = response.mapPath;

    this.loading = false;
  }
}
</script>
