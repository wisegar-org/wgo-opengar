<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <ContactAdminComponent 
        :keyMapTitleField="keyMapTitleField"
        :keyContactTitleField="keyContactTitleField"
        :keyContactContentField="keyContactContentField"
        :contactPageTitle="contactPageTitle"
        :contactNameField="contactNameField"
        :phoneNumberField="phoneNumberField"
        :addressField="addressField"
        :emailField="emailField"
        :mapField="mapField"
        :mapPreviewField="mapPreviewField"
        :successSave="successSave"
        :failSave="failSave"
        :keyMapTitle="keyMapTitle"
        :keyContactTitle="keyContactTitle"
        :keyContactContent="keyContactContent"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContactAdminComponent from 'src/modules/wgo/components/ContactAdmin/ContactAdminComponent.vue';

@Component({
  components: {
    ContactAdminComponent
  }
})
export default class AdminIndexContentPage extends Vue {
  keyMapTitleField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_MAP_TITLE_FIELD';
  keyContactTitleField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_CONTACT_TITLE_FIELD';
  keyContactContentField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_CONTACT_CONTENT_FIELD';
  contactPageTitle = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_TITLE';
  contactNameField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_CONTACT_NAME_FIELD';
  phoneNumberField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_PHONE_NUMBER_FIELD';
  addressField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_ADDRESS_FIELD';
  emailField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_EMAIL_FIELD';
  mapField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_MAP_FIELD';
  mapPreviewField = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_MAP_PREVIEW_FIELD';
  successSave = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_SUCCESS_SAVE';
  failSave = 'WGO_FINANCE_CONTACT_ADMIN_PAGE_FAIL_SAVE';
  keyMapTitle = 'WGO_FINANCE_MAP_CONTENT_TITLE';
  keyContactTitle = 'WGO_FINANCE_CONTACT_TITLE';
  keyContactContent = 'WGO_FINANCE_CONTACT_BODY';
}
</script>