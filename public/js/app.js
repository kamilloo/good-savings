/* global Handlebars, prompt */

var app = new Vue({
  el: '#app',

  data: {
    message: 'Hello Vue!',
    changeMessage: '',
  },
  methods: {
    greet: function () {
      fetch('https://api.npms.io/v2/search?q=vue')
        .then((response) => response.json())
        .then((data) => console.log(data.total))
        .then(() => {
          var chartSet = [
            { time: '2019-04-11', value: 84.01 },
            { time: '2019-04-12', value: 96.63 },
            { time: '2019-04-13', value: 76.64 },
            { time: '2019-04-14', value: 81.89 },
            { time: '2019-04-15', value: 74.43 },
            { time: '2019-04-16', value: 80.01 },
            { time: '2019-04-17', value: 96.63 },
            { time: '2019-04-18', value: 76.64 },
            { time: '2019-04-19', value: 81.89 },
            { time: '2019-04-20', value: 74.43 },
          ];

          let chartContainer = document.getElementById('chart');
          const chart = LightweightCharts.createChart(chartContainer, {
            width: 400,
            height: 300,
          });

          const lineSeries = chart.addLineSeries();
          lineSeries.setData(chartSet);
        });
    },
    changeOnClick: function () {
      this.changeMessage = 'new-message';
    },
  },
});

(function () {
  app.greet();
})();
