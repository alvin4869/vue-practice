<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                   :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            </td>
            <td><a href="#" class="text-dark">{{ item.title }}</a></td>
            <td>
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                        @click="getProduct(item.id)">
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger"
                >
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 購物車列表 -->
    </div>
  </div>
  <pagination-component :pages="pagination" @emit-pages="getProducts"/>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  components: { PaginationComponent },
  data () {
    return {
      isLoading: false,
      products: [],
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.axios.get(api).then(res => {
        console.log(res)
        this.isLoading = false
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
