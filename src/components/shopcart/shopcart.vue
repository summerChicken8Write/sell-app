<template>
  <div class="shopcart">
    <div class="content" v-on:click="toggleList">
      <div class="content-left">
        <div class="logo-wapper">
          <div class="logo" v-bind:class="{heightLight: totalCount > 0}">
            <i class="logo icon icon-shopping_cart" v-bind:class="{heightLight: totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" v-bind:class="{heightLight: totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" v-bind:class="{toPay: this.totalPrice >= this.minPrice}" v-on:click.stop.prevent="pay">{{payDesc}}</div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header border-1px">
          <h1 class="title">购物车</h1>
          <span class="clear" v-on:click="clear">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food border-1px" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">￥{{food.price * food.count}}</div>
              <div class="cart-warpper">
                <cartcontrol v-bind:food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="listShow" v-on:click="hideList"></div>
    </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

import cartcontrol from '../cartcontrol/cartcontrol'

export default {
  name: 'shopcart',
  data() {
    return {
      fold: true,
    };
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return '￥' + this.minPrice + '元起送';
      }
      else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return '还差￥' + diff + '元起送';
      }
      else{
        return '去结算';
      }
    },
    listShow() {
      if (this.totalCount === 0) {
        this.fold = true;
        return false;
      }
      else{
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            }
            else{
              this.scroll.refresh()
            }
          });
        }
        return show;
      }
    },
  },
  methods: {
    toggleList() {
      if (this.totalCount === 0) {
        return;
      }
      else {
        this.fold = !this.fold;
      }
    },
    clear() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    hideList() {
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      else{
        alert('支付' + this.totalPrice + '元')
      }
    }
  },
  components: { 
    'cartcontrol': cartcontrol,
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.heightLight
              background-color: rgb(0,160,220)
            .icon
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.heightLight
                color: rgb(255,255,255)
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            background-color: rgb(240,20,20)
            border-radius: 12px
            box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4)
            font-weight: 700
            font-size: 9px
            color: #fff
            line-height: 16px
            text-align: center
        .price
          display: inline-block
          margin: 12px 0
          padding-right: 12px
          vertical-align: top
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          line-height: 24px
          &.heightLight
            color: rgb(255,255,255)
        .desc
          display: inline-block
          line-height: 24px
          font-size: 10px
          margin: 12px 0 12px 12px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          width: 100%
          background-color: rgb(43,51,59)
          line-height: 48px
          font-size: 12px
          font-weight: 700
          text-align: center
          &.toPay
            background-color: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      width: 100%
      z-index: -1
      transition: all 0.5s linear
      transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        padding: 0 18px
        line-height: 40px
        background-color: #f3f5f7
        border-1px(rgba(7,17,27,0.1))
        .title
          float: left
          font-size: 14px
          font-weight: 200
          color: rgb(7,17,27)
        .clear
          float: right
          font-size: 12px
          color: rgb(0,160,220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background-color: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            font-size: 14px
            line-height: 24px
            color: rgb(7,17,27)
          .price
            position: absolute
            top: 12px
            right: 84px
            font-size: 14px
            line-height: 24px
            font-weight: 700
            color: rgb(240,20,20)
            margin: 0 12px 0 18px
          .cart-warpper
            position: absolute
            top: 6px
            right: 0
    .mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -10
      background-color:rgba(7, 17, 27, 0.6)
      backdrop-filter: blur(10px)
      transition: all 0.5s linear
      opacity: 1
      &.fade-enter, &.fade-leave-to
        background-color:rgba(7, 17, 27, 0)
        opacity: 0
</style>
