var globLot = (function () {


    //helper function for ajax requests
    var ajax = function (url, obj) {
        var xhr = new XMLHttpRequest();
        // xhr.header( { 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') });
        xhr.open(obj.method, url, true);

        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        if (obj.method === "POST" ) {
            xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
            // xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        //
        }
        if( obj.method === "PUT") {
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

        }
        xhr.send(obj.data || null);
        xhr.onload = function () {
            if (xhr.status === 200 || 304) {
                if (obj.callback)
                    obj.callback.call(xhr, xhr.responseText);
            }
        };
    };

    var encodeObj = function (obj) {

        var encoded = [];

        for (var p in obj) {

            encoded.push(encodeURIComponent(p) + "="+ encodeURIComponent(obj[p]));
        }

        encoded = encoded.join("&");

        return encoded;
    };

    return {
        aj: ajax,
        enc: encodeObj
    };
}());

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function fadeInOut(error) {
    unfade(error);
    setTimeout(function () {
        fade(error);
    }, 2000);
}


//Display Status Function
function togglestatus(message, type) {
    $('.status-bar').fadeOut('fast').promise().done(function(){
        $('.status-bar').removeClass("danger success info").addClass(type);
        $('.status-bar-text').html(message);
        //$('.status-bar').css('left', '50%');
        $('.status-bar').fadeIn('fast');
        // $('.status-bar').fadeIn('fast');
    });
}

//Hide Status Function
function hideStatus(timer) {
    setTimeout(function(){
        $('.status-bar').fadeOut('fast');
    }, timer);
}


function waiting(color){
    return "<div class='loader' style='padding: 22% 0%; text-align: center;'><svg width='70' height='20'><circle cx='10' cy='10' r='9.35457' fill='" + color + "'><animate attributeName='r' from='0' to='10' values='0;10;10;10;0' dur='1000ms' repeatCount='indefinite'></animate></circle><circle cx='35' cy='10' r='1.35457' fill='" + color + "'><animate attributeName='r' from='0' to='10' values='0;10;10;10;0' begin='200ms' dur='1000ms' repeatCount='indefinite'></animate></circle><circle cx='60' cy='10' r='6.64543' fill='" + color + "'><animate attributeName='r' from='0' to='10' values='0;10;10;10;0' begin='400ms' dur='1000ms' repeatCount='indefinite'></animate></circle></svg></div>";
}



function updatesAnalogSettings(alarm_name,percentage,serial_number){
    globLot.aj('/api/update_analog_settings/'+serial_number+'/'+alarm_name+'/'+percentage,{
        method: "GET",
        callback:function (res) {
            console.log("Ges :",res);
        }
    });
}

function activateNDeactivate(siteID){
    globLot.aj('/api/activateSite/'+siteID,{
        method: "GET",
        callback:function (res) {
            console.log("Ges :",res);
        }
    });
}

function activeCommunicate(responder,type,serial_number){
    globLot.aj('/activeComm?set='+responder+'&type='+type+'&serial_number='+serial_number,{
        method: "GET",
        callback:function (res) {
            console.log("comind :",res);
        }
    });
}

function updateSiteView(serial_number){
    var m=0;
    setInterval(function(){
        $.getJSON("/api/updateSiteView/"+serial_number,function(data){
            var user_info = data['user_info'];
            // console.log(user_info);
            //for analogs
            for(var i = 0 ; i < user_info['analog_keys'].length; i++){
                var keep = user_info['alarm_info']['analog'][user_info['analog_keys'][i]];
                if (keep == "R"){
                    keep = "Not Used"
                }
                $('.'+user_info['analog_keys'][i]).html(keep);
            }

            //for dialog
            for(var i = 0 ; i < user_info['digital_keys'].length; i++){
                var keep = user_info['alarm_info']['digital'][user_info['digital_keys'][i]];
                if(keep == "R"){
                    keep = "Not Used"
                }
                else if (keep == 1){
                    keep = "ON"
                }
                else{
                    keep = "OFF"
                }
                $('.'+user_info['digital_keys'][i]).html(keep);
            }

            //for control

            for(var i = 0 ; i < user_info['control_keys'].length; i++){
                var keep = user_info['alarm_info']['control'][user_info['control_keys'][i]];

                if(keep == "R"){
                    keep = "Not Used"
                }
                else{
                    if (user_info['control_hold'][i] in user_info['control_setting']){
                        var controlKeySettings = user_info['control_setting'][user_info['control_hold'][i]];
                        var valueControl = parseInt(controlKeySettings.value) * parseInt(keep);
                        var keepHold = keep;
                        keep = '<input type="range" onchange=updateComms("'+user_info["control_hold"][i]+'",this) min="0" max="100" value="'+keepHold+'">';
                        var keep2 = '<label id="'+user_info["control_hold"][i]+'">'+valueControl+'</label>'+controlKeySettings.unit+'<input type="hidden" value="'+keepHold+'">'
                        $('.'+user_info['control_hold'][i]+'g').html(keep2);
                    }
                    else{
                        if (keep === '1'){
                            keep = '<input type="hidden" value="1"><label class="switch"><input checked="" type="checkbox"><div class="slider round active" onclick=updateComm("'+user_info["control_hold"][i]+'")></div></label>';
                        }
                        else{
                            keep = '<input type="hidden" value="0"><label class="switch"><input type="checkbox"><div class="slider round" onclick=updateComm("'+user_info["control_hold"][i]+'")></div></label>';
                        }
                    }
                }
                    $('.'+user_info['control_keys'][i]).html(keep);
                // console.log( $('.'+user_info['control_keys'][i]).html);
            }


            var sitecontrol_keys = user_info['sitecontrol_keys'];
            var sitecontrol_objects = user_info['alarm_info']['sitecontrol']

            for (var ele in sitecontrol_keys){
                if(sitecontrol_objects[sitecontrol_keys[ele]] == 0){
                    $('#'+hold[sitecontrol_keys[ele]]).collapse("hide");
                }
                else{
                    $('#'+hold[sitecontrol_keys[ele]]).collapse("show");
                }
            }
            // console.log(user_info);
            var location = user_info['site']['location'];
            if(location){
                $('.lat').html(location['lat']);
                $('.long').html(location['long']);
            }
            console.log("called");
        });
    },10000);

}

function getChartData(serial_number,analog_name,period,Chartist1){
    // console.log(Chartist1);
    Chartist1.data["series"][0]["data"][0] = 30;
    globLot.aj('/api/chart?serial_number='+serial_number+'&analog_name='+analog_name+'&period='+period,{
        method: "GET",
        callback:function (analog_data) {
            analog_data = JSON.parse(analog_data);
            console.log("comind :",analog_data);
            var current_x_axis = Object.keys(analog_data);
            var current_values = Object.values(analog_data);
            var max = Math.max.apply(Math,current_values);

            if(Array.isArray(current_x_axis)){
                Chartist1.data["labels"] = current_x_axis;
            }
            else{
                Chartist1.data["labels"] = [current_x_axis];
            }
            if(Array.isArray(current_values)){
                Chartist1.data["series"] = [
                    {
                        data: current_values
                    }
                ];
            }
            else{
                Chartist1.data["series"] = [
                    {
                        data: [current_values]
                    }
                ];
            }
            Chartist1.options.high = max;
            if (Chartist1.data["labels"].length <=1){
                var Chartist1 = new Chartist.Bar('#chart1', {
                        labels: current_x_axis,
                        series: [current_values]
                    }
                    );
            }
            console.log("chartist :",Chartist1.data);
            Chartist1.update(Chartist1.data,Chartist1.options,false);

        }
    });
}

function getDigitalData(serial_number,analog_name,period){
    globLot.aj('/api/digital_chart?serial_number='+serial_number+'&analog_name='+analog_name+'&period='+period,{
        method: "GET",
        callback:function (digital_data) {
            digital_data = JSON.parse(digital_data);
            var rowString = "";
            for(data in digital_data){
                var dig = digital_data[data];
                var analog_name = Object.keys(dig)[0];
                rowString+= '<tr role="row" class="even"> <td class="sorting_1">'+analog_name+'</td> <td>'+dig[analog_name]+'</td> ' +
                    '<td>'+dig["created_at"]+'</td>';
            }
            $('.digital_out').html(rowString);
        }
    });
}

function updateControls(serial_number,control_name) {
    globLot.aj('/api/update_control?serial_number='+serial_number+'&control_name='+control_name,{
        method: "GET",
        callback:function (res) {
            console.log("comind :",res);
        }
    });
}

function updateControlE(serial_number,control_name,value) {
    globLot.aj('/api/update_control_percentage?serial_number='+serial_number+'&control_name='+control_name+'&value='+value,{
        method: "GET",
        callback:function (res) {
            console.log("comind :",res);
        }
    });
}


