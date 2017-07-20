import Vue from 'vue'
import VueAxios from 'vue-axios'
import Axios from 'axios'

Vue.use(VueAxios, Axios)

const app = new Vue({
    el: '#app',
    data: {
        items: [],
        data: {}
    },
    mounted() {
        self = this;
        this.$http.get(
            "https://api.hh.ru/vacancies?text=html+css+javascript+OR+node+OR+angular+OR+react+OR+vue+OR+typescript+OR+jquery+NOT+python+NOT+java+NOT+asp+NOT+sharepoint+NOT+php&area=160&per_page=500&order_by=publication_time"
        ).then(function (response) {
            self.items = response.data.items;
            self.data = response.data;
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        isDesign: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/дизайн/i || /UI/i || /UX/i) == -1) {
                return false;
            }
            return true;
        },
        isNode: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/Node/i || /node/i) == -1) {
                return false;
            }
            return true;
        },
        isMongo: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/Mongo/i || /mongo/i) == -1) {
                return false;
            }
            return true;
        },
        isPHP: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/php/i || /PHP/i) == -1) {
                return false;
            }
            return true;
        },
        isHTML: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/html/i) == -1) {
                return false;
            }
            return true;
        },
        isCSS: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/css/i || /CSS/i) == -1) {
                return false;
            }
            return true;
        },
        isSQL: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/sql/i || /SQL/i) == -1) {
                return false;
            }
            return true;
        },
        isJS: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/javascript/ig || /js/ig || /JS/ig) == -1) {
                return false;
            }
            return true;
        },
        isJQ: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/jquery/i) == -1) {
                return false;
            }
            return true;
        },
        isVue: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/vue/i) == -1) {
                return false;
            }
            return true;
        },
        isAngular: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/angular/i) == -1) {
                return false;
            }
            return true;
        },
        isReact: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/react/i) == -1) {
                return false;
            }
            return true;
        },
        isTS: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/typescript/i) == -1) {
                return false;
            }
            return true;
        },
        isPython: (item) => {
            var str = item.snippet.requirement + item.snippet.responsibility;
            if (str.search(/python/i) == -1) {
                return false;
            }
            return true;
        },
        map: (item) => {
            return item.address === null ? '' : 'https://yandex.kz/maps/162/almaty/?ll=' + item.address.lng + '%2C' + item.address.lat + '&z=18&mode=whatshere&whatshere%5Bpoint%5D=' + item.address.lng + '%2C' + item.address.lat + '&whatshere%5Bzoom%5D=18';
        },
        salary: (item) => {
            if (item.salary === null) {
                return 'не указана';
            }
            var salary = item.salary.to === null ? '' : ' до ' + item.salary.to;
            return ' от ' + item.salary.from + salary + ' ' + item.salary.currency;
        },
        city: (item) => {
            return item.address === null ? 'не указан' : item.address.street + ' ' + (item.address.building === null ? '' : item.address.building);
        }
    }
});
