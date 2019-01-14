
var google_addr = {};
var address_comp = {};
var address_res = {};
/*
 * Get the json file from Google Geo
 */
function Convert_LatLng_To_Address(lat, lng, callback) {
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false";
    jQuery.getJSON(url, function (json) {
        Create_Address(json, callback, lng, lat);
    });
}

/*
 * Create an address out of the json 
 */
function Create_Address(json, callback, long, lat) {
    if (!check_status(json)) // If the json file's status is not ok, then return
        return 0;
    google_addr['country'] = google_getCountry(json);
    google_addr['province'] = google_getProvince(json);
    google_addr['city'] = google_getCity(json);
    google_addr['street'] = google_getStreet(json);
    google_addr['postal_code'] = google_getPostalCode(json);
    google_addr['country_code'] = google_getCountryCode(json);
    google_addr['formatted_address'] = google_getAddress(json);
    google_addr['lat'] = lat;
    google_addr['long'] = long;
    callback();
}

/* 
 * Check if the json data from Google Geo is valid 
 */
function check_status(json) {
    if (json["status"] == "OK")
        return true;
    return false;
}

/*
 * Given Google Geocode json, return the value in the specified element of the array
 */

function google_getCountry(json) {
    return Find_Long_Name_Given_Type("country", json["results"][0]["address_components"], false);
}
function google_getProvince(json) {
    return Find_Long_Name_Given_Type("administrative_area_level_1", json["results"][0]["address_components"], true);
}
function google_getCity(json) {
    return Find_Long_Name_Given_Type("locality", json["results"][0]["address_components"], false);
}
function google_getStreet(json) {
    return Find_Long_Name_Given_Type("street_number", json["results"][0]["address_components"], false) + ' ' + Find_Long_Name_Given_Type("route", json["results"][0]["address_components"], false);
}
function google_getPostalCode(json) {
    return Find_Long_Name_Given_Type("postal_code", json["results"][0]["address_components"], false);
}
function google_getCountryCode(json) {
    return Find_Long_Name_Given_Type("country", json["results"][0]["address_components"], true);
}
function google_getAddress(json) {
    return json["results"][0]["formatted_address"];
}

/*
 * Searching in Google Geo json, return the long name given the type. 
 * (if short_name is true, return short name)
 */

function Find_Long_Name_Given_Type(t, a, short_name) {
    var key;
    for (key in a) {
        if ((a[key]["types"]).indexOf(t) != -1) {
            if (short_name)
                return a[key]["short_name"];
            return a[key]["long_name"];
        }
    }
}



getLocation();
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    Convert_LatLng_To_Address(position.coords.latitude, position.coords.longitude, function () {
//        console.log(position.coords.latitude, position.coords.longitude)
//    console.log( google_addr);
    })
}
Cord_2_Addr(6.59667, 3.33618);


/*this is the co-ordinate to address plugin*/
//    $(function ($) {
//        $.fn.
function GetLocation(latt, lng, callback) {
    var url = "";
    if (lng === "address" || lng.length === 0 || !lng) {
        url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + latt + "&sensor=false";
    } else {
        url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latt + "," + lng + "&sensor=false";

    }
    $.getJSON(url, function (data) {
        address_comp['country_code'] = Find_Long_Name_Given_Type("country", data["results"][0]["address_components"], true);
        address_comp['province'] = Find_Long_Name_Given_Type("administrative_area_level_1", data["results"][0]["address_components"], false);
        address_comp['city'] = Find_Long_Name_Given_Type("locality", data["results"][0]["address_components"], false);
        address_comp['street'] = Find_Long_Name_Given_Type("street_number", data["results"][0]["address_components"], false) + ' ' + Find_Long_Name_Given_Type("route", data["results"][0]["address_components"], false);
        address_comp['postal_code'] = Find_Long_Name_Given_Type("postal_code", data["results"][0]["address_components"], false);
        address_comp['country'] = Find_Long_Name_Given_Type("country", data["results"][0]["address_components"], false);
        address_comp['formatted_address'] = data["results"][0]["formatted_address"];
        address_comp['lat'] = data["results"][0].geometry.location.lat;
        address_comp['long'] = data["results"][0].geometry.location.lng;
//                //alert(JSON.stringify(address_comp['lat']));
        if (data["results"][0].length !== 0) {
            if (typeof callback === 'function') {
                callback.call(address_comp);
            }
            return address_comp;
        }

    });

    if (!(typeof window.google === 'object' && window.google.maps)) {
        throw 'Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.'
    }
}

function  Cord_2_Addr(latt, lng, callback) {
    GetLocation(latt, lng, callback)
}
function Addr_2_Cord(address, callback) {
    GetLocation(address, "address", callback)
}
//    }(jQuery))
/*ends the co-ordinate to address plugin*/
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
};
function initialize() {
    var mapProp = {
        center: new google.maps.LatLng(44.5403, -78.5463),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var ids = 'autocomplete';
//    for (var i = 0; i <= 5; i++) {
        ids = 'autocomplete'
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapProp);
        var addr = (document.getElementById(ids));
        autocomplete = new google.maps.places.Autocomplete(addr, {types: ['geocode']});
//    }
    google.maps.event.addListener( autocomplete, 'place_changed', function () {
        // Get the place details from the autocomplete object.
        var place =  autocomplete.getPlace();
  //      var newPos = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
        GetLocation(place.geometry.location.lat(), place.geometry.location.lng());
//        map.setOptions({
//            center: newPos,
//            zoom: 15
//        });
//        //add a marker
//        var marker = new google.maps.Marker({
//            position: newPos,
//            map: map,
//            title: "You are here"
//        });
//        // Get each component of the address from the place details
//        // and fill the corresponding field on the form.
//        for (var i = 0; i < place.address_components.length; i++) {
//            var addressType = place.address_components[i].types[0];
//
//            if (componentForm[addressType]) {
//                var val = place.address_components[i][componentForm[addressType]];
//                if($.trim(val).length>0){
//                  var a = document.getElementById(addressType).value = val;
//                  //alert(a);
//                }
//                }
//        }
//        console.log(JSON.stringify(place.geometry));
    });


}


$(function (){
   google.maps.event.addDomListener(window, 'load', initialize); 
    $(document).on("click",".autocomplete",function (){
         $(".autocomplete").prop( "id", null )
        $(".autocomplete").removeAttr("id");
        $(this).attr("id","autocomplete");
       initialize(); 
    });
})