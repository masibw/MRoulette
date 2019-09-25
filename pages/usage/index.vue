<template>
  <div>
    <div id="usage">
      <div id="contents">
        <h1 style="margin-bottom:3%;">MRouletteとはWebで気軽に使えるルーレット（抽選）アプリです。</h1>
        <h2>操作方法</h2>
        <ol type="1">
          <li>ルーレットのタイトルを入力します。（例：今日の晩御飯）</li>
          <li>
            抽選の候補となるものを入力します。（例：寿司、カレー、ピザ、ハンバーガー）
            <br />２つ以上入力する場合は「項目追加」ボタンを押してください。
          </li>
          <li>項目を追加しすぎた場合は項目横の「マイナス」ボタンで削除することができます。</li>
          <li>もし項目ごとの当選確率を設定したい場合は比率を設定します。</li>
          <li>「抽選後に選ばれたものを削除する」にチェックを入れることで選ばれた項目を自動で削除します。（使用例：役員などを複数名決める場合）</li>
          <li>「データをセット」を押すことでルーレットに項目が登録され、「スタート」ボタンに変化します。</li>
          <img src="~/assets/usage1.jpg" style="max-width:100%;height:auto;" alt="usageImage1" />
          <li>「スタート」ボタンを押すことでルーレットが始まり、結果が画面に表示されます。</li>
          <li>結果画面でツイートボタンを押すことでTwitterに抽選タイトルと結果を投稿することができます。</li>
          <img
            src="~/assets/usage2.jpg"
            style="max-width:100%;height:auto; border:1px solid #333;"
            alt="usageImage2"
          />
        </ol>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          class="twitter-share-button"
          data-show-count="false"
          data-text="webで簡単ルーレットを使ってなかなか決まらないものもパパッと決めちゃおう！"
        >Tweet</a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "navbar"
};
</script>

<style lang="scss">
body {
  font-size: 16px;
}
p {
  color: #333;
  font-size: 1em;
}
h2 {
  margin-top: 3%;
  margin-bottom: 3%;
}
#usage {
  margin-top: 10px;
  position: relative;
  #contents {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    width: 80%;
  }
}
</style>