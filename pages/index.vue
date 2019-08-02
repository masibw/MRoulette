<template>
  <div id="app">
    <h1 class="title">Roulette</h1>
    <div id="roulette">
      <pie-chart :chart-data="datacollection" :options="chartOptions"></pie-chart>
    </div>
    <div id="sideMenu">
      <p>label 比率</p>
      <form v-on:submit.prevent>
        <ul v-for="(item) in items" :key="item.id" class="no-gutters">
          <li>
            <input v-model="item.label" />
            <input v-model="item.rate" />
          </li>
        </ul>
        <button @click="fillData()">fillData()</button>
        <button @click="onAddItems()">onAddItems()</button>
        <button>Start!</button>
      </form>
    </div>
  </div>
</template>
<script>
import PieChart from "./PieChart.js";
import "chartjs-plugin-labels";

export default {
  components: {
    PieChart
  },
  mounted() {
    this.fillData();
  },
  data() {
    return {
      datacollection: null,
      items: [
        {
          colorNo: 0,
          label: "edit me",
          rate: 1
        }
      ],
      chartOptions: {
        plugins: {
          labels: [
            {
              render: "label",
              fontSize: 32,
              fontStyle: "bold",
              fontColor: "#333"
            }
          ]
        }
      },
      datas: [],
      graphColors: [],
      labels: [],
      baseColors: [
        "#ff7675",
        "#fd79a8",
        "#fdcb6e",
        "#ffeaa7",
        "#00b894",
        "#55efc4",
        "#0984e3",
        "#74b9ff",
        "#a29bfe",
        "#b2bec3"
      ]
    };
  },
  methods: {
    fillData() {
      this.setChartParam();
      this.datacollection = {
        labels: this.labels,
        datasets: [
          {
            data: this.datas,
            label: this.labels,
            backgroundColor: this.graphColors
          }
        ]
      };
    },
    onAddItems() {
      this.items.push({
        colorNo: this.items.length,
        label: "",
        rate: 1
      });
    },
    setChartParam() {
      this.datas = [];
      this.graphColors = [];
      this.labels = [];

      for (let i = 0; i < this.items.length; i++) {
        this.datas.push(this.items[i].rate);
        var addColor = this.baseColors[this.items[i].colorNo];
        this.graphColors.push(addColor);
        var addLabel = this.items[i].label;
        this.labels.push(addLabel);
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  max-width: 90%;
  margin: auto;
  border: 1px solid #333;
}

ul {
  list-style: none;
}

#roulette {
  width: 100%;
  margin: auto;
}
#sideMenu {
  width: 100%;
  margin: auto;
}

@media (min-width: 768px) {
  #roulette {
    width: 45%;
    margin: auto;
  }
  #roulette,
  #sideMenu {
    vertical-align: top;
    display: inline-block;
  }
  #sideMenu {
    width: 45%;
    padding: 5%;
  }
}
</style>
