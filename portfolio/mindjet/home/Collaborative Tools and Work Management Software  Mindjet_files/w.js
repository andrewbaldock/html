var _whalr;

(function()
{
    // check that _whalr is defined...
    if (typeof _whalr === 'undefined')
        return;

    // check we have an image server...
    _whalr.imgUrl = (typeof _whalr.imgUrl === "undefined") ? "s3-us-west-2.amazonaws.com/rec.whalr.com/w.gif" : _whalr.imgUrl;

    // we use JSON, check that it exists
	// See http://www.JSON.org/js.html
	if (typeof JSON === 'object') 
	    _whalr.JSON = JSON;	
    else {
    	_whalr.JSON = {};
	
	    function f(n) {
	        return n < 10 ? '0' + n : n;
	    }
	    if (typeof Date.prototype.toJSON !== 'function') {
	        Date.prototype.toJSON = function (key) {
	            return isFinite(this.valueOf())
	                ? this.getUTCFullYear()     + '-' +
	                    f(this.getUTCMonth() + 1) + '-' +
	                    f(this.getUTCDate())      + 'T' +
	                    f(this.getUTCHours())     + ':' +
	                    f(this.getUTCMinutes())   + ':' +
	                    f(this.getUTCSeconds())   + 'Z'
	                : null;
	        };
	        String.prototype.toJSON      =
	            Number.prototype.toJSON  =
	            Boolean.prototype.toJSON = function (key) {
	                return this.valueOf();
	            };
	    }
	
	    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        gap,
	        indent,
	        meta = {    // table of character substitutions
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"' : '\\"',
	            '\\': '\\\\'
	        },
	        rep;
	    function quote(string) {
	        escapable.lastIndex = 0;
	        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	            var c = meta[a];
	            return typeof c === 'string'
	                ? c
	                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	        }) + '"' : '"' + string + '"';
	    }
	    function str(key, holder) {
	        var i,          // The loop counter.
	            k,          // The member key.
	            v,          // The member value.
	            length,
	            mind = gap,
	            partial,
	            value = holder[key];
	        if (value && typeof value === 'object' &&
	                typeof value.toJSON === 'function') {
	            value = value.toJSON(key);
	        }
	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }
	        switch (typeof value) {
	        case 'string':
	            return quote(value);
	        case 'number':
	            return isFinite(value) ? String(value) : 'null';
	        case 'boolean':
	        case 'null':
	            return String(value);
	        case 'object':
	            if (!value) {
	                return 'null';
	            }
	            gap += indent;
	            partial = [];
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }
	                v = partial.length === 0
	                    ? '[]'
	                    : gap
	                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
	                    : '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }
	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    if (typeof rep[i] === 'string') {
	                        k = rep[i];
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            } else {
	                for (k in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	            v = partial.length === 0
	                ? '{}'
	                : gap
	                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
	                : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }
	    if (typeof _whalr.JSON.stringify !== 'function') {
	        _whalr.JSON.stringify = function (value) {
	            var i;
	            gap = '';
	            indent = '';
	            return str('', {'': value});
	        };
	    }
	};

    // read the cookies, if no __wuid, generate one
    _whalr._getCookie = function()
    {
	var cf = function() { return (result = new RegExp('(?:^|; )__wuid=([^;]*)').exec(document.cookie)) ? (result[1]) : null  };
        this.__wuid = cf();
 
        if (!this.__wuid)
            this.__wuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                 var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                 return v.toString(16);
            });
        
        // drop updated cookie, and test, failure = non-unique id
        this._setCookie();	
	if (!cf())
	    this.__wuid = '00000000-0000-4000-0000-000000000000';
    };
 
    // write back the cookies with new expiration date
    _whalr._setCookie = function()
    {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + (this.cookieDuration*60*60*24*1000));
        document.cookie = "__wuid=" + this.__wuid + "; expires=" + exdate.toUTCString() + "; path=/";
    };

    // update the user info (if a key exists, make it an array)
    _whalr.updateUser = function (key, value, _record)
    {
    	_record = (typeof _record === "undefined") ? false : _record;
    	if (key in this.user)
    		if ('push' in this.user[key])
    			this.user[key].push(value);
    		else
    			this.user[key] = [this.user[key], value];
    	else
    		this.user[key] = value;

    	// We only record if forced to do so...
    	if (_record)
    		return this.recordAction('_updateuser');
    };
 
    // record an action, and any properties
    _whalr.recordAction = function (name, properties, success)
    {
    	var fullProperties = this._appendBrowserState(properties);	// make sure we have referrer, etc...
    	var data = {user: this.user, action: [name, fullProperties]};
    	var payload = this.JSON.stringify(data);

        var url = (("https:" == document.location.protocol) ? "https://" : "http://");
        url = url + this.imgUrl + "?whalr_id=";
        url = url + this.whalr_id + "&data=" + encodeURIComponent(payload);
        url = url + "&r=" + Math.random();
  
    	var img = new Image();
    	if (typeof _record !== "undefined")
    		img.onload = success;
    	img.src = url;
    	    	
		return img;
    };

    // record an email action without any browser properties
    _whalr.recordEmailAction = function (name, properties)
    {
        var data = {user: this.user, action: [name, properties]};
        var payload = this.JSON.stringify(data);

        var url = "http://" + this.imgUrl;
        url = url + "?whalr_id=";
        url = url + this.whalr_id + "&data=" + encodeURIComponent(payload);

        return url;
    };
 
    // get browser state, overlay action properties
    _whalr._appendBrowserState = function (properties)
    {
    	properties = (typeof properties === "undefined") ? {} : properties;
    	var fullProperties = {
    			_href : location.href,
    			_referrer : document.referrer
    	};
    	
    	for (var key in properties)
    		fullProperties[key] = properties[key];

    	return fullProperties;
    };
    
    // replay any saved function calls from preload
    _whalr._playback = function(_x,y){
    	if (_x in _whalr)
    		for (var x in _whalr[_x])
    			y.call(_whalr, _whalr[_x][x][0], _whalr[_x][x][1]);
    	delete _whalr[_x];
    };
    
    // initialize cookieDuration and user, if necessary
    if (typeof _whalr.cookieDuration === 'undefined') _whalr.cookieDuration = 90;     // 90 days default duration
    if (typeof _whalr.user === 'undefined') _whalr.user = {};
    
    // update the user data
    _whalr._getCookie();
    _whalr.updateUser('__wuid', _whalr.__wuid);
    _whalr._playback('_u', _whalr.updateUser);

    // record the _pageview, static action and pre-load actions
    _whalr.recordAction('_pageview');
    if ('action' in _whalr)
        _whalr.recordAction(_whalr.action, _whalr.properties);
    _whalr._playback('_a', _whalr.recordAction);
 })();