import axios from 'axios';
import qs from 'qs';
let storage = window.localStorage;
let loading = document.getElementById("loading");
let instance = axios.create({
    baseURL: 'http://libo5050.tpaper.dev.dodoedu.com/',
    timeout: 10000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export default {
    get: function (url) {
        return function (load, params) {
            if (load === 1 || load === 2) {
                loading.style.display = "block";
            }
			let paramsStr = formatParams(params);
            let getUrl = url+"?"+paramsStr;
            return instance.get(getUrl).then((res) => {
                const {type,data,message} = res.data;
                if (type === "success") {
                    if (load === 1 || load === 3) {
                        loading.style.display = "none";
                    }
                    return message;
                }
                if (type === "error") {
                    if (load === 1) {
                        loading.style.display = "none";
                    }
                    console.log(message);
                    return message;
                }
                if (type === "login") {
                    goLogin();
                    return message;
                }
            }).catch((res) => {
                alert(res);
            })
        }
    },

    post: function (url) {
        return function (load, params) {
            if (load === 1 || load === 2) {
                loading.style.display = "block";
            }
			let paramsStr = formatParams(params);
            return instance.post(url,paramsStr).then((res) => {
                const {type,data,message} = res.data;
                if (type === "success") {
                    if (load === 1) {
                        loading.style.display = "none";
                    }
                    return message;
                }
                if (type === "login") {
                    goLogin();
                    return message;
                }
                if (type === "error") {
                    if (load === 1) {
                        loading.style.display = "none";
                    }
                    return message
                }
            }).catch((res) => {
                console.log(url + "|" + res)
            })
        }
    },

    login: function (url) {
        return function (load, params) {
            if (load === 1 || load === 2) {
                loading.style.display = "block";
            }
            return instance.post(url,
                qs.stringify({param: params})
            ).then((res) => {
                const {type, data, message} = res.data;

                if (type === "success") {
                    if (load === 1) {
                        loading.style.display = "none";
                    }
                    return message;
                }
                if (type === "error") {
                    if (load === 1) {
                        loading.style.display = "none";
                    }
                    return message;
                }
            }).catch((res) => {
                console.log(url + "|" + res)
            })
        }
    }
}

function goLogin() {
    storage.setItem("token", "");
    let url = window.location.href;
    let mainUrl = url.split("#")[0];
    let hash = url.split("#")[1];
    window.location.href = mainUrl + "#/login?redr=" + hash;
    loading.style.display = "none";
}


function formatParams(params) {
	let token = storage.getItem("token") ? JSON.parse(storage.getItem("token")) : "";
	if (!params) {
		params = {
			token: token
		}
	} else {
		params.token = token;
	}
	return qs.stringify({param: params})
}


