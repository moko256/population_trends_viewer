<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { provideRepo } from "./domain_client/repository/repos";

const config = useAppConfig();
const useMock = config.useMock != "false";
provideRepo(useMock);
</script>

<style>
/* CSS for reset browser default style */
@import url("ress/ress.css");
</style>
