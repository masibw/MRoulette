<template>
  <div>
    <div id="terms">
      <div id="contents">
        <h1>「MRoulette」利用規約</h1>
        <p>この規約は、「MRoulette」運営（以下当サイト）と、利用者様との関係を定めるものです。</p>
        <h2>第一条（本規約への同意）</h2>
        <ol type="1">
          <li>利用者様がサービスを利用することによりこの規約に同意したものとします。</li>
          <li>この規約を当サイトは運営者の判断により、いつでも変更できるものとし、その変更後にもサービスを利用していることにより、改変後の規約にも同意したものとします。</li>
        </ol>
        <h2>第二条（禁止行為）</h2>
        <p>当サイトの利用に際し、当サイト運営は、利用者に対し、次に掲げる行為を禁止します。当サイト運営において、利用者が禁止事項に違反したと認めた場合、利用の一時・永続の停止措置をとることができます。</p>
        <ol type="1">
          <li>当サイトまたは運営に対し不利益を与える行動</li>
          <li>その他当サイト運営が不適切と判断する行為</li>
        </ol>
        <h2>第三条（免責事項）</h2>
        <ol type="1">
          <li>当サイトは、「MRoulette」の利用、内容変更、中断、終了によって生じたいかなる損害についても、一切責任を負いません。</li>
          <li>当サイトは、利用者の本サービスの利用環境について一切関与せず、また一切の責任を負いません。</li>
        </ol>
        <h2>第四条（非個人情報の取り扱いについて）</h2>当サイトでは、サイトの分析と改善のためにGoogle Analyticsを使用しています。その際、データ収集のためにGoogleがお使いのブラウザにcookieを設定したり、読み取ったりする場合があります。また、当サイトをご利用中のwebブラウザはGoogleに特定の非個人情報を自動的に送信します。当サイトはそれらを、サイト利用状況の把握やユーザーの傾向をコンテンツとして公開する用途で使用する可能性があります。ユーザーは当サイトにアクセスすることで上記方法及び目的に同意・許可したものとみなします。
        <h2>第五条（お問い合わせ）</h2>
        <p>何か当サイトについてのご質問やご連絡がある場合は以下のtwitterアカウントまでご連絡ください。</p>
        <p>@ masi19bw</p>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          class="twitter-share-button"
          data-show-count="false"
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
p {
  color: #333;
}
h2 {
  margin-top: 3%;
  margin-bottom: 3%;
}
#terms {
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