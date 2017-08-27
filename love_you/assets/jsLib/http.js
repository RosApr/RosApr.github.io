'use strict';

var HTTP_URL_PARAM = (function(){
  var _search     = window.location.search.length > 0 && window.location.search.slice(1) || "",
      _paramArr   = [],
      _result     = {},
      _paramCell;

  _paramArr = _search.indexOf('&') > 0 ? _search.split('&') : _search.split(' ');

  _paramArr.forEach(function(item){
    _paramCell = item.split("=");
    _result[_paramCell[0]] = unescape(_paramCell[1]);
  });
  return _result;
})();

var HTTP_IS_MOBILE = (function(){
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        return  true;
    }else{
        return false;
    }
})();

var log = function(message){
	if(HTTP_URL_PARAM.hasOwnProperty("debug") && HTTP_URL_PARAM['debug']){
		if(!console && typeof console === 'object'){
			HTTP_IS_MOBILE ? alert(message) : console.log.call(this, message);
		}else{
			alert(message);
		}
		return true;
	}
	return false;
}

var HTTP_AJAX = {
	devPath: "http://rosapr.me/work/hexu/chinaUnicom/code/server/",
	productPath: "admin/index.php?g=Wap",
	locationSearch: {
	  api: "&m=Index&a=searchLocation",
	  search_succ_hasdata: "search/search_succ_hasdata.json",
	  search_succ_nodata: "search/search_succ_nodata.json",
	  search_error_input: "search/search_error_input.json"
	},
	getLocationManager: {
	  api: "&m=Index&a=searchManager",
	  hasall: "getLocationManager/locationManager_hasall.json",
	  hassingle: "getLocationManager/locationManager_hassingle.json",
	  hasnone: "getLocationManager/locationManager_hasnone.json"
	},
	fileUpload: {
	  api: "admin/index.php?g=Wap&m=Order&a=upload"
	},
	orderList: {
	  api: "&m=Order&a=getOrderRecord",
	  hasdata: "orderList/hasData.json",
	  nodata: "orderList/noData.json"
	},
	payRefund: {
	  api: "&m=Order&a=payRefund"
	},
	orderDetail: {
	  api: "&m=Order&a=getOrderInfo",
	  package_share: "packageDetail/share.json",
	  package_union: "packageDetail/union.json",
	  package_unique: "packageDetail/unique.json"
	}
};

function request(api, method, data, callback){
	var _httpPath, _api;
		if((HTTP_URL_PARAM.hasOwnProperty("debug") && HTTP_URL_PARAM['debug'])){
			_httpPath = HTTP_AJAX.devPath;
			_api = HTTP_AJAX[api][HTTP_URL_PARAM["method"]];
		}else{
			_httpPath = HTTP_AJAX.productPath;
			_api = HTTP_AJAX[api]["api"];
		}
	$.ajax({
		url: _httpPath + _api,
		method: method,
		data: data,
		dataType: "json",
		beforeSend: function(xhr, settings){
		  if(HTTP_URL_PARAM.hasOwnProperty("debug") && HTTP_URL_PARAM['debug']){
		    //todo
		  }
		  log("beforeSend_api:"+ _api);
		  log("beforeSend_method:"+ method);
		  log("beforeSend_data:"+ data);
		  log("beforeSend_callback:"+ callback);
		  log("beforeSend_url:"+ settings.url);
		  log("beforeSend_data:"+ settings.data);
		},
		complete: function(){

		},
		success: function(response){
		  if(Object.prototype.toString.call(callback) === "[object Function]"){
		    callback(response);
		  }
		},
		error: function (xhr, type, error) {

		}
	});
}



window.storage = {
  store:localStorage,
  get: function(key) {
    try {
      return JSON.parse(this.store[key]);
    } catch(e) {}
    return undefined;
  },
  set: function(key, value) {
    try {
      this.store[key] = JSON.stringify(value);
    } catch(e) {}
  }
};