<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      v-if="userLogged && userLogged.isAdmin"
      bordered
      flat
      title=""
      :data="filterProducts"
      :columns="columns"
      row-key="nameProduct"
      :loading="loading"
    >
      <template v-slot:top>
        <div class="row items-center justify-between q-table">
          <div class="col-12 col-sm-auto no-wrap">
            <div class="q-table__title ellipsis">
              Products
            </div>
          </div>
          <div class="flex q-pb-sm justify-end col-12 col-sm-auto row">
            <q-btn
              unelevated
              v-if="userLogged && userLogged.isAdmin"
              color="primary"
              class="col-12 col-sm-auto q-ml-sm q-mb-sm"
              no-caps
              icon="add"
              label="Create Product"
              @click="() => showEditProductDialog(null)"
            />
          </div>
        </div>
        <div class="row q-col-gutter-none justify-end" style="width: 100%">
          <div class="col-12 col-md-3">
            <FilterSelect
              label="Type"
              :options="typeOptions"
              filterProp="label"
              :value="filter.type"
              @onChange="
                value => {
                  setType(value);
                }
              "
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              clearable
              dense
              outlined
              v-model="nameProductFilter"
              prefix="Name: "
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
                    @click="() => showProductDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="assignment" />
                    </q-item-section>
                    <q-item-section>Details</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="() => showEditProductDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-avatar icon="edit" />
                    </q-item-section>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <AddProductEditorDialog
      :productToEdit="selectedProduct"
      :showModal="showAddProductDialog"
      :close="() => (showAddProductDialog = false)"
    />
    <ViewerProductDialog
      :product="selectedProduct"
      :showModal="showViewProductDialog"
      :close="() => (showViewProductDialog = false)"
    />
  </div>
</template>

<script lang="ts" src="./Products.ts" />

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
