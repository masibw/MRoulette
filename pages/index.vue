<template>
  <div id="container">
    <div id="app">
      <div id="roulette">
        <p id="title" v-if="!title.trim().length==0">{{title}}についてのルーレット</p>
        <img class="pin" src="~/assets/pin-min.png" v-show="!pinRotate" alt="pin" />
        <img class="pin" src="~assets/pin-anime.gif" v-show="pinRotate" alt="rotating pin" />
        <pie-chart id="pieChart" :chart-data="datacollection" :options="chartOptions"></pie-chart>
      </div>
      <div id="sideMenu">
        <!-- submitによってページリロードがされない submit.prevent -->
        <form v-on:submit.prevent>
          <div class="titleWrap">
            <label for="titleReader" class="titleLabel" v-bind:class="{focus:focusTitle}">Title</label>
            <input
              type="text"
              @focus="focusTitle=true"
              id="titleReader"
              v-model="title"
              placeholder="Insert Title here"
            />
          </div>
        </form>
        <p id="label">label</p>
        <p id="rate">rate(半角数字)</p>
        <form v-on:submit.prevent>
          <ul v-for="(item,index) in items" :key="item.id" class="no-gutters">
            <li>
              <label>
                <input
                  type="text"
                  class="textbox label"
                  v-model="item.label"
                  placeholder="名称を入力してください"
                  required
                  v-on:focus="isSet=false;"
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
                  v-on:focus="isSet=false;"
                />
              </label>
              <a v-on:click="onDeleteItemOne(index)">
                <img
                  src="~/assets/deleteButton.png"
                  style="background-color:#fff; vertical-align:middle; width:42px; height:auto; margin-left:10px; cursor:pointer;"
                  alt="deleteButton"
                />
              </a>
            </li>
          </ul>
          <button
            class="btn-flat btn-blue"
            style="width:99%; margin-top:0.3em;"
            @click="onAddItems()"
          >項目追加</button>
          <button
            class="btn-flat btn-green"
            style="display:block; width:99%; margin-top:0.3em;"
            @click="fillData()"
            v-show="!isSet"
          >データをセット</button>
          <button
            class="btn-flat btn-green"
            style="display:block; width:99%; margin-top:0.3em;"
            @click="onStartRoulette()"
            v-show="isSet"
          >スタート！</button>
          <div class="checkBoxList">
            <input type="checkbox" id="deletePickedItem" v-model="deletePickedItem" />
            <label style="margin:1em;" for="deletePickedItem">抽選後に選ばれたものをリストから削除する</label>
          </div>
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
              <p v-if="!title.trim().length==0 " id="resultTitle">{{title}}に</p>
              <p>選ばれたのは</p>
              <p id="result">「{{picked}}」</p>
              <p>でした!!!</p>
            </div>
            <a v-on:click="createTwitterData" id="btnResultTweet">
              <img src="@/static/Twitter_Logo_WhiteOnBlue.png" />
            </a>

            <a v-on:click="createTwitterData" id="btnResultTweetMobile">
              <img src="@/static/Twitter_Logo_WhiteOnBlue.png" />
            </a>
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
      twiUrl: " ",
      title: " ",
      focusTitle: false,
      deletePickedItem: false,
      datacollection: {},
      isActive: false,
      showContent: false,
      picked: " ",
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
    createTwitterData() {
      var url = encodeURIComponent(location.href);
      if (this.title.trim().length == 0) {
        var titletxt = "";
      } else {
        var titletxt = "に選ばれたのは";
      }
      var txt = this.title + titletxt + this.picked + "でした！";
      var hashtags = "MRoulette";
      this.twiUrl =
        "https://twitter.com/share?url=" +
        url +
        "&text=" +
        txt +
        "&hashtags=" +
        hashtags +
        "&count=none&lang=ja";
      window.open().location.href = this.twiUrl;
    },
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
        label: " ",
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
    onDeleteItemOne(index) {
      if (this.items.length > 1) {
        this.items.splice(index, 1);
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
      this.picked = " ";
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
        if (me.deletePickedItem != false && me.items.length > 1) {
          me.items.splice(stopNumber, 1);
        }
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

::-webkit-scrollbar {
  display: none;
  -webkit-appearance: none;
}
body {
  font-size: 16px;
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
  #title {
    font-size: 1.8em;
    text-align: center;
  }
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
  .titleWrap {
    position: relative;
    width: 100%;
    height: 4em;
    margin: 0 auto;
    .titleLabel {
      position: absolute;
      top: -2px;
      left: 10px;
      font-size: 1em;
      color: #a0a0a0;
      transition: all 0.25s ease;
      z-index: 1;
      // titleLabel.focusのこと
    }
    .focus {
      top: -25px;
      left: 5px;
      font-size: 0.8em;
      color: #333;
    }
    #titleReader {
      position: relative;
      display: block;
      width: 100%;
      margin-top: 50px;
      padding: 15x;
      border: none;
      border-radius: 5px;
      font-size: 1.5em;
      color: #333;
      outline: none;
      border-bottom: solid 1px #333;
    }
  }

  .checkBoxList {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  p {
    display: inline-block;
    text-align: center;
    font-size: 15px;
  }
  #label {
    width: 60%;
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
    height: 40%;
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
    #resultTitle {
      font-size: 1.8em;
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
    width: 60%;
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
#btnResultTweet {
  position: absolute;
  bottom: 0;
  margin-bottom: 1em;
  img {
    width: 32px;
    height: 32px;
  }
}
#btnResultTweetMobile {
  position: absolute;
  bottom: 0;
  margin-bottom: 1em;
  img {
    width: 32px;
    height: 32px;
  }
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
@media (max-width: 955px) {
  #btnResultTweet {
    display: none;
  }
}
@media (min-width: 955px) {
  #btnResultTweetMobile {
    display: none;
  }
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
    padding: 5% 0 5% 5%;
  }
  #btnResultTweet {
    position: absolute;
    bottom: 0;
    margin-bottom: 1em;
  }
  #overlay {
    #content {
      width: 50%;
      height: 40%;
      #result {
        font-size: 3em;
      }
    }
  }
}

/* Base for label styling */
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: -9999px;
}
[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 1.95em;
  cursor: pointer;
}

/* checkbox aspect */
[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.15em;
  width: 1.25em;
  height: 1.25em;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}
/* checked mark aspect */
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  content: "\2713\0020";
  position: absolute;
  top: 0.15em;
  left: 0.22em;
  font-size: 1.3em;
  line-height: 0.8;
  color: #09ad7e;
  transition: all 0.2s;
  font-family: "Lucida Sans Unicode", "Arial Unicode MS", Arial;
}
/* checked mark aspect changes */
[type="checkbox"]:not(:checked) + label:after {
  opacity: 0;
  transform: scale(0);
}
[type="checkbox"]:checked + label:after {
  opacity: 1;
  transform: scale(1);
}
/* accessibility */
[type="checkbox"]:checked:focus + label:before,
[type="checkbox"]:not(:checked):focus + label:before {
  border: 2px dotted blue;
}

/* hover style just for information */
label:hover:before {
  border: 2px solid #4778d9 !important;
}
</style>
