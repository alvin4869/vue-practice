<template>
  <loading-component :active="isLoading"></loading-component>
  <table class="table mt-4">
    <thead>
    <tr>
      <th>購買時間</th>
      <th>Email</th>
      <th>購買款項</th>
      <th>應付金額</th>
      <th>是否付款</th>
      <th>編輯</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="(item, key) in orders" :key="key">
      <tr v-if="orders.length"
          :class="{'text-secondary': !item.is_paid}">
        <td>{{ $filters.date(item.create_at) }}</td>
        <td><span v-text="item.user.email" v-if="item.user"></span></td>
        <td>
          <ul class="list-unstyled">
            <li v-for="(product, i) in item.products" :key="i">
              {{ product.product.title }} 數量：{{ product.qty }}
              {{ product.product.unit }}
            </li>
          </ul>
        </td>
        <td class="text-right">{{ item.total }}</td>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`"
                   v-model="item.is_paid"
                   @change="updatePaid(item)">
            <label class="form-check-label" :for="`paidSwitch${item.id}`">
              <span v-if="item.is_paid">已付款</span>
              <span v-else>未付款</span>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
                    @click="openModal(item)">檢視
            </button>
            <button class="btn btn-outline-danger btn-sm"
                    @click="openDelOrderModal(item)"
            >刪除
            </button>
          </div>
        </td>
      </tr>
    </template>
    </tbody>
    <OrderModal :tempOrder="tempOrder"/>
  </table>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue'

export default {
  components: { OrderModal },
  data () {
    return {
      orders: {},
      tempOrder: {},
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`
      this.axios.get(api).then(res => {
        this.isLoading = false
      })
    },
    openModal (item) {
      this.tempOrder = item
    }
  },
  created () {
    this.getOrder()
  }
}
</script>

<style scoped>

</style>
