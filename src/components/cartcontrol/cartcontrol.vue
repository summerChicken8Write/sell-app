<template>
  <div class="cartcontrol">
    <transition name="cart-transition">
      <div class="cart-remove" v-show="food.count > 0" v-on:click.stop.prevent="removeCrat($event)">
        <span class="icon icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-number" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" v-on:click.stop.prevent="addCrat($event)">
      <span class="icon icon-add_circle"></span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'cartcontrol',
  props: {
  	food: {
  		type: Object,
  	}
  },
  methods: {
    addCrat(event) {
      if (!event._constructed) {
        return
      }
      else{
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        }
        else{
          this.food.count ++;
        }
      }
    },
    removeCrat(event) {
      if (!event._constructed) {
        return
      }
      else{
        if (this.food.count) {
          this.food.count --;
        }
      }
    },
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .cartcontrol
    font-size: 0
    .cart-remove
      display: inline-block
      padding: 6px
      transition: all 0.5s linear
      &.cart-transition-enter, &.cart-transition-leave-to
        transform: translate3d(24px, 0, 0)
        opacity: 0
      .icon-remove_circle_outline
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)
        transform: rotate(0)
        transition: all 0.5s linear
      &.cart-transition-enter .icon-remove_circle_outline, &.cart-transition-leave-to .icon-remove_circle_outline
        transform: rotate(180deg)
    .cart-number
      display: inline-block
      width: 12px
      padding-top: 6px
      vertical-align: top
      text-align: center
      font-size: 10px
      line-height: 24px
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      padding: 6px
      .icon
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)
</style>
