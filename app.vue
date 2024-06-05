<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { provideRepo } from "./client_domain/repository/repos";

const config = useAppConfig();
const useMock = config.useMock != "false";
provideRepo(useMock);
</script>

<style>
/* CSS for reset browser default style */
@import url("ress/ress.css");
</style>
