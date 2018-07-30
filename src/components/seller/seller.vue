<template>
  <div class="seller" ref="ratingsContent">
    <div class="seller-content">
    	<div class="overview">
    		<h1 class="title">{{seller.name}}</h1>
    		<div class="desc border-1px">
    			<star v-bind:size="36" v-bind:score="seller.score"></star>
    			<span class="text">({{seller.ratingCount}})</span>
    			<span class="text">月售{{seller.sellCount}}单</span>
    		</div>
    		<ul class="remark">
    			<li class="block">
    				<h2>起送价</h2>
    				<div class="content">
    					<span class="stress">{{seller.minPrice}}</span>元
    				</div>
    			</li>
    			<li class="block">
    				<h2>商家配送</h2>
    				<div class="content">
    					<span class="stress">{{seller.deliveryPrice}}</span>元
    				</div>
    			</li>
    			<li class="block">
    				<h2>平均配送时间</h2>
    				<div class="content">
    					<span class="stress">{{seller.deliveryTime}}</span>分钟
    				</div>
    			</li>
    		</ul>
        <div class="favorite" v-on:click="toggleFavorite">
          <span class="icon icon-favorite" v-bind:class="{active:favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
    	</div>
      <split></split>
      <div class="bulletin-wapper border-1px">
        <h1 class="title">公告与活动</h1>
        <div class="content">{{seller.bulletin}}</div>
      </div>
      <ul class="supports" v-if="seller.supports">
        <li class="supports-item border-1px" v-for="item in seller.supports">
          <span class="icon" v-bind:class="classMap[item.type]"></span>
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wapper" ref="picWapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img v-bind:src="pic" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

import {saveToLocal, loadToLocal} from '../../common/js/store';

import star from '../star/star'
import split from '../split/split'

export default {
  data() {
    return {
      classMap: ["decrease","discount","special","invoice","guarantee"],
      favorite: (() => {
        return loadToLocal(this.seller.id, 'favorite', false);
      })(),
    };
  },
  props: {
    seller: {
      type: Object,
    }
  },
  computed: {
    favoriteText() {
      if (this.favorite) {
        return '已收藏';
      }
      else {
        return '收藏';
      }
    },
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
  },
  components: { 
    'star': star,
    'split': split,
  },
  created() {
    this.$nextTick(() => {
      this.mainScroll = new BScroll(this.$refs.ratingsContent, {
        click: true,
      });
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        this.picScroll = new BScroll(this.$refs.picWapper, {
          scrollX: true,
          eventPassthrough: 'vertical',
        });
      }
    });
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

@import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .desc
        padding-bottom: 18px
        font-size: 0
        line-height: 18px
        border-1px(rgba(7,17,27,0.1))
        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px
        .text
          display: inline-block
          vertical-align: top
          margin-right: 12px
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        margin-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7,17,27,0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .content
            font-size: 10px
            color: rgb(7, 17, 27)
            line-height: 24px
            .stress
              font-size: 24px
              font-weight: 200
      .favorite
        position: absolute
        top: 18px
        right: 18px
        width: 36px
        text-align: center
        .icon
          display: block
          margin-bottom: 4px
          font-size: 24px
          color: #d4d6d9
          line-height: 24px
          &.active
            color: rgb(240, 20, 20)
        .text
          font-size: 10px 
          color: rgb(77, 85, 93)
          line-height: 10px
    .bulletin-wapper
      margin: 18px 18px 0 18px
      padding-bottom: 18px
      border-1px(rgba(7,17,27,0.1))
      .title
        margin-bottom: 8px
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .content
        padding: 0 12px
        font-size: 12px
        font-weight: 200
        color: rgb(240, 20, 20)
        line-height: 24px
    .supports
      margin: 0 18px
      .supports-item
        padding: 16px 12px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 16px
          height: 16px
          margin-right: 6px
          background-size: 16px 16px
          &.decrease
            bg-image("decrease_4")
          &.discount
            bg-image("discount_4")
          &.guarantee
            bg-image("guarantee_4")
          &.invoice
            bg-image("invoice_4")
          &.special
            bg-image("special_4")
        .text
          font-size: 12px
          font-weight: 200
          color: rgb(7,17,27)
          line-height: 16px
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .pic-wapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin-right: 0px
            img
              width: 120px
              height: 90px
    .info
      padding 18px 18px 0 18px
      .title
        padding-bottom: 12px
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        border-1px(rgba(7,17,27,0.1))
      .info-item
        padding: 16px 12px
        border-1px(rgba(7,17,27,0.1))
        font-size: 12px
        font-weight: 200
        color: rgb(7,17,27)
        line-height: 16px
        &:last-child
          border-none()
</style>
