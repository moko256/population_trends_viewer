<!-- ページタイトル -->
<template>
  <header :class="$style.header">
    <h1 :class="$style.title">{{ $t("pageTitle") }}</h1>
  </header>
</template>

<style module>
.title {
  font: 1em normal;
  text-align: center;
}

.header {
  border-bottom: 2px solid gray;
  padding: 4px;
}
</style>
