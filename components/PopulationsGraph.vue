<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  type ChartData,
  type ChartDataset,
  LineElement,
  PointElement,
  type ChartOptions,
} from "chart.js";
import type { PopulationCompositions } from "~/domain_common/entity/population";

interface Props {
  populations: PopulationCompositions;
}
const props = defineProps<Props>();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
);

const chartData = computed<ChartData<"line">>(() => {
  // 1. Collect all years, and create labels.

  // Collect all years, and remove duplicated years.
  const years = new Set<number>();
  for (const population of props.populations) {
    for (const point of population.data) {
      years.add(point.year);
    }
  }

  // Sort.
  const yearsSorted = Array.from<number>(years);
  yearsSorted.sort();

  // Create index.
  const yearsToIndex: Record<number, number> = {};
  for (let i = 0; i < yearsSorted.length; i++) {
    yearsToIndex[yearsSorted[i]] = i;
  }

  // Create labels.
  const labels = yearsSorted.map((v) => v.toString());

  // 2. Create datasets.

  const datasets: ChartDataset<"line">[] = [];
  props.populations.forEach((population, populationIndex) => {
    // Align points to deal with missing data.
    const data: number[] = Array(yearsSorted.length).fill(NaN);
    for (const point of population.data) {
      data[yearsToIndex[point.year]] = point.value;
    }

    // Create ChartDataset
    datasets.push({
      label: population.label,
      data: data,
      borderColor: "rgb(25, 25, 25)",
      tension: 0.1,
      borderDash: [30 / populationIndex, 10],
      pointBorderWidth: 2,
      pointHoverBorderWidth: 3,
    });
  });

  return {
    labels: labels,
    datasets: datasets,
  };
});

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      align: "start",
      position: "right",
    },
  },
};
</script>
