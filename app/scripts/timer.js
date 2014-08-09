define(['jquery'], function($) {
	return function() {
		// This holds the number of seconds this timer will run through.
		// If we set it with set() the timer will be a countdown,
		// If starts from 0 it will count forward
		var _seconds = 0;
		var _timerId;

		var _paused = false;
		var _stopped = false;

		var get = function() {
			return _seconds;
		};

		var set = function(value) {
			_seconds = value;
		};

		var start = function() {
			_stopped = false;
			_timerId = setInterval(_tick, 1000);
		};

		var pause = function() {
			_paused = true;
		};

		var resume = function() {
			_paused = false;
		};

		var stop = function() {
			_stopped = true;
		};

		var reset = function() {
			_seconds = 0;
		};

		var _tick = function() {
			if(_stopped) {
				clearInterval(_timerId);
			} else if(!_paused) {
				_seconds += 1;
				$(document).trigger('tick', { seconds: _seconds, time: get_print_time() });
			}
		};

		var get_print_time = function(includeHours) {
			var sec_num = parseInt(_seconds, 10); // don't forget the second param
	    	var hours   = Math.floor(sec_num / 3600);
	    	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    	if (hours   < 10) {hours   = "0"+hours;}
	    	if (minutes < 10) {minutes = "0"+minutes;}
	    	if (seconds < 10) {seconds = "0"+seconds;}
	    	var time    = '';
	    	if(includeHours)
	    		time = hours+':'+minutes+':'+seconds;
	    	else
	    		time = minutes+':'+seconds;
	    	return time;
		};

		var onTick = function(handler) {
			$(document).on('tick', handler);
		};

		return {
			start: start,
			pause: pause,
			stop: stop,
			resume: resume,

			reset: reset,

			onTick: onTick,

			getPrint: get_print_time,

			get: get,
			set: set
		}
	}
});