import { IPoll } from "src/models/Poll";
import { AGVPollPaths } from "src/router/paths/pollPaths";
import { PollService } from "src/services/PollService";
import { defineComponent } from "vue";
import Text from "../../wgo-base/core/components/Text/Text.vue";
import BannerComponent from "../BannerComponent/BannerComponent.vue";

export default defineComponent({
  name: "HomeComponent",
  components: {
    Text,
    BannerComponent,
  },
  data() {
    const pollService = new PollService();
    const pollData: IPoll = <IPoll>{};
    return {
      pollService,
      pollData,
      loading: false,
      pullPath: AGVPollPaths.pollData.path,
      rulesPath: AGVPollPaths.pollRules.path,
    };
  },
  async created() {
    this.pollData = await this.pollService.getPollConfig();
  },
});
