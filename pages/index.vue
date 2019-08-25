<template>
  <div id="container">
    <div id="app">
      <div id="roulette">
        <img class="pin" src="~/assets/pin-min.png" v-show="!pinRotate" alt="pin" />
        <img class="pin" src="~assets/pin-anime.gif" v-show="pinRotate" alt="rotating pin" />
        <pie-chart id="pieChart" :chart-data="datacollection" :options="chartOptions"></pie-chart>
      </div>
      <div id="sideMenu">
        <p id="label">label</p>
        <p id="rate">rate(半角数字)</p>
        <form v-on:submit.prevent>
          <ul v-for="(item) in items" :key="item.id" class="no-gutters">
            <li>
              <label>
                <input
                  type="text"
                  class="textbox label"
                  v-model="item.label"
                  placeholder="名称を入力してください"
                  required
                />
              </label>
              <label>
                <input
                  type="text"
                  pattern="\d+"
                  class="textbox number"
                  v-model="item.rate"
                  placeholder="比率"
                  required
                />
              </label>
            </li>
          </ul>
          <button class="btn-flat btn-blue" style="width:49%;" @click="onAddItems()">項目追加</button>
          <button class="btn-flat btn-red" style="width:49%;" @click="onDeleteItems()">項目削除</button>
          <button
            class="btn-flat btn-green"
            style="display:block; width:99%; margin-top:3px;"
            @click="fillData()"
            v-show="!isSet"
          >データをセット</button>
          <button
            class="btn-flat btn-green"
            style="display:block; width:99%; margin-top:3px;"
            @click="onStartRoulette()"
            v-show="isSet"
          >スタート！</button>
        </form>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          class="twitter-share-button"
          data-show-count="false"
          data-text="webで簡単ルーレットを使ってなかなか決まらないものもパパッと決めちゃおう！"
        >Tweet</a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
      <transition name="modal">
        <div id="overlay" v-show="showContent" v-on:click="closeModal">
          <div id="content" @click.stop>
            <div id="resultText">
              <p>選ばれたのは</p>
              <p id="result">「{{picked}}」</p>
              <p>でした!!!</p>
            </div>
            <button id="btn-close" class="btn-flat btn-blue" v-on:click="closeModal">Close</button>
          </div>
        </div>
      </transition>
    </div>
    <div id="footer">
      <nuxt-link to="terms" class="link" style="font-size:1.5em; color:#333;">利用規約</nuxt-link>
      <p>copyright 2019 mesimasi</p>
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
  layout: "navbar",
  mounted() {
    this.fillData();
    this.isSet = false;
    this.pinRotate = false;
  },
  data() {
    return {
      datacollection: null,
      isActive: false,
      showContent: false,
      picked: "",
      isSet: false,
      pinRotate: false,
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
        legend: {
          display: false
        },
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
        "#1e90ff",
        "#00ff7f",
        "#ffd700",
        "#ff1e1e",
        "#89ff14",
        "#0984e3",
        "#b8d200",
        "#ff00ff",
        "#ffff0a"
      ]
    };
  },
  methods: {
    fillData() {
      pieChart.style.transform = "rotate(" + 0 + "deg)";
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
        colorNo: Math.round(Math.random() * 9),
        label: "",
        rate: 1
      });
      this.isSet = false;
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
      this.isSet = false;
    },
    onStartRoulette() {
      this.pinRotate = true;
      let speed = 10;
      let num = this.items.length;
      const timeOut = 4000;
      let sumRate = 0;
      let i = 0;
      this.picked = "";
      pieChart.style.transform = "rotate(" + 0 + "deg)";
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
        me.pinRotate = false;
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
$red: #ec0000;
$green: #00883a;
$blue: #0179af;

@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP|Roboto&display=swap");
p {
  font-size: 15px;
}

#container {
  font-family: "Roboto", sans-serif;
  font-family: "Noto Sans JP", sans-serif;
}

.link {
  text-decoration: none;
}

#app {
  max-width: 90%;
  margin: auto;
}

ul {
  list-style: none;
}

#roulette {
  position: relative;
  width: 100%;
  margin: auto;
  .pin {
    z-index: 1;
    position: absolute;
    width: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
}
#sideMenu {
  width: 100%;
  margin: auto;
  p {
    display: inline-block;
    text-align: center;
    font-size: 15px;
  }
  #label {
    width: 74%;
  }
  #rate {
    width: 20%;
  }
}
.twitter-share-button {
  margin: 5px;
}

#pieChart {
  margin-top: 1rem;
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
  display: -webkit-box;
  display: -ms-flex;
  -ms-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  -ms-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  transition: all 0.8s ease;
  #content {
    z-index: 2;
    width: 80%;
    height: 30%;
    padding: 1em;
    background: #fff;
    transition: all 0.8s ease;
    position: relative;
    p {
      text-align: center;
    }
    #result {
      font-size: 2em;
    }
    #resultText {
      margin: 1em;
    }
  }
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
    border: none;
    border-bottom: 2px solid #333;
    height: 40px;
    font-size: 22px;
    text-align: center;
  }
  .label {
    width: 75%;
  }

  .number {
    width: 20%;
  }
  .textbox:focus {
    border-bottom: 2px solid #3eb370;
    outline: none;
    transition: 0.5s;
  }
}
#footer {
  color: #333;
  text-align: center;
  p {
    text-align: right;
    margin: 5px;
  }
}
//ボタン
.btn-flat {
  display: inline-block;
  width: 160px;
  padding: 0.8em;
  text-align: center;
  text-decoration: none;
  color: #333;
  border-radius: 3px;
  transition: 0.4s;
  font-size: 18px;
  background-color: #fff;
}
.btn-flat:hover {
  color: #fff;
}
.btn-red {
  color: $red;
  border: solid 2px $red;
}
.btn-red:hover {
  background-color: $red;
  transition: 0.5s;
}
.btn-blue {
  color: $blue;
  border: solid 2px $blue;
}
.btn-blue:hover {
  background-color: $blue;
  transition: 0.5s;
}
.btn-green {
  color: $green;
  border: solid 2px $green;
}
.btn-green:hover {
  background-color: $green;
  transition: 0.5s;
}

#btn-close {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  margin-bottom: 1em;
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
  #overlay {
    #content {
      width: 50%;
      height: 30%;
      #result {
        font-size: 3em;
      }
    }
  }
}
</style>
