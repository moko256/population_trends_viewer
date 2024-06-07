<!--
  アプリ最上位

  各ページはpages配下に配置
-->
<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { provideRepo } from "./domain_client/repository/repos";

// Provide repositories
const config = useAppConfig();
provideRepo(
  config.useMock,
  config.mockFailAcqirePrefecture,
  config.mockFailAcqirePopulation,
  config.mockDelaySec,
);

// Add strings to DOM
const { locale, t } = useI18n();

const pageTitle = computed(() => t("pageTitle"));

useHead({
  title: pageTitle,
  htmlAttrs: {
    lang: locale,
  },
});
</script>

<style>
/* CSS for reset browser default style */
@import url("ress/ress.css");
</style>
