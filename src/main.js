import Vue from 'vue';

new Vue({
  el: '#app',
  data: {
    answer: '',
    prevAnswer: '',
    includeWa: true,
    includeYou: true,
    includeChu: true,
    includeJikkuri: true,
    includeOtegaru: true,
    animating: false,
    frame: 0,
    tickerId: null,
    candidates: [
      // 和食 じっくり
      {text: '豚の生姜焼き', genre: 0, labor: 1},
      {text: '鶏の照り焼き', genre: 0, labor: 1},
      {text: 'とんかつ', genre: 0, labor: 1},
      {text: 'てんぷら', genre: 0, labor: 1},
      {text: 'からあげ', genre: 0, labor: 1},
      {text: 'チキン南蛮', genre: 0, labor: 1},
      {text: 'サバの味噌煮', genre: 0, labor: 1},
      {text: 'サバの塩焼き', genre: 0, labor: 1},
      {text: '鮭の塩焼き', genre: 0, labor: 1},
      {text: 'きんぴらごぼう', genre: 0, labor: 1},
      {text: 'ひじきの煮物', genre: 0, labor: 1},
      {text: 'おでん', genre: 0, labor: 1},
      {text: '肉じゃが', genre: 0, labor: 1},
      {text: '豆乳鍋', genre: 0, labor: 1},
      {text: 'キムチ鍋', genre: 0, labor: 1},
      {text: 'よせ鍋', genre: 0, labor: 1},
      {text: '豚肉とトマトを卵でとじたやつ', genre: 0, labor: 1},
      {text: '小松菜と油揚げの煮びたし', genre: 0, labor: 1},
      {text: '豚の角煮', genre: 0, labor: 1},
      {text: 'ししゃも', genre: 0, labor: 1},

      // 和食 お手軽
      {text: '牛丼', genre: 0, labor: 0},
      {text: '親子丼', genre: 0, labor: 0},
      {text: '焼きそば', genre: 0, labor: 0},
      {text: '焼きうどん', genre: 0, labor: 0},
      {text: '豚肉と白菜のミルフィーユ鍋', genre: 0, labor: 0},
      {text: 'きのこうどん', genre: 0, labor: 0},
      {text: 'にくそば', genre: 0, labor: 0},
      {text: '和風パスタ', genre: 0, labor: 0},
      {text: 'にゅうめん', genre: 0, labor: 0},
      {text: 'おさしみ', genre: 0, labor: 0},
      {text: '海鮮丼', genre: 0, labor: 0},

      // 洋食 じっくり
      {text: '白身魚のムニエル', genre: 1, labor: 1},
      {text: 'ポテトサラダ', genre: 1, labor: 1},
      {text: 'ハンバーグ', genre: 1, labor: 1},
      {text: 'カレー', genre: 1, labor: 1},
      {text: 'ドライカレー', genre: 1, labor: 1},
      {text: 'ハヤシライス', genre: 1, labor: 1},
      {text: 'カルボナーラ', genre: 1, labor: 1},
      {text: 'オムライス', genre: 1, labor: 1},
      {text: 'グラタン', genre: 1, labor: 1},
      {text: 'ドリア', genre: 1, labor: 1},

      // 洋食 お手軽
      {text: 'ペペロンチーノ', genre: 1, labor: 0},
      {text: 'ナポリタン', genre: 1, labor: 0},
      {text: 'トマトパスタ', genre: 1, labor: 0},

      // 中華 じっくり
      {text: '餃子', genre: 2, labor: 1},
      {text: 'ニラ玉', genre: 2, labor: 1},
      {text: '天津飯', genre: 2, labor: 1},
      {text: '麻婆豆腐', genre: 2, labor: 1},
      {text: '焼売', genre: 2, labor: 1},
      {text: '麻婆茄子', genre: 2, labor: 1},
      {text: '回鍋肉', genre: 2, labor: 1},
      {text: '酢豚', genre: 2, labor: 1},
      {text: '青椒肉絲', genre: 2, labor: 1},
      {text: 'エビチリ', genre: 2, labor: 1},
      {text: '棒々鶏', genre: 2, labor: 1},
      {text: 'よだれ鶏', genre: 2, labor: 1},

      // 中華 お手軽
      {text: 'ラーメン', genre: 2, labor: 0},
      {text: '炒飯', genre: 2, labor: 0},
    ]
  },
  methods: {
    decide() {
      if (this.animating) return;
      this.animating = true;

      this.prevAnswer = this.answer;

      let arr = JSON.parse(JSON.stringify(this.candidates));
      arr = arr.filter(this.isIncluded.bind(this));
      if (arr.length === 0) {
        this.answer = '水';
      } else {
        const idx = Math.floor(Math.random() * arr.length);
        this.answer = arr[idx].text;
      }

      document.getElementById('answer-text').style.top = '-16px';
      document.getElementById('prev-answer-text').style.top = '18px';

      this.frame = 0;
      this.tickerId = setInterval(this.tick.bind(this), 50);
    },
    tick() {
      if (this.frame <= 20) {
        const top = 34/400 * this.frame * this.frame - 16;
        document.getElementById('answer-text').style.top = top + 'px';
        document.getElementById('prev-answer-text').style.top = (top + 34) + 'px';
      } else {
        this.animating = false;
        clearInterval(this.tickerId);
      }
      this.frame++;
    },
    isIncluded(obj) {
      if (!this.includeWa && obj.genre === 0) return false;
      if (!this.includeYou && obj.genre === 1) return false;
      if (!this.includeChu && obj.genre === 2) return false;
      if (!this.includeJikkuri && obj.labor === 1) return false;
      if (!this.includeOtegaru && obj.labor === 0) return false;
      return true;
    }
  },
  computed: {
    recipeUrl() {
      return 'https://www.google.com/search?q=' + this.answer + '+レシピ';
    }
  }
});
