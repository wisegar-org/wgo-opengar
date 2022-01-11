<template>
  <wgo-simple-expanded
    :label="prop"
    :icon="getIcon()"
    group="languagesExpanded"
  >
    <template slot="content">
      <div class="q-py-sm">
        <EditLanguage
          :language="language"
          :showLoading="showLoading"
          :showClose="false"
          :close="onSuccess"
        />
      </div>
    </template>
  </wgo-simple-expanded>
</template>

<script lang="ts">
import { LanguageResponseGql } from '../../../../../graphql';
import EditLanguage from './EditLanguage.vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
    EditLanguage
  }
})
export default class EditLanguageExpanded extends Vue {
  @Prop() groupName!: string;
  @Prop() icon!: string;
  @Prop() language!: LanguageResponseGql;
  @Prop() prop!: string;
  @Prop() onSuccess!: (value: boolean) => unknown;
  @Prop() showLoading!: (value: boolean) => unknown;

  getIcon() {
    return this.language && this.language.logo && this.language.logo.url
      ? `img:${this.language.logo.url}`
      : this.icon;
  }
}
</script>
