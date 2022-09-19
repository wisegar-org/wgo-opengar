<template>
  <q-dialog v-model="open" :persistent="true" :maximized="$q.platform.is.mobile">
    <q-card flat square bordered>
      <q-item class="bg-primary text-white">
        <q-item-section avatar top class="self-center">
          <q-icon name="img:favicon.ico" class="login_icon cursor-pointer" size="3.4em" @click="goToHome" />
        </q-item-section>
        <q-item-section top class="self-center">
          <div class="text-h6 text-left" style="white-space: pre-line; overflow: hidden; overflow-wrap: anywhere">
            {{ getLabelFromName(translations.ADD_EMPLOYEE_MESSAGE_TITLE) }}: {{ enterpriseName }}
          </div>
        </q-item-section>
        <q-item-section top side class="self-center">
          <q-btn class="gt-xs text-white" flat dense :label="getLabelFromName(tranBase.HOME)" @click="goToHome" />
        </q-item-section>
      </q-item>
      <q-card-section>
        <div style="white-space: break-spaces; overflow: hidden; overflow-wrap: break-word">
          {{ getLabelFromName(translations.ADD_EMPLOYEE_MESSAGE_SUBTITLE) }}
        </div>
      </q-card-section>
      <q-card-actions align="center" vertical class="row q-ma-xs q-pa-xs">
        <div class="row col-12 justify-around fit">
          <q-btn
            unelevated
            dense
            class="btn_width_fix"
            color="primary"
            align="around"
            @click="goToHome"
            :label="getLabelFromName(tranBase.CLOSE)"
          />
          <q-btn
            unelevated
            dense
            color="primary"
            align="around"
            class="btn_width_fix"
            :label="getLabelFromName(tranBase.CONFIRM)"
            @click="addEmployee"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" src="./AddEmployee.ts" />
