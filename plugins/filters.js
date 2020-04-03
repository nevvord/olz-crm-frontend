import Vue from 'vue'
import moment from 'moment'
Vue.use(moment)

Vue.filter('formatDate', value => {
  if (value) {
    return moment(String(value)).lang('ru').format('Do MMMM YYYY, LTS')
  }
})