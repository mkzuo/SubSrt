window.onload = function () {
	var vs = document.getElementsByTagName('video');
	[].forEach.call(vs, function(v) {
		v.loadTrack();
	});
};

HTMLVideoElement.prototype.loadTrack = function () {
	var v = this;
	[].forEach.call(this.getElementsByTagName('track'), function(t) {
		if (t.src.substr(t.src.length - 4) == '.srt'){
			var x = new XMLHttpRequest();
			x.onreadystatechange = function() {
			if (x.readyState == 4 && x.status == 200) {v.createTrack(x.responseText, t);}
			};	x.open("GET", t.src, true);x.send();
		}
	});
};
HTMLVideoElement.prototype.createTrack = function (text, track) {
	var srt = [];
	var lines = text.split('\n'); lines.push('\n'); var e = 0;	var sub = "";
	for (var i = lines[0].trim().length == 0 ? 1 : 0; i < lines.length; i++) {
		for (var n = i + 2; n < lines.length; n++){
			sub = sub + lines[n];
			if (lines[n + 1].trim().length == 0) {
				var start = tosec(lines[i + 1].split(' --> ')[0]);
				var end = tosec(lines[i + 1].split(' --> ')[1]);;
					srt[e] = {s: start, e: end, text: sub};
				i = n + 1;	break;
			}else {sub = sub + "\n";}
		};	sub = "";	e++;
	};
	var mode = track.hasAttribute('default') ? 'showing' : 'hidden';
	track.track.mode = 'disabled';
	var t = this.addTextTrack(track.kind, track.label, track.srclang);
		var ie = navigator.userAgent.indexOf("MSIE");
		ie = !!navigator.userAgent.match(/Trident\/7\./) ? 11 : ie;
	t.mode = mode; this.removeChild(track);
	if (ie != -1) {
		for (var k = 0; k < srt.length; k++){
			t.addCue(new TextTrackCue(srt[k].s, srt[k].e, srt[k].text));
			t.cues[k].line = -3;
		};
	}else{
		for (var k = 0; k < srt.length; k++){
			t.addCue(new VTTCue(srt[k].s, srt[k].e, srt[k].text));
			t.cues[k].line = -3;
		};
	}t.mode = 'hidden';t.mode = mode;
};

HTMLVideoElement.prototype.addSrtUrl = function(url, name, lang, kind){
	track = document.createElement('track');
	track.setAttribute('src', url);
	track.setAttribute('label', name == undefined ? 'New Track' : name);
	track.setAttribute('srclang', lang == undefined ? ' ' : lang);
	track.setAttribute('kind', kind == undefined ? ' ' : kind);
	this.appendChild(track);
	this.loadTrack();
};

HTMLVideoElement.prototype.getTrack = function (label) {
	for(var i = 0; i < this.textTracks.length; i++){
		if (this.textTracks[i].label.toLowerCase() === label.toLowerCase()){
			return this.textTracks[i];
			break;
		}
	}
};

function tosec (time) {
	return (parseFloat(time.split(":")[0]) * 3600) + (parseFloat(time.split(":")[1]) * 60) + (parseFloat(time.split(":")[2].replace(",", ".")));
}
