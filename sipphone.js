var SPhone = {
	init : function(displayname, password, uri, wsServer) {
		var _this = this;
		var config = {
			display_name: displayname,
			password: password,
			authorization_user: displayname,
			uri: uri,
			ws_servers: [wsServer],
			userAgentString: 'SIP.js/0.7.0 BB',
			session_timers: false,
			trace_sip: true,
			register: true
		};

		JsSIP.debug.enable('JsSIP:*');
		_this.ua = new JsSIP.UA(config);

		_this.ua.start();
	},
	
	invite : function(uri) {
		var _this = this;

		/*
		var views = {
			'selfView':   document.getElementById('my-video'),
			'remoteView': document.getElementById('peer-video')
		};
		*/

		// Register callbacks to desired call events
		var eventHandlers = {
			'progress':   function(e){ /* Your code here */ },
			'failed':     function(e){ /* Your code here */ },
			'started':    function(e){
				/*
				var rtcSession = e.sender;

				// Attach local stream to selfView
				if (rtcSession.getLocalStreams().length > 0) {
					selfView.src = window.URL.createObjectURL(rtcSession.getLocalStreams()[0]);
				}

				// Attach remote stream to remoteView
				if (rtcSession.getRemoteStreams().length > 0) {
					remoteView.src = window.URL.createObjectURL(rtcSession.getRemoteStreams()[0]);
				}
				*/
			},
			'ended':      function(e){ /* Your code here */ }
		};

		var options = {
			'eventHandlers': eventHandlers,
			'extraHeaders': [ 'X-Bar: bar' ],
			'mediaConstraints': {'audio': true, 'video': false}
		};

		_this.ua.call(uri, options);
	}
};

SPhone.init("1000", "1234", "sip:1000@10.32.27.128", "ws://10.32.27.128:5066");

function invite() {
	SPhone.invite("sip:1012@10.32.27.128");
}


