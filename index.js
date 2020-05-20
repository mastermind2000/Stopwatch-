$(document).ready(function(){
	var mode = 0;
	var timecounter = 0;
	var lapcounter = 0;
	var action;
	var lapnumber = 0;
	var thrs,tmin,tsec,lhrs,lmin,lsec;
	function hideShowButtons(x,y){
		$(".control").hide();
		$(x).show();
		$(y).show();
	}
	function startAction(){
		action = setInterval(function(){
			timecounter++;
			if(timecounter == 60*60*24){
				timecounter = 0;
			}
			lapcounter++;
			if(lapcounter == 60*60*24){
				lapcounter = 0;
			}
			updateTime();
		},1000);
	}
	function updateTime(){
		tmin = Math.floor(timecounter/60);
		thrs = Math.floor(timecounter/3600);
		tsec = timecounter%60;
		$("#timehour").text(format(thrs));
		$("#timeminute").text(format(tmin));
		$("#timesecond").text(format(tsec));
		lmin = Math.floor(lapcounter/60);
		lhrs = Math.floor(lapcounter/3600);
		lsec = lapcounter%60;
		$("#laphour").text(format(lhrs));
		$("#lapminute").text(format(lmin));
		$("#lapsecond").text(format(lsec));
	}
	function format(number){
		if(number < 10){
			return '0' + number;
		}
		else{
			return number;
		}
	}
	function addLap(){
		lapnumber++;
		var myLapDetails =  '<div class="lap">' +
								'<div class="laptimetitle">'+'Lap'+lapnumber+'</div>'+
								'<div class="laptime">'+'<span>'+format(lhrs)+'</span>'+
								':<span>'+format(lmin)+'</span>'+':<span>'+format(lsec)+'</span>'+
								'</div>'+
						    '</div>';
		$(myLapDetails).prependTo('#laps');
	}
	hideShowButtons("#startButton", "#lapButton");
	$("#startButton").click(function() {
		/* Act on the event */
		mode = 1;
		hideShowButtons("#stopButton","#lapButton");
		startAction();
	});
	$("#stopButton").click(function() {
		/* Act on the event */
		hideShowButtons("#resumeButton","#resetButton");
		clearInterval(action);
	});
	$("#resumeButton").click(function() {
		/* Act on the event */
		hideShowButtons("#stopButton","#lapButton");
		startAction();
	});
	$("#resetButton").click(function() {
		/* Act on the event */
		location.reload();
	});
	$("#lapButton").click(function() {
		/* Act on the event */
		if(mode){
			lapcounter = 0;
			addLap();
		}
	});	
});