<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { provideRepo } from "./domain_client/repository/repos";

const config = useAppConfig();
provideRepo(config.useMock);

const { setLocale, t } = useI18n();

onMounted(() => {
  setLocale(navigator.language);
});

const pageTitle = computed(() => t("pageTitle"));

useHead({
  title: pageTitle,
});
</script>

<style>
/* CSS for reset browser default style */
@import url("ress/ress.css");
</style>
