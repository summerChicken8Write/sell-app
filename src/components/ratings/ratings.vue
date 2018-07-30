<template>
  <div class="ratings" ref="ratingsWrapper">
    <div class="ratings-wapper">
    	<div class="overview">
    		<div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <span class="rank">高于周边商家{{seller.rankRate}}</span>
        </div>
        <div class="overview-right">
          <div class="score-wapper">
            <span class="title">服务态度</span>
            <star v-bind:size="36" v-bind:score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wapper">
            <span class="title">商品评分</span>
            <star v-bind:size="36" v-bind:score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
    	</div>
      <split></split>
      <ratingselect v-bind:selectType.sync="selectType" v-bind:onlyContent.sync="onlyContent" v-bind:desc="desc" v-bind:ratings="ratings"></ratingselect>
      <div class="rating-wapper">
        <ul>
          <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img v-bind:src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wapper">
                <star v-bind:size="24" v-bind:score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text" v-show="rating.text">{{rating.text}}</p>
              <div class="recommend">
                 <span class="icon" v-bind:class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                 <span class="recommend-item" v-for="item in rating.recommend" v-show="rating.recommend && rating.recommend.length">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  const ERR_OK = 0;

export default {
  data() {
    return {
      goods: [],
      ratings: [],
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽',
      },
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      // response = response.json();
      response = response.data;
      if (response.errno === ERR_OK) {
        this.ratings = response.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingsWrapper, {
            click: true
          });
        });
      }
    });
  },
  components: { 
    'star': star,
    'split': split,
    'ratingselect': ratingselect,
  },
  methods: {
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      }
      else {
        return type === this.selectType;
      }
    },
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

@import "../../common/stylus/mixin.styl"

  .ratings
    position: absolute
    top: 172px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .ratings-wapper
      .overview
        padding: 18px 0
        display: flex
        .overview-left
          padding: 6px 0
          flex: 0 0 138px
          width: 138px
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          @media only screen and (max-width: 320px)
            flex: 0 0 120px
          .score
            margin-bottom: 6px
            font-size: 24px
            color: rgb(255, 153, 0)
            line-height: 28px
          .title
            margin-bottom: 8px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 12px
          .rank
            font-size: 10px
            color: rgb(147,153,159)
            line-height: 10px
        .overview-right
          flex: 1
          padding: 6px 0 6px 24px
          @media only screen and (max-width: 320px)
            padding-left: 6px
          .score-wapper
            margin-bottom: 8px
            font-size: 0
            .title
              display: inline-block
              vertical-align: top
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px
            .star
              display: inline-block
              vertical-align: top
              margin: 0 12px
            .score
              display: inline-block
              vertical-align: top
              font-size: 12px
              color: rgb(255, 153, 0)
              line-height: 18px
          .delivery-wapper
            font-size: 0
            .title
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px
            .delivery
              margin: 0 12px
              font-size: 12px
              color: rgb(147,153,159)
              line-height: 18px
      .rating-wapper
        padding: 0 18px
        .rating-item
          display: flex
          padding: 18px 0
          border-1px(rgba(7,17,27,0.1))
          .avatar
            flex: 0 0 28px
            width: 28px
            margin-right: 12px
            img
              width: 28px
              height: 28px
              border-radius: 50%
          .content
            position: relative
            flex: 1
            .name
              margin-bottom: 4px
              font-size: 10px
              color: rgb(7, 17, 27)
              line-height: 12px
            .star-wapper
              margin-bottom: 6px
              font-size: 0
              .star
                margin-right: 6px
                display: inline-block
                vertical-align: top
              .delivery
                display: inline-block
                vertical-align: top
                font-size: 10px
                font-weight: 200
                color: rgb(147, 153, 159)
                line-height: 12px
            .text
              margin-bottom: 8px
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px
            .recommend
              font-size: 0
              .icon
                margin-right: 8px
                margin-bottom: 4px
                font-size: 12px
                line-height: 16px
                &.icon-thumb_up
                  color: rgb(0, 160, 220)
                &.icon-thumb_down
                  color: rgb(147, 152, 159)
              .recommend-item
                padding: 0 6px
                margin-right: 8px
                margin-bottom: 4px
                font-size: 9px
                color: rgb(147, 153, 159)
                line-height: 16px
                border: 1px solid rgba(7, 17, 27, 0.1)
                border-radius: 2px
                background-color: rgb(255, 255, 255)
            .time
              position: absolute
              top: 0
              right: 0
              font-size: 10px
              font-weight: 200
              color: rgb(147, 153, 159)
              line-height: 12px
</style>
