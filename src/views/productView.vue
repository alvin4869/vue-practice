<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      增加一個產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in products" :key="item.id">
      <td>{{ item.category }}</td>
      <td>{{ item.title }}</td>
      <td class="text-right">
        {{ $filters.currency(item.origin_price) }}
      </td>
      <td class="text-right">
        {{ $filters.currency(item.price) }}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-muted" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm" @click="deleteModal(item)">刪除</button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <delete-modal ref="deleteModal" :product="tempProduct" @delete-product="deleteProduct"></delete-modal>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <PaginationComponent :pages="pagination" @emit-pages="getProducts"/>
</template>

<script>
import ProductModal from '../components/ProductModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    PaginationComponent,
    DeleteModal,
    ProductModal
  },
  inject: ['emitter'],
  methods: {
    deleteModal (item) {
      this.$refs.deleteModal.showModal()
      this.tempProduct = item
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.axios.get(api).then(res => {
        console.log(res)
        this.isLoading = false
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    },
    updateProduct (item) {
      this.tempProduct = item
      this.isLoading = true
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethods = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethods = 'put'
      }
      this.axios[httpMethods](api, { data: this.tempProduct }).then(res => {
        this.$refs.productModal.hideModal()
        this.isLoading = false
        if (res.data.success) {
          this.getProducts()
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功'
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、')
          })
        }
      })
    },
    deleteProduct (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.isLoading = true
      this.axios.delete(api).then(res => {
        this.$refs.deleteModal.hideModal()
        this.getProducts()
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
