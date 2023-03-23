<template>
  <div v-if="bill">
    <q-input
      square
      outlined
      class="q-mx-md q-mb-lg q-mt-md"
      v-model="bill.name"
      label="Name"
      :autofocus="true"
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="bill.description"
      label="Description"
      autogrow
      dense
    />
    <div class="q-mx-md q-my-lg">
      <FilterSelect
        :clearable="false"
        label="Client"
        :options="getValidCollaborators()"
        filterProp="login"
        @onChange="value => setCollaborator(value)"
        :value="bill.client"
      />
    </div>
    <div class="q-px-md q-pb-lg" style="width: 100%">
      <q-table
        bordered
        flat
        title=""
        :data="Object.values(billProducts).filter(prod => !prod.remove)"
        :columns="columns"
        row-key="productBillName"
        no-data-label="Please, add some product to bill"
      >
        <template v-slot:top>
          <div
            class="row q-col-gutter-none justify-between q-pa-none"
            style="width: 100%"
          >
            <div class="self-center">
              Products
            </div>
            <div>
              <q-btn
                unelevated
                padding="sm"
                color="primary"
                icon="add"
                size="sm"
                no-caps
                @click="() => setShowAddEditProductBillDialog(null)"
              />
            </div>
          </div>
        </template>
        <template v-slot:loading>
          <Loader :loading="true" />
        </template>
        <template v-slot:body-cell-buttons="props">
          <q-td :props="props">
            <div>
              <q-btn unelevated color="primary" icon="more_vert" dense>
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item
                      clickable
                      v-close-popup
                      @click="() => setShowAddEditProductBillDialog(props.row)"
                    >
                      <q-item-section avatar>
                        <q-avatar icon="edit" />
                      </q-item-section>
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="onDeleteProduct(props.row)"
                    >
                      <q-item-section avatar>
                        <q-avatar icon="delete" />
                      </q-item-section>
                      <q-item-section>Delete</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="bill.discount"
      label="Discount"
      type="number"
      dense
      :rules="[
        val => (parseInt(val) <= 100 && parseInt(val) >= 0) || 'Invalid value.'
      ]"
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="getPrice()"
      label="Bill Total Price"
      readonly
      autogrow
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="bill.validDays"
      label="Valid Days"
      type="number"
      dense
    />
    <q-input
      v-if="isUpdateBill"
      dense
      outlined
      v-model="bill.sendDate"
      mask="date"
      class="q-mx-md q-my-lg"
      label="Send date"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="bill.sendDate">
              <div class="row items-center justify-end">
                <q-btn
                  unelevated
                  v-close-popup
                  label="Close"
                  color="primary"
                  flat
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <QEditor
      :toEdit="bill"
      propToEdir="observations"
      class="q-mx-md q-my-lg"
      label="Observations"
    />
    <MediaListEditor
      :items="bill.docs"
      :addItems="
        items => {
          docsToAdd = items;
        }
      "
      title="Bild documents"
      :changeValue="() => {}"
      :showLoading="showLoading"
    />
    <q-card-section
      class="row text-primary items-center justify-center q-mt-md"
    >
      <q-btn
        unelevated
        color="primary"
        align="around"
        :disable="!isValid()"
        class="col-12 col-sm-auto"
        @click="() => addBillClick()"
        :label="isUpdateBill ? 'Update' : 'Create'"
      />
    </q-card-section>
    <AddProductBillDialog
      :close="() => (showAddEditProductBillDialog = false)"
      :showModal="showAddEditProductBillDialog"
      :productBill="selectedProductBill"
      :addProduct="addProductToBill"
      :products="getProductsList(selectedProductBill)"
    />
  </div>
</template>

<script lang="ts" src="./AddBillEditor.ts" />
