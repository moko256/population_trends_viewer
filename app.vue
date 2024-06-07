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
const pageDescription = computed(() => t("pageDescription"));

useHead({
  title: pageTitle,
  htmlAttrs: {
    lang: locale,
  },
  meta: [{ name: "description", content: pageDescription }],
});
</script>

<style module></style>
