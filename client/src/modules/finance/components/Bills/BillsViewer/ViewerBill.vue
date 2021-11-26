<template>
  <div>
    <q-input
      square
      outlined
      class="q-mx-md q-mb-lg q-mt-md"
      v-model="bill.name"
      label="Name"
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      v-model="bill.description"
      label="Description"
      autogrow
      readonly
      dense
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="bill.client.name"
      label="Client"
      readonly
      dense
    />
    <q-input
      square
      outlined
      dense
      class="q-mx-md q-my-lg"
      :value="getFormatDate(bill.date.toString())"
      label="Date"
      autogrow
      readonly
    />
    <q-input
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="getStatus(bill.status)"
      label="Status"
      readonly
      dense
    />
    <div class="q-px-md q-pb-sm" style="width: 100%">
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
          </div>
        </template>
        <template v-slot:loading>
          <Loader :loading="true" />
        </template>
      </q-table>
    </div>
    <q-input
      v-if="!!bill.discount"
      square
      outlined
      class="q-mx-md q-my-lg"
      :value="bill.discount"
      label="Bill Total Price"
      readonly
      autogrow
      dense
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
      dense
      outlined
      v-model="bill.sendDate"
      mask="date"
      class="q-mx-md q-my-lg"
      label="Send date"
      readonly
    />
    <q-input
      square
      outlined
      readonly
      class="q-mx-md q-my-lg"
      v-model="bill.validDays"
      label="Valid Days"
      type="number"
      dense
    />
    <QEditor
      :toEdit="bill"
      propToEdir="observations"
      class="q-mx-md q-my-lg"
      label="Observations"
      :readonly="true"
    />
    <MediaListViewer
      v-if="!!bill.docs && bill.docs.length > 0"
      title="Bild documents"
      :items="bill.docs"
      :showLoading="showLoading"
    />

    <q-card-section class="row items-center justify-center text-primary">
      <q-btn
        unelevated
        color="primary"
        align="around"
        class="col-12 col-sm-auto"
        @click="() => close()"
        label="Close"
      />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { BillRecord, ProductsBill } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import MediaListViewer from '../../../../wgo/components/MediaList/MediaListViewer.vue';
import { ColumnsProductsBill } from '../ColumnsBills';
import { getBillStatusString } from 'src/modules/finance/models/parsers';
import QEditor from '../../../../wgo/components/QEditor.vue';

@Component({
  components: {
    MediaListViewer,
    QEditor
  }
})
export default class ViewerBill extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop({ required: true }) bill!: BillRecord;

  billProducts: {
    [key: number]: ProductsBill;
  } = {};

  columns = ColumnsProductsBill;
  getStatus = getBillStatusString;

  constructor() {
    super();
    this.billProducts = this.getProducts();
  }

  getProducts() {
    const billProducts: {
      [key: number]: ProductsBill;
    } = {};
    if (this.bill) {
      this.bill.products.forEach(prod => {
        const prodRecord = prod.product;
        billProducts[prod.productId] = {
          ...prod,
          maxCount: prod.count + (prodRecord ? prodRecord.unitCount : 0),
          type: prodRecord ? prodRecord.type : 1,
          remove: false
        };
      });
    }
    return billProducts;
  }

  getPrice() {
    const price = Object.values(this.billProducts)
      .filter(prod => !prod.remove)
      .map(prod => prod.count * prod.price)
      .reduce((a, b) => a + b, 0);
    const discount = parseFloat(`${this.bill.discount}`);
    if (discount) {
      const ToDiscount = Math.floor(price * discount) / 100;
      return `${price - ToDiscount} ( ${price} )`;
    }
    return price;
  }

  getFormatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
}
</script>
