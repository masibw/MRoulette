<template>
  <div id="app">
    <h1 class="title">Roulette</h1>
    <input type="text" v-model="newLabel" />
    <input type="text" v-model="newRate" />
    <form v-on:submit.prevent>
      <button v-on:click="addItem">add</button>
    </form>
    <li v-for="label in dataLabels">{{ label}}</li>
    <li v-for="rate in rates">{{rate}}</li>
    <h2 class="subtitle">アプリ名</h2>
    <pie-chart :chart-data="datacollection"></pie-chart>
  </div>
</template>
<script>
import PieChart from "./PieChart.js";

export default {
  components: {
    PieChart
  },
  mounted() {
    this.fillData();
  },
  data() {
    return {
      newLabel: "",
      newRate: "",
      dataLabels: [],
      rates: [],
      datacollection: null
    };
  },
  methods: {
    addItem: function(event) {
      var item = {
        label: this.newLabel,
        rate: this.newRate
      };
      this.dataLabels.push(item.label);
      this.rates.push(item.rate);
      this.fillData();
    },
    fillData() {
      this.datacollection = {
        labels: this.dataLabels,
        datasets: [
          {
            label: this.dataLabels,
            backgroundColor: "#333",
            data: this.rates
          }
        ]
      };
    }
  }
};
</script>

<style>
</style>
