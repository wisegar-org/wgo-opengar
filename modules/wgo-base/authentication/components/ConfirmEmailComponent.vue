<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
      <q-card flat square bordered class="q-ma-lg">
        <q-card-section class="q-ma-sm">
          <q-icon
            name="img:favicon.ico"
            class="login_icon cursor-pointer"
            size="4.4em"
          />
          <div class="q-mt-xl q-mb-sm q-mx-sm">Verifying account ...</div>
        </q-card-section>
      </q-card>
    </div>
    <Loader :loading="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { AuthService } from "../services/AuthService";
import Loader from "../../core/components/Loader/Loader.vue";
export default defineComponent({
  name: "ConfirmEmailComponent",
  props: {
    token: {
      type: String,
      default: "",
    },
  },
  components: {
    Loader,
  },
  data() {
    return { showLoading: true };
  },
  async mounted() {
    this.showLoading = true;
    const service = new AuthService();
    const result = await service.confirmEmail({
      token: this.token,
    });
    this.$emit("onConfirm", !!result);
    this.showLoading = false;
  },
  emits: {
    onConfirm(status: boolean) {
      return status;
    },
  },
});
</script>
