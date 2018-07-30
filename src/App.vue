<template>
  <div id="app">
    <div class="header">
      <v-header v-bind:seller="seller"></v-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view v-bind:seller="seller"/>
    </keep-alive>
  </div>
</template>
<script>
import {urlParse} from './common/js/util';
import header from './components/header/header'

const ERR_OK = 0;

export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: ( () => {
          let queryParam = urlParse();
          // console.log(queryParam);
          return queryParam.id;
        })()
      },
    };
  },
  created() {
    this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
      // response = response.json();
      response = response.data;
      // console.log(response);
      if (response.errno === ERR_OK) {
        // this.seller = response.data;
        // console.log(this.seller.id);
        this.seller = Object.assign({}, this.seller, response.data);
        // console.log(this.seller.id);
        // console.log(this.seller);
      }
    });
  },
  components: { 'v-header': header },
};

</script>
<style lang="stylus">

@import "./common/stylus/mixin.styl"
#app
  // margin: 50px 0
  .tab 
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    /*border-bottom: 1px solid rgba(1,17,27,0.1);*/
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item 
      flex: 1
      text-align: center
      & > a 
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active 
          color: rgb(240, 20, 20)
  
</style>
