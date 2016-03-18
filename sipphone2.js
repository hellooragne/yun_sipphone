var SPhone = {
	init : function(displayname, password, uri, wsServer) {
		var _this = this;

		_this.sessions = new Array(3);

		var config = {
			uri: uri,
			displayName: displayname,
			authorizationUser: displayname,
			password: password,
			ws_servers: [wsServer],
			traceSip: true,
			register: true
		};

		_this.ua = new SIP.UA(config);
	},
	
	invite : function(uri) {
		var _this = this;
		
		var session = _this.ua.invite(uri, {
			media: {
				constraints: {
					audio: true,
					video: false
				}
			},
		});	   

		return session;
	},

	receive: function () {
		var _this = this;
		_this.ua.on('invite', function (session) {
			console.log("receive call");
			session.accept({
				media: {
					render: {

					}
				}
			});
		});
	},

	notify: function() {
		var _this = this;

		_this.ua.on('notify', function (request) {
			console.log("receive notify");

			parser = new DOMParser();
			xmlDoc = parser.parseFromString(request.body,"text/xml");

			action   = xmlDoc.getElementsByTagName("cmd")[0].childNodes[0].nodeValue;
		    dnis     = xmlDoc.getElementsByTagName('cmd')[0].getAttribute('Dnis');
			RemoteId = xmlDoc.getElementsByTagName('cmd')[0].getAttribute('RemoteId');


			if (action == 'MakeCall') {
				console.log("make call dnis :" + dnis);
				session = _this.invite("sip:"+dnis+"@10.32.27.128");
				_this.sessions[dnis] = session;
			}

			if (action == 'HangUp') {
				console.log("hangup :" + RemoteId);
				_this.sessions[RemoteId].bye();
			}
		});
	}
};

SPhone.init("1000", "1234", "sip:1000@10.32.27.128", "ws://10.32.27.128:5066");

SPhone.receive();
SPhone.notify();

function invite() {
	SPhone.invite("sip:1012@10.32.27.128");
}

function notify() {
	SPhone.notify();
}

