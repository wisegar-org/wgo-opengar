import { defineComponent } from 'vue';
import { translationsIndexContent } from '../../models/translations';
import { useTranslationStore } from '../../stores/translationStore';
import { BaseTranslateComponent } from '../../wgo-base/core/components/BaseComponents';

export default defineComponent({
  name: 'ScheduleComponent',
  setup() {
    const tranStore = useTranslationStore();
    const { getLabel } = new BaseTranslateComponent();
    return {
      translations: translationsIndexContent,
      getLabel: (name: string) => getLabel(tranStore.translationStore as any, name),
    };
  },
});