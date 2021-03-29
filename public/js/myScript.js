

    toggleValue = function toggle() {
        $(document).ready(function(){
    $("button").change(function(){
        $("#toggleId").removeClass("label-success");
    });
        });
    }


    function drawCurrent() {
        var c3 = document.getElementById("canvas-current1");
        var ctx = c3.getContext("2d");

        ctx.fillStyle = "white";
        ctx.font = "100px Georgia";
        ctx.fillText("2", 30, 90);
        ctx.font = "30px Verdana";

        var c4 = document.getElementById("canvas-current2");
        var ctx = c4.getContext("2d");

        ctx.fillStyle = "white";
        ctx.font = "100px Georgia";
        ctx.fillText("2", 30, 90);
        ctx.font = "30px Verdana";


        var c5 = document.getElementById("canvas-current3");
        var ctx = c5.getContext("2d");

        ctx.fillStyle = "white";
        ctx.font = "100px Georgia";
        ctx.fillText("2", 30, 90);
        ctx.font = "30px Verdana";



    }

    function thermometer() {

        FusionCharts.ready(function(){
    var fusioncharts = new FusionCharts({
    type: 'thermometer',
    renderAt: 'chart-container',
    id: 'myThm',
    width: '240',
    height: '310',
    dataFormat: 'json',
    dataSource: {
        "chart": {
            "caption": "Temperature Monitor",
            "subcaption": " ",
            "lowerLimit": "10",
            "upperLimit": "100",

            "decimals": "1",
            "numberSuffix": "°C",
            "showhovereffect": "1",
            "thmFillColor": "#008ee4",
            "showGaugeBorder": "1",
            "gaugeBorderColor": "#008ee4",
            "gaugeBorderThickness": "2",
            "gaugeBorderAlpha": "30",
            "thmOriginX": "100",
            "chartBottomMargin": "20",
            "valueFontColor": "#000000",
            "theme": "fint"
        },
        "value": "100",
        //All annotations are grouped under this element
        "annotations": {
            "showbelow": "0",
            "groups": [{
                //Each group needs a unique ID
                "id": "indicator",
                "items": [
                    //Showing Annotation
                    {
                        "id": "background",
                        //Rectangle item
                        "type": "rectangle",
                        "alpha": "50",
                        "fillColor": "#AABBCC",
                        "x": "$gaugeEndX-40",
                        "tox": "$gaugeEndX",
                        "y": "$gaugeEndY+54",
                        "toy": "$gaugeEndY+72"
                    }
                ]
            }]

        },
    },
    "events": {
        "initialized": function(evt, arg) {
            var value;
            evt.sender.dataUpdate = setInterval(function() { // remove the random function when data is available

                    $.getJSON("/sensor/getTemp/",function(data){
                        value = (data['0']['fields']['temperature']);
                    });

                evt.sender.feedData("&value=" + value );

            }, 1000);
            updateAnnotation = function(evtObj, argObj) {
                var code,
                    chartObj = evtObj.sender,
                    val = chartObj.getData(),
                    annotations = chartObj.annotations;

                if (val >= -4.5) {
                    code = "#00FF00";
                } else if (val < -4.5 && val > -6) {
                    code = "#ff9900";
                } else {
                    code = "#ff0000";
                }
                annotations.update("background", {
                    "fillColor": code
                });
            };
        },
        'renderComplete': function(evt, arg) {
            updateAnnotation(evt, arg);
        },
        'realtimeUpdateComplete': function(evt, arg) {
            updateAnnotation(evt, arg);
        },
        'disposed': function(evt, arg) {
            clearInterval(evt.sender.dataUpdate);
        }
    }
}
);
    fusioncharts.render();
});
    }


    function oilLevel(){

         FusionCharts.ready(function(){
    var fusioncharts = new FusionCharts({
    type: 'cylinder',
    dataFormat: 'json',
    id: 'fuelMeter-4',
    renderAt: 'oilLevel-container',
    width: '240',
    height: '290',
    dataSource: {
        "chart": {
            "theme": "fint",
            "caption": "Oil Level in Generator",
            "subcaption": "",
            "lowerLimit": "0",
            "upperLimit": "120",
            "lowerLimitDisplay": "Empty",
            "upperLimitDisplay": "Full",
            "numberSuffix": " ltrs",
            "showValue": "0",
            "chartBottomMargin": "60"
        },
        "value": "110",

        "annotations": {
            "origw": "400",
            "origh": "190",
            "autoscale": "1",
            "groups": [{
                "id": "range",
                "items": [{
                    "id": "rangeBg",
                    "type": "rectangle",
                    "x": "$canvasCenterX-125",
                    "y": "$chartEndY-50",
                    "tox": "$canvasCenterX +145",
                    "toy": "$chartEndY-95",
                    "fillcolor": "#6caa03"
                }, {
                    "id": "rangeText",
                    "type": "Text",
                    "fontSize": "11",
                    "fillcolor": "#333333",
                    "text": "Available Volume : 110 ltrs",
                    "x": "$chartCenterX-35",
                    "y": "$chartEndY-70"
                }]
            }]
        }
    },
    "events": {
        "rendered": function(evtObj, argObj) {
            var consVolume;
            var gaugeRef = evtObj.sender,
                fuelVolume = 110;
            gaugeRef.chartInterval = setInterval(function() {
                (fuelVolume < 10) ? (fuelVolume = 110) : "";
                 $.getJSON("/sensor/getTank/",function(data){
                        consVolume = (data['0']['fields']['oilLevel']);
                    });

                gaugeRef.feedData("&value=" + consVolume);
                fuelVolume = consVolume;
            }, 1000);
        },
        //Using real time update event to update the annotation
        //showing available volume of Diesel
        "realTimeUpdateComplete": function(evt, arg) {
            var annotations = evt.sender.annotations,
                dataVal = evt.sender.getData(),
                colorVal = (dataVal >= 70) ? "#6caa03" : ((dataVal <= 25) ? "#e44b02" : "#f8bd1b");
            //Updating value
            annotations && annotations.update('rangeText', {
                "text": "Available Volume: " + dataVal + " ltrs"
            });
            //Changing background color as per value
            annotations && annotations.update('rangeBg', {
                "fillcolor": colorVal
            });
        },
        "disposed": function(evt, arg) {
            clearInterval(evt.sender.chartInterval);
        }
    }
}
);
    fusioncharts.render();
});
    }

    function panicAlert(){
        FusionCharts.ready(function(){
    var fusioncharts = new FusionCharts({
    type: 'bulb',
    renderAt: 'panic-container',
    id: 'myChart',
    width: '220',
    height: '310',
    dataFormat: 'json',
    dataSource: {
        "chart": {
            "caption": "Temperature status ",
            "upperlimit": "-5",
            "lowerlimit": "-60",
            "captionPadding": "30",
            "showshadow": "0",
            "showvalue": "1",
            "useColorNameAsValue": "1",
            "placeValuesInside": "1",
            "valueFontSize": "16",
            //Gauge origin
            "gaugeOriginX": "100",
            "gaugeOriginY": "150",
            //Gauge radius
            "gaugeRadius": "65",

            //Theme
            "theme": "fint"


        },
        "colorrange": {
            "color": [{
                "minvalue": "-60",
                "maxvalue": "-35",
                "label": "Danger",
                "code": "#ff0000"
            },  {
                "minvalue": "-25",
                "maxvalue": "-5",
                "label": "OK",
                "code": "#00ff00"
            }]
        },
        "value": "-5"
    },
    "events": {
        "rendered": function(evtObj, argObj){
            var num;
                setInterval(function () {
                    $.getJSON("/sensor/getTemp/",function(data){
                        num = (data['0']['fields']['temperature']);
                    });
                    FusionCharts("myChart").feedData("&value=" + num);
                }, 1000);
            }
    }
}
);
    fusioncharts.render();
});
    }

 setInterval(function loadData(){
         $.getJSON("/sensor/getVoltage/",
              function(data) {
                  $('#v1').html(data['0']['fields']['voltage1'] +'V');
                  $('#v2').html(data['0']['fields']['voltage2'] +'V');
                  $('#v3').html(data['0']['fields']['voltage3'] +'V');
                  $('#c1').html(data['0']['fields']['current1'] +'A');
                  $('#c2').html(data['0']['fields']['current2'] +'A');
                  $('#c3').html(data['0']['fields']['current3'] +'A');

              });

      },1000);

    function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}





 function draw() {
    thermometer();
    oilLevel();
    panicAlert()
}
window.onload = draw;



