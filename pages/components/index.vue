<template>
  <div class="components_page">
    <p>
      自製組件主要是為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關components
    </p>
    <p>
      其餘主要是因為該套件並未提供vue版本，因此整合供純js之版本為組件的方式做實作
    </p>
    <NuxtLink
      v-for="link in linkList"
      :key="link.to"
      class="components_page-content"
      :to="link.to"
    >
      {{ link.label }}
    </NuxtLink>
  </div>
</template>

<script setup>
// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const linkList = computed(() => [
  { to: '/components/tab-test', label: 'Tabs組件測試' },
  { to: '/components/scroll-fetch-test', label: '下拉重載/無限滾動測試' },
  { to: '/components/wang-editor-test', label: 'WangEditor（HTML編輯器）測試' },
  { to: '/components/youtube-test', label: 'Youtube測試' },
  { to: '/components/swiper-js-test', label: 'SwiperJs測試' },
  { to: '/components/swiper-test', label: '自製Swiper測試' },
  { to: '/components/qr-code-test', label: 'QRcode測試' },
  { to: '/components/slide-in-panel', label: '訊息佇列測試' },
  { to: '/components/switch-button', label: 'switch組件測試' }
]);
</script>

<style lang="scss">
.components_page {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  &-content {
    flex: 1;
    flex-basis: 400px;
  }
}
</style>
