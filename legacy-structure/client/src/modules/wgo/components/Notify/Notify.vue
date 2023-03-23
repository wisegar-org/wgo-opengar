<template>
  <div />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {
  componentsNamespace,
  componentsSettedKeys,
  componentsActionsKeys
} from '../../store/ComponentsState';
import { INotify, ITranslations } from '../../models';
import { languageGetters, languageNamespace } from '../../store/Language';

@Component({
  components: {}
})
export default class Notify extends Vue {
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (record: INotify) => void;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationsContent!: ITranslations;
  private unSubscribe!: () => unknown;

  private mutationType = `${componentsNamespace}/${componentsSettedKeys.setNotify}`;

  mounted() {
    this.unSubscribe = this.$store.subscribe(mutation => {
      if (mutation.type !== this.mutationType) return;
      this.showNotification(mutation.payload);
    });
  }

  beforeUnmount() {
    this.unSubscribe();
  }
  showNotification(notify: INotify) {
    const config = this.getConfigByType(notify.type);
    const closeBtn = this.translationsContent.WGO_CLOSE_BTN;
    this.$q.notify({
      message: notify.message,
      group: false,
      color: 'primary',
      textColor: 'white',
      multiLine: true,
      progress: true,
      icon: config.icon,
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      actions: [
        {
          label: closeBtn,
          color: 'black',
          handler: () => {
            /* ... */
          }
        }
      ]
    });
  }
  getConfigByType(type: string) {
    switch (type) {
      case 'positive': {
        return {
          icon: 'thumb_up'
        };
      }
      case 'negative': {
        return {
          icon: 'report_problem'
        };
      }
      default: {
        return {
          icon: 'warning'
        };
      }
    }
  }
}
</script>
