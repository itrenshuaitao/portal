<template>
  <div class="news" :class="{'mobile-news':_isMobile()}">
    <Banner :imgSrc="toRaw(bannerImg)"> </Banner>
    <div class="container">
      <div class="news-list">
        <div class="item" v-for="item in newsList">
          <ItemCard
            :news="item"
            @click="() => router.push('/news/detail/' + item.id)"
          />
        </div>
      </div>
      <div style="display: flex; justify-content: center" class="_pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagination.pageSize"
          prev-text="上一页"
          next-text="下一页"
          :total="pagination.total"
          @current-change="paginationChange"
        />
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { ref, onMounted, reactive, toRaw } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ItemCard from "@/components/newsCard.vue";
import Banner from "@/components/Banner.vue";
import { queryNewsList } from "@/api/index";
import { queryBannerImg } from "@/utils/index";
import { _isMobile } from '@/utils/index'
const store = useStore();
const router = useRouter();
const newsList = ref([]);
const pagination = reactive({
  total: 0,
  pageSize: 9,
});
const bannerImg = ref("");

onMounted(() => {
  _isMobile() ?  pagination.pageSize = 8 : pagination.pageSize = 9
  getNewsList(1)
  bannerImg.value = queryBannerImg(4);
});

const getNewsList = (pageIndex) => {
  const params = {
    pageIndex,
    pageSize: pagination.pageSize,
    sort: 1,
  };
  queryNewsList(params).then(({ code, data, totalResults }) => {
    if (code === 0) {
      newsList.value = data;
      pagination.total = totalResults;
    }
  });
};

const paginationChange = (value) => {
  getNewsList(value);
};
</script>
    
<style lang="scss" scoped>
.news {
  width: 100%;
  height: 100%;

  .container {
    padding: 24px 120px 58px 120px;
    z-index: 1;
    position: relative;

    .news-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .item {
        width: calc((100% - 32px) / 3);
        margin-right: 16px;
        margin-bottom: 24px;
        background: linear-gradient(
          -51.95deg,
          rgba(246, 246, 250, 1) 0%,
          rgba(254, 255, 254, 1) 100%
        );
        box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);

        &:nth-of-type(3n + 0) {
          margin-right: 0;
        }
      }
    }

    ._pagination {
      height: 32px;
      line-height: 32px;

      :deep(.el-pagination.is-background .btn-prev),
      :deep(.el-pagination.is-background .btn-next),
      :deep(.el-pager li) {
        height: 32px;
        line-height: 40px;
        font-size: 14px !important;
        color: rgb(62, 73, 84);
        background: rgb(255, 255, 255);
        border: none;
        box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5),
          inset 0px -1px 4px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(21.75px);
        padding: 6px 16px;

        &.is-active {
          box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5),
            inset 0px -1px 4px rgba(0, 75, 146, 0.65);
          backdrop-filter: blur(21.75px);
        }
      }
    }
  }
}
.mobile-news {

  .container {
    padding: 24px 80px 58px 80px;

    .news-list {
      justify-content: space-between;

      .item {
        width: calc((100% - 32px) / 2);
        margin-right: 16px;
        margin-bottom: 24px;
        background: linear-gradient(
          -51.95deg,
          rgba(246, 246, 250, 1) 0%,
          rgba(254, 255, 254, 1) 100%
        );
        box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);

        &:nth-of-type(3n + 0) {
          margin-right: 0;
        }
      }
    }

    ._pagination {
      height: 82px;
      line-height: 82px;
      margin-top: 30px;

      :deep(.el-pagination.is-background .btn-prev),
      :deep(.el-pagination.is-background .btn-next),
      :deep(.el-pager li) {
        width:8vw;
        height: 72px;
        line-height: 56px;
        font-size: 44px !important;
        color: rgb(62, 73, 84);
        background: rgb(255, 255, 255);
        border: none;
        box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5),
          inset 0px -1px 4px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(21.75px);
        padding: 6px 16px;

        &.is-active {
          box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5),
          inset 0px -1px 4px rgba(0, 75, 146, 0.65);
          backdrop-filter: blur(21.75px);
        }
      }
    }
  }
}
</style>