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

          <div
            v-html="translationsContent.WGO_AUTH_SENTED_CONFIRM_EMAIL_CONTENT"
          />
        </q-card-section>
      </q-card>
    </div>

    <Loader :loading="innerLoading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { OpengarPaths } from '../../settings/ApiSettings';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';
import {
  TranslationsAuthKeys,
  ITranslationAuthKeys
} from '../../components/Users/TranslationsKeys';
import { Action, Getter } from 'vuex-class';

@Component({
  components: {}
})
export default class SentedEmailConfirmation extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: ITranslationAuthKeys;
  @Prop() token!: string;
  innerLoading = true;

  goToLogin() {
    void this.$router.push(OpengarPaths.login.url);
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
  width: 150px;
}
</style>
