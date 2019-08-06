<template>
  <div id="container">
    <div id="navbar">
      <h1 class="title">Roulette</h1>
    </div>
    <div id="app">
      <div id="roulette">
        <pie-chart id="pieChart" :chart-data="datacollection" :options="chartOptions"></pie-chart>
      </div>
      <div id="sideMenu">
        <p id="label">label</p>
        <p id="rate">比率</p>
        <form v-on:submit.prevent>
          <ul v-for="(item) in items" :key="item.id" class="no-gutters">
            <li>
              <input
                type="text"
                class="textbox label"
                v-model="item.label"
                placeholder="名称を入力してください"
                required
              />
              <input
                type="text"
                pattern="\d+"
                class="textbox number"
                v-model="item.rate"
                placeholder="比率を入力してください(半角数字)"
                required
              />
            </li>
          </ul>
          <button class="btn-flat" @click="fillData()" v-show="!isSet">fillData()</button>
          <button class="btn-flat" @click="onAddItems()">onAddItems()</button>
          <button class="btn-flat" @click="onDeleteItems()">onDeleteItems()</button>
          <button class="btn-flat btn-green" @click="onStartRoulette()" v-show="isSet">Start!</button>
        </form>
      </div>
      <transition name="modal">
        <div id="overlay" v-show="showContent" v-on:click="closeModal">
          <div id="content" @click.stop>
            <p>選ばれたのは「{{picked}}」でした!!!</p>
            <button v-on:click="closeModal">close</button>
          </div>
        </div>
      </transition>
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
    this.isSet = false;
  },
  data() {
    return {
      datacollection: null,
      isActive: false,
      showContent: false,
      picked: "",
      isSet: false,
      items: [
        {
          colorNo: 0,
          label: "edit me",
          rate: 1,
          rangeBottom: 0,
          rangeTop: 0
        }
      ],
      chartOptions: {
        plugins: {
          labels: [
            {
              render: "label",
              fontSize: 16,
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
      this.isSet = true;
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
      let num = this.items.length;
      const timeOut = 4000;
      let sumRate = 0;
      let i = 0;
      this.picked = "";
      for (i = 0; i < this.items.length; i++) {
        sumRate += parseInt(this.items[i].rate);
      }
      const section = 360 / sumRate;
      for (i = 0; i < this.items.length; i++) {
        if (i == 0) {
          this.items[i].rangeBottom = 1;
          this.items[i].rangeTop = this.items[i].rate * section;
        } else {
          this.items[i].rangeBottom = this.items[i - 1].rangeTop + 1;
          this.items[i].rangeTop =
            this.items[i - 1].rangeTop + this.items[i].rate * section;
        }
      }
      const pieAngle = 360;
      var stopAngle = Math.floor(Math.random() * pieAngle);
      const me = this;
      let angle = stopAngle;
      let stopNumber = 0;
      for (i = 0; i < num; i++) {
        if (
          stopAngle >= this.items[i].rangeBottom &&
          this.items[i].rangeTop >= stopAngle
        ) {
          stopNumber = i;
          this.picked = this.items[stopNumber].label;

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
        setTimeout(me.openModal, 500);
        me.num = 0;
        me.isSet = false;
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
#navbar {
  background-color: #333;
  height: 10vh;
  width: 100vw;
  color: #fff;
}
.btn-flat {
  display: block;
  width: 160px;
  padding: 0.8em;
  text-align: center;
  text-decoration: none;
  color: #333;
  border-radius: 3px;
  transition: 0.4s;
}
.btn-flat:hover {
  color: #fff;
}
#app {
  max-width: 90%;
  margin: auto;
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
  p {
    display: inline-block;
    text-align: center;
  }
  #label {
    width: 74%;
  }
  #rate {
    width: 20%;
  }
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
  transition: all 0.8s ease;
}
#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: #fff;
  transition: all 0.8s ease;
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}
ul {
  padding: 0;
}
li {
  margin: 10px;
  .textbox {
    border-radius: 5%;

    height: 50px;
  }
  .label {
    width: 75%;
  }

  .number {
    width: 20%;
  }
  .textbox:focus {
    border: 1px solid #4c3cda;
    outline: none;
    box-shadow: 0 0 5px 1px rgba(44, 101, 192, 0.5);
  }
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
