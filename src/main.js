const app = new Vue({
  el: "#app",
  data: {
    items: [],
    data: {},
    query: ""
  },
  computed: {
    filteredItems: () => {
      var self = this;
      return this.items.filter(item => {
        return item.name.toLowerCase().indexOf(self.query.toLowerCase()) >= 0;
      });
    }
  },
  mounted() {
    self = this;
    this.$http
      .get(
        "https://api.hh.ru/vacancies?text=javascript&area=160&per_page=500&order_by=publication_time"
      )
      .then(response => {
        self.items = response.data.items;
        self.data = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    isDesign: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/дизайн/i || /UI/i || /UX/i) == -1) {
        return false;
      }
      return true;
    },
    isNode: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/Node/i || /node/i) == -1) {
        return false;
      }
      return true;
    },
    isMongo: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/Mongo/i || /mongo/i) == -1) {
        return false;
      }
      return true;
    },
    isPHP: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/php/i || /PHP/i) == -1) {
        return false;
      }
      return true;
    },
    isHTML: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/html/i) == -1) {
        return false;
      }
      return true;
    },
    isCSS: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/css/i || /CSS/i) == -1) {
        return false;
      }
      return true;
    },
    isSQL: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/sql/i || /SQL/i) == -1) {
        return false;
      }
      return true;
    },
    isJS: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/javascript/gi || /js/gi || /script/gi) == -1) {
        return false;
      }
      return true;
    },
    isJQ: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/jquery/i) == -1) {
        return false;
      }
      return true;
    },
    isVue: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/vue/i) == -1) {
        return false;
      }
      return true;
    },
    isAngular: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/angular/i) == -1) {
        return false;
      }
      return true;
    },
    isReact: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/react/i) == -1) {
        return false;
      }
      return true;
    },
    isTS: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/typescript/i) == -1) {
        return false;
      }
      return true;
    },
    isPython: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/python/i) == -1) {
        return false;
      }
      return true;
    },
    isBootstrap: item => {
      var str =
        item.snippet.requirement + item.snippet.responsibility + item.name;
      if (str.search(/bootstrap/i) == -1) {
        return false;
      }
      return true;
    },
    map: item => {
      return item.address === null
        ? ""
        : `https://yandex.kz/maps/162/almaty/?ll=${item.address.lng}%2C${item
            .address.lat}&z=18&mode=whatshere&whatshere%5Bpoint%5D=${item
            .address.lng}%2C${item.address.lat}&whatshere%5Bzoom%5D=18`;
    },
    salary: item => {
      if (item.salary === null) {
        return `\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430`;
      }
      var salary =
        item.salary.to === null
          ? ""
          : `\u0434\u043E ${Math.floor(item.salary.to / 5.6)}`;
      return `\u043E\u0442 ${Math.floor(item.salary.from / 5.6)}${salary} RUB`;
    },
    city: item => {
      return item.address === null
        ? `\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D`
        : `${item.address.street} ${item.address.building === null
            ? ""
            : item.address.building}`;
    }
  }
});
