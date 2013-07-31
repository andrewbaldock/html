/*
    Copyright (c) 2013 Webtrends, Inc.
    Ads Plugin v10.2.63
  
    An example of including the plugin with your tag.
  
    <script type="text/javascript">
    // async loader function, called by webtrends.js after load
    window.webtrendsAsyncInit=function(){
        var dcs=new Webtrends.dcs().init({
            dcsid:"YOUR_WEBTRENDS_DCSID_HERE",
            timezone:YOUR_TIMEZONE_HERE,
            plugins:{
                ads:{src:"webtrends.ads.js", marinID:"YOUR_MARIN_ID_HERE", timezone:"pacific", fireOnMultiTrack:true}
            }
            }).track();
    };
    (function(){
        var s=document.createElement("script"); s.async=true; s.src="webtrends.js";    
        var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
    }());
    </script>
    
    Plugin parameter options: 
    - src: plugin filename and location
    - marinID: Client ID
    - timezone: Possible values are "pacific", "mountain", "central" and "eastern".
    - dcsid: use only if timezone has no acceptable values.  Issued by Webtrends at account creation.
    - fireOnMultiTrack: Controls whether an ads hit can be triggered by a multiTrack event. Set to true for tracking pages where
       a conversion can be triggered by a multiTrack event. Set to false for page load conversion tracking
    Example:  plugins:{ads:{src:"webtrends.ads.js", marinID:"12345", timezone:"pacific", fireOnMultiTrack: true}}
    Note:  The words "plugins" and "ads" cannot be changed.

    Tagging the page:
      
    An Ads hit fires during an analytics event on the existence of one of the following parameters: "WT.srch=1", "WT.conv=1", or "WT.tx_e=p".
    These parameters can either be on the page or included as arguments for the given analytics hit. 
    If none of the parameters are on a page, nothing happens.  "WT.srch=1" usually triggers for landing page hits and are typically found on
    the query string.  No page tagging is needed. WT.srch=1 will only trigger an ads hit on the first analytics hit on a given page.

    The recommended technique for conversion pages is to use <META> tags in the <HEAD> section of the page.  
    Conversion pages require: 
    WT.tx_e=p    -  Triggers the tag
    WT.pn_sku    -  Semi-colon delimited list of products or conversion event name.
    WT.tx_s      -  Semi-colon delimited list of subtotals for each product.  This is NOT per-unit cost.
    WT.tx_u      -  Semi-colon delimited list of units for each product.  Non-purchase conversion would use "1".
    WT.tx_type   -  Optional.  Semi-colon delimited list to apply additional attribution to the product list.
    WT.tx_custom -  Optional.  User-defined list.
        
    Example:
    <META NAME="WT.tx_e" CONTENT="p"/>
    <META NAME="WT.pn_sku" CONTENT="product1;product2;product3"/>
    <META NAME="WT.tx_s" CONTENT="19.99;20.00;50.98"/>
    <META NAME="WT.tx_u" CONTENT="1;5;2"/>
    <META NAME="WT.tx_type" CONTENT="buy;buy;rent"/>
*/
(function () {

    WebtrendsAds = function (tag, plugin) {
        var timezone = { "pacific": "dcs49gx3vuz5bdunt9qsg20iw_4j9r", "mountain": "dcsufpcd8vz5bdf2wftmk8hp9_3k5z", "central": "dcs9w8vakvz5bdzloy48d7hp9_6z1s", "eastern": "dcswkeaqu10000000ctibwftx_9k4w" };
        //Set the dcsid based off the timezone
        if (plugin.timezone) {
            this.dcsid = timezone[plugin.timezone.toLowerCase()];
        }
        //No (or invalid) timezone specified, but dcsid value specified
        if (!this.dcsid && plugin.dcsid)
            this.dcsid = plugin.dcsid;
            
        this.enabled = true;
        this.adsPluginVersion = "10.2.63";
        this.marinID = plugin.marinID;
        this.tagObj = tag;
        this.analyticsDCSID = tag.dcsid;
        this.eventsIntercepted = 0;
        this.activeRequests = 0;
        this.fireOnMultiTrack = plugin.fireOnMultiTrack;
        
        if (plugin.timeout) {
            Webtrends["dcsdelay"] = plugin.timeout;
        }
    }
    
    WebtrendsAds.prototype.addTransform = function () {

        var self = this;
        var transformEventTypes = (this.fireOnMultiTrack) ? "all":"collect";

        Webtrends.addTransform(function(dcsObject, options) { 
                //Silently ignore any exceptions so we don't
                //interfere with the analytics hit
                try {            
                    self.eventsIntercepted++;
                    
                    //options.args has already been merged into
                    //options.argsa. Form object out of KVP array
                    var hitArgs = {};
                    if (options.argsa && options.argsa.length%2 == 0) {
                        for (var n = 0; n+1 < options.argsa.length; n+=2)
                            hitArgs[options.argsa[n]] = options.argsa[n+1]; 
                    }
                    self.currentHitArgs = hitArgs;
                    
                    //Should I fire?
                    if (options.isAdsHit || !self.shouldTrigger() ) {
                        self.currentHitArgs = {};
                        return;
                    }
                    
                    //Get the ads specific parameters
                    var adsArgs = self.getAdsArgs();
                    adsArgs["WT.ads_ac"] = self.marinID;
                     adsArgs["WT.ads_tv"] = self.adsPluginVersion;
                    //Merge in analytics hit args
                    for (var key in self.currentHitArgs) {
                        if (!adsArgs.hasOwnProperty(key)) {
                            adsArgs[key] = self.currentHitArgs[key];
                        }
                    }
                    self.currentHitArgs = {};
                    
                    //There will be two hits, we want to make sure that the callback specified
                    //in the original multiTrack call happens on the onload of the last image
                    //request to complete. We can't guarantee order of the responses so keep
                    //a counter
                    var mtCallbackOrig = options.callback;
                    var callbackAds = function(dcsObject, options) {
                        self.activeRequests--;
                        if (self.activeRequests == 0 && mtCallbackOrig) {
                            mtCallbackOrig(dcsObject, options);
                        }
                    }
                    options.callback = callbackAds;
                    
                    //Fire off the ads hit
                    self.activeRequests++;          //For the initial multiTrack event
                    self.activeRequests++;          //For the ads multiTrack event
                    self.tagObj.dcsMultiTrack({
                        args:adsArgs,
                        transform: function(dcsObj, opt) {
                            //update the dcsid
                            dcsObj.dcsid = self.dcsid;
                        },
                        finish: function(dcsObj, opt) {
                            //revert the dcsid
                            dcsObj.dcsid = self.analyticsDCSID;
                        },
                        callback: callbackAds,
                        //Flag this hit as an ads hit so transform can check for it to prevent infinite recursion
                        isAdsHit:true
                    });
                }
                catch(e) {
                }
            }, 
            transformEventTypes, self.tagObj
        );          
    }

    WebtrendsAds.prototype.getAdsArgs = function () {
        
        var adsArgs = {};
        //ads specific logic
        if (this.hasTag('WT.tx_e=p') || this.hasTag('WT.conv'))
            adsArgs["WT.conv"]= "1";

        // if there is a tx_s tag, calculate tx_tt
        if (this.hasTag('WT.tx_s')) {
            // get the values
            var subtotals = this.getValue('WT.tx_s')

            if (subtotals) {
                // sum them up
                total = 0.0;
                splitSubs = subtotals.split(';');
                for (sub in splitSubs) {
                    total = total + parseFloat(splitSubs[sub]);
                }
            }

            if ((typeof (total) == 'undefined') || (total == 'NaN'))
                adsArgs["WT.tx_tt"] = "0";
            else
                adsArgs["WT.tx_tt"] = total;
        }
        if (this.hasTag('WT.pn_sku')) {
            var t_sku = this.getValue('WT.pn_sku');
            adsArgs['WT.pn_sku']= this.Reforge(t_sku);
        }
        if (this.hasTag('WT.tx_s')) {
            var t = this.getValue('WT.tx_s');
            t = this.recalculateSubtotal(t, this.getValue('WT.tx_u'));
            adsArgs['WT.tx_s'] = this.Reforge(t);
        }
        if (this.hasTag('WT.tx_u')) {
            var t = this.getValue('WT.tx_u');
            adsArgs['WT.tx_u'] = this.Reforge(t);
        }
        if (this.hasTag('WT.tx_type')) {
            var t = this.getValue('WT.tx_type');
            adsArgs['WT.tx_type'] = this.Reforge(t);
        }
        if (this.hasTag('WT.tx_custom')) {
            var t = this.getValue('WT.tx_custom');
            adsArgs['WT.tx_custom'] = this.Reforge(t);
        }
        return adsArgs;
    }

    // checks to see if Ads is enabled, and whether the triggering
    // tags are present in the query or JS.
    WebtrendsAds.prototype.shouldTrigger = function () {
        
        if (this.enabled && ( // enabling check
            ( this.eventsIntercepted == 1 && this.hasTag('WT.srch=1')) || // search
            this.hasTag('WT.conv=1') || // purchase
            this.hasTag('WT.tx_e=p')) // purchase
                ) {
            return true;
        }
        
        return false;
    }


    // searches the URL query string, WT/DCSext stores, and hit specific args
    // for a key=value pair.  If the value is not specified, it
    // simply checks for the presence of the key and accepts any
    // value.
    WebtrendsAds.prototype.hasTag = function (target) {
        // WT.foo=bar -> "WT.foo"
        var tag = target.split('=')[0];

        // WT.foo=bar -> "bar"
        var value = target.split('=')[1];
        if (!value)
            value = '';

        // WT.foo=bar -> "foo"
        var subTag = tag.split('.')[1];

        if (
        this.hasHitArgs(tag, value) ||
        this.hasParamKV(tag, value) ||
        this.hasWTKV(subTag, value) ||
        this.hasDCSextKV(subTag, value) ||
        this.hasDCSqry(target) // for dcsET bindings
        ) {
            return true;
        }
        return false;
    }

    WebtrendsAds.prototype.Reforge = function (k) {
        if (k != "") {
            var s = k;
            while (s.indexOf(';') != -1) {
                s = s.replace(';', '|');
            }
            return s;
        }
    }

    WebtrendsAds.prototype.hasHitArgs = function (k, v) {
        
        if ((this.currentHitArgs && this.currentHitArgs[k]) 
            &&(!v || this.currentHitArgs[k] == v)){
            return true;
        }
        return false;
        
    }
    
    WebtrendsAds.prototype.hasParamKV = function (k, v) {
        regex = new RegExp(k + "=" + v, "i"); // slap = on the end as a terminator
        if (document.location.search.match(regex)) {
            return true;
        }
        return false;
    }

    WebtrendsAds.prototype.hasWTKV = function (k, v) {
        if ((this.tagObj.WT[k]) 
            &&(!v || this.tagObj.WT[k] == v)){
            return true;
        }
        return false;
    }

    WebtrendsAds.prototype.hasDCSextKV = function (k, v) {
        if ((this.tagObj.DCSext[k]) 
            &&(!v || this.tagObj.DCSext[k] == v)){
            return true;
        }
        return false;
    }

    WebtrendsAds.prototype.hasDCSqry = function (k) {
        if (typeof (this.tagObj.DCS.dcsqry) == 'undefined') {
            return false;
        }

        regex = new RegExp(k, "i"); // case insensitive
        if (this.tagObj.DCS.dcsqry.match(regex)) {
            return true;
        } else {
            return false;
        }
    }


    WebtrendsAds.prototype.getValue = function (k) {
        if (this.currentHitArgs) {
            var v = this.currentHitArgs[k];
            if (v) return v;
        }
        
        var v = this.getParam(window.location.search, k);
        if (v) return v;

        if (k.split('.')[0] == "WT") {
            v = this.tagObj.WT[k.split('.')[1]]
            if (v) return v;
        }

        v = this.tagObj.DCSext[k];
        if (v) return v;

        // for dcsET bindings
        if (typeof (this.tagObj.DCS.dcsqry) != 'undefined') {
            v = this.getParam(this.tagObj.DCS.dcsqry, k)
            if (v) return v;
        }
    }

    WebtrendsAds.prototype.getParam = function (src, k) {
        var query = src.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == k) {
                return pair[1];
            }
        }
    }

    WebtrendsAds.prototype.recalculateSubtotal = function (tx_s, tx_u) {
        var result = "";
        if (tx_s && tx_u) {
            var s = tx_s.split(";");
            var u = tx_u.split(";");
            if ((s.length > 0) && (s.length == u.length)) {
                for (x = 0; x < s.length; x++) {
                    var s1 = parseFloat(s[x]);
                    var u1 = parseInt(u[x]);
                    a = s1 / u1;
                    result += Math.round((a * 100) - .5) / 100;
                    result += (x < s.length - 1) ? ";" : "";
                }
            }
        }
        return result;
    }
})();

var ads_loader = function (tag, plugin) {
    var _wtAd = new WebtrendsAds(tag, plugin);
    
    //Add the global transform to pick up any
    //events that should result in
    //an ads hits
    _wtAd.addTransform();

}

Webtrends.registerPlugin('ads', ads_loader);