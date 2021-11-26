<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div
      v-if="!innerLoading"
      class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10"
    >
      <q-card flat square bordered class="q-ma-lg">
        <q-card-section class="q-ma-sm">
          <q-icon
            name="img:favicon.ico"
            class="login_icon cursor-pointer"
            @click="goToLogin"
          />

          <q-input
            square
            outlined
            class="q-ma-sm"
            v-model="email"
            :autofocus="true"
            @keydown.enter.prevent="resendConfirmationLink"
            :label="translationsContent.WGO_USERS_COLUMN_EMAIL_LABEL"
          />
        </q-card-section>
        <q-card-actions align="center" vertical class="q-ma-sm">
          <q-btn
            unelevated
            color="primary"
            align="around"
            class="btn-fixed-width btn_width"
            :label="translationsContent.WGO_RESEND_BTN"
            :disable="!email"
            @click="resendConfirmationLink"
          />
        </q-card-actions>
      </q-card>
    </div>
    <Loader :loading="showLoader || innerLoading" />
  </div>
</template>

<script lang="ts">
import _ from 'lodash';

import { OpengarPaths } from '../../settings/ApiSettings';
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { userActions, userNamespace } from '../../store/User';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../store/ComponentsState';
import { INotify } from '../../models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';
import {
  ITranslationAuthKeys,
  TranslationsAuthKeys
} from '../../components/Users/TranslationsKeys';

@Component({})
export default class ResendEmailConfirmation extends Vue {
  @Action(userActions.resendConfirmation, { namespace: userNamespace })
  resendConfirmation!: (email: string) => Promise<boolean>;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  setNotify!: (value: INotify) => void;
  email = '';
  showLoader = false;
  innerLoading = true;

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: ITranslationAuthKeys;

  async resendConfirmationLink() {
    if (!_.isEmpty(this.email)) {
      this.showLoader = true;
      const result = await this.resendConfirmation(this.email);
      this.showLoader = false;
      if (result !== null && result) {
        this.goToSentedEmailPage();
      } else {
        const error = this.translationsContent
          .WGO_AUTH_RESEND_FAIL_SEND_CONFIRM_EMAIL;
        this.setNotify(<INotify>{
          type: 'negative',
          message: error
        });
      }
    }
  }
  goToLogin() {
    void this.$router.push(OpengarPaths.login.url);
  }
  goToSentedEmailPage() {
    void this.$router.push(OpengarPaths.sentedEmailConfirmation.url);
  }

  async created() {
    this.innerLoading = true;
    await this.registerTranslations(TranslationsAuthKeys);
    this.innerLoading = false;
  }
}
</script>

<style scoped>
.login_icon {
  height: 140px;
  width: 140px;
}

.btn_width {
  min-width: 150px;
}
</style>
