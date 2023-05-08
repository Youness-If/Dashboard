require('./lib/chart.min.js');
require('./lib/jquery-3.6.4-min');
// reading sensors data
function loadElement() {
    $('#level').load("IO.htm #IO_level");
    $('#flow').load("IO.htm #IO_flow");
    setTimeout(loadElement, 200);
}
loadElement();
//ploting sensors data
Xaxe = [];
Yaxe1 = [];
Yaxe2 = [];
const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Xaxe,
        datasets: [{
            label: 'Water Tank Level',
            data: Yaxe1,
            backgroundColor: 'rgba(30,144,255,0.5)',
            borderColor: 'rgba(30,144,255,0.5)',
            borderWidth: 1
        },
        {
            label: 'Water Flow Rate',
            data: Yaxe2,
            backgroundColor: 'rgba(251,192,147,1)',
            borderColor: 'rgba(251,192,147,1)',
            borderWidth: 1
        },
        ],
        options: {
            reponsive: true,
            layout: {
                padding: 15
            }
        }
    },
    options: {
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Level'
                }
            }]
        }
    }
});
var LEVEL_value;
var FLOW_value;
var FillValve_Rate;
var DrainValve_Rate;
var HOUR_value;
var MINUTE_value;
var SECOND_value;
function loadValues() {
    $.get("IO.htm", function (data) {
        LEVEL_value = $(data).filter("#IO_level").html();
        FLOW_value = $(data).filter("#IO_flow").html();
        FillValve_Rate = $(data).filter("#IO_FillvalveRate").html();
        DrainValve_Rate = $(data).filter("#IO_DrainvalveRate").html();
        HOUR_value = $(data).filter("#IO_HOUR").html();
        MINUTE_value = $(data).filter("#IO_MINUTE").html();
        SECOND_value = $(data).filter("#IO_SECOND").html();
    });
}
function getTime() {
    var TIME_value = HOUR_value + ":" + MINUTE_value + ":" + SECOND_value;
    return TIME_value;
}
function updateChart() {
    loadValues();
    Xaxe.push(getTime());
    Yaxe1.push(LEVEL_value);
    Yaxe2.push(FLOW_value);
    chart.data.labels = Xaxe;
    chart.data.datasets[0].data = Yaxe1;
    chart.data.datasets[1].data = Yaxe2;
    chart.update();
    if (Yaxe1.length > 50) {
        Yaxe1.shift();
        Yaxe2.shift();
        Xaxe.shift();
    }
    setTimeout(updateChart, 200);
}
updateChart();