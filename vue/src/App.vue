<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import "../lit-components.js";

const primary = ref(null);
const secondary = ref(null);
const lastClick = ref("пока ничего.");

const handlePrimary = () => (lastClick.value = "primary");
const handleSecondary = () => (lastClick.value = "secondary");

onMounted(() => {
  primary.value?.addEventListener("button-click", handlePrimary);
  secondary.value?.addEventListener("button-click", handleSecondary);
});

onBeforeUnmount(() => {
  primary.value?.removeEventListener("button-click", handlePrimary);
  secondary.value?.removeEventListener("button-click", handleSecondary);
});
</script>

<template>
  <div class="page">
    <div class="card">
      <hello-greeting
        name="Vue"
        message="Lit-компоненты работают в шаблонах Vue."
      ></hello-greeting>

      <div class="row">
        <lit-button ref="primary" label="Primary"></lit-button>
        <lit-button
          variant="secondary"
          ref="secondary"
          label="Secondary"
        ></lit-button>
      </div>

      <div class="log">Последний клик: {{ lastClick }}</div>
    </div>
    <footer>
      <cookie-alert />
    </footer>
  </div>
</template>

<style>
:root {
  font-family: system-ui, -apple-system, Segoe UI, sans-serif;
  background: #f6f8fb;
  color: #1f2933;
}

.page {
  min-height: 100vh;
  display: grid;
  place-content: center;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(15, 107, 255, 0.08);
  width: 560px;
  max-width: 90vw;
}

.row {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 16px 0 8px;
}

.log {
  margin-top: 12px;
  color: #0f6bff;
  font-weight: 600;
}
</style>
