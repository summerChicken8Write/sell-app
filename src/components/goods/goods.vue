<template>
  <div class="goods">
    <div class="menu-warpper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" v-bind:class="{'current': currentIndex === index}"
        v-on:click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" v-bind:class="classMap[item.type]"></span> {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="foodListHook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" v-on:click="selectFood(food, $event)" class="food-item border-1px">
              <div class="icon">
                <img v-bind:src="food.icon" alt="">
              </div>
              <div class="content">
                <h1 class="name">{{food.name}}</h1>
                <p v-show="food.description" class="desc">{{food.description}}</p>
                <div class="etra">
                  <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice"  class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-wrapper">
                  <cartcontrol v-bind:food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart v-bind:selectFoods="selectFoods" v-bind:deliveryPrice="seller.deliveryPrice" v-bind:minPrice="seller.minPrice"></shopcart>
    <food v-bind:food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'

const ERR_OK = 0;

export default {
  name: 'goods',
  data() {
    return {
      classMap: ["decrease","discount","special","invoice","guarantee"],
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    currentIndex() {
      for (var i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods
    },
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      // response = response.json();
      response = response.data;
      // console.log(response);
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        // console.log(this.goods);
        this.$nextTick(() => {
          this.initScroll();
          this.calculateHeight();
        });
      }
    });
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodListHook;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 500);
      // console.log(index);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      let foodList = this.$refs.foodListHook;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
  },
  components: { 
    'shopcart': shopcart,
    'cartcontrol': cartcontrol,
    'food': food,
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

@import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 172px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-warpper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        // width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 100
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7,17,27,0.1))
          font-size: 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
          .decrease
            bg-image("decrease_3")
          .discount
            bg-image("discount_3")
          .guarantee
            bg-image("guarantee_3")
          .invoice
            bg-image("invoice_3")
          .special
            bg-image("special_3")
    .foods-wrapper
      flex: 1
      .title
        height: 26px
        line-height: 26px
        padding-left: 12px
        border-left: 2px solid #d9dde1
        color: rgb(147,153,159)
        background: #f3f5f7
        font-size: 12px
      .food-item
        display: flex
        // padding: 18px
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          margin-bottom: 0
          border-none()
        .icon
          flex: 0 0 57px
          img
            width: 57px
            height: 57px
        .content
          margin-left: 10px
          .name
            margin: 2px 0 8px
            font-size: 14px
            line-height: 14px
            color: rgb(7,17,27)
          .desc
            margin-bottom: 8px
            font-size: 10px
            line-height: 12px
            color: rgb(147,153,159)
          .etra
            margin-bottom: 8px
            font-size: 10px
            line-height: 10px
            color: rgb(147,153,159)
            span
              margin-right: 12px
          .price
            line-height: 14px
            .now
              margin-right: 12px
              font-size: 14px
              font-weight: 700
              color: rgb(240, 20, 20)
            .old
              font-size: 10px
              font-weight: normal
              color: rgb(147,153,159)
              text-decoration: line-through
          .cart-wrapper
            position: absolute
            right: 0
            bottom: 6px
</style>
