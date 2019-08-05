<template>
  <div id="app">
    <h1 class="title">Roulette</h1>
    <div id="roulette">
      <pie-chart id="pieChart" :chart-data="datacollection" :options="chartOptions"></pie-chart>
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
        <button @click="onDeleteItems()">onDeleteItems()</button>
        <button @click="onStartRoulette()">Start!</button>
      </form>
    </div>
    <div id="overlay" v-show="showContent" v-on:click="closeModal">
      <div id="content">
        <p>選べれたのは「{{picked}}」</p>
        <button v-on:click="closeModal">close</button>
      </div>
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
      isActive: false,
      showContent: false,
      picked: "",
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
    },
    onDeleteItems() {
      if (this.items.length > 1) {
        this.items.splice(this.items.length - 1, 1);
      }
    },
    onStartRoulette() {
      let speed = 10;
      const num = this.items.length;
      const timeOut = 4000;
      const section = 360 / num;
      const pieAngle = 360;
      var stopAngle = Math.floor(Math.random() * pieAngle);
      const me = this;
      let angle = stopAngle;
      let stopNumber;
      let i;
      for (i = 1; i <= num; i++) {
        if (section * (i - 1) + 1 <= stopAngle && stopAngle <= section * i) {
          stopNumber = i;
          this.picked = me.items[stopNumber - 1].label;
          break;
        }
      }

      let rotate = setInterval(function() {
        pieChart.style.transform = "rotate(" + angle + "deg)";
        angle += speed;
      }, 5);

      var timeoutFunction = setTimeout(function() {
        clearInterval(rotate);
        //TODO針

        pieChart.style.transform = "rotate(-" + stopAngle + "deg)";
        me.openModal();
      }, timeOut);
    },
    openModal() {
      this.showContent = true;
    },
    closeModal() {
      this.showContent = false;
    }
  }
};
</script>

<style lang="scss">
:root {
  --angle: 30;
  --speed: 10;
  --stopAngle: 50;
  --bg: blue;
}
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

#overlay {
  z-index: 1;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: #fff;
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
