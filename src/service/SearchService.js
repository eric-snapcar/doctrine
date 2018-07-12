// http://openlibrary.org/search.json?q=the+lord+of+the+rings
import SearchResult  from '../object/SearchResult';
const baseUrl = "http://openlibrary.org/search.json";
let cache ={};
export default class SearchService {
  static presearch(searchText,page,callback){
    if(cache[searchText] == null || cache[searchText][page] == null){
      const callback_ = function(json,error){
        if(error != null){
            callback(error);
        }
        else{
            let searchResult = new SearchResult(json,searchText);
            if(cache[searchText] == null){
              cache[searchText] = {};
            }
            cache[searchText][page] = searchResult;
            callback(null);
        }
      }
      this.get({q:searchText,page:page},callback_);
    }
  }
  static search(searchText,page,timeout,callback){
    if(cache[searchText] != null && cache[searchText][page] != null){
      if(timeout){
        setTimeout(function () {
          callback(cache[searchText][page],null);
        }, 50);
      }
      else {
        callback(cache[searchText][page],null);
      }
    }
    else {
      const callback_ = function(json,error){
        if(error != null){
            callback(null,error);
        }
        else{
            let searchResult = new SearchResult(json,searchText);
            if(cache[searchText] == null){
              cache[searchText] = {};
            }
            cache[searchText][page] = searchResult;
            callback(searchResult,null);
        }
      }
      this.get({q:searchText,page:page},callback_);
    }
  }
  static header(token){
    let header = new Headers();
    return header;
  }
  static get(parameters,callback){
    let header = this.header();
    let params =
    {
        method: 'GET',
        header : header
    };
    if(parameters != null){
      let url = new URL(baseUrl);
      Object.keys(parameters).forEach(key => {   url.searchParams.append(key, parameters[key]);})
      this.fetch(url.href,params,callback);
    }else {
      let url = baseUrl;
      this.fetch(url,params,callback);
    }
  }
  static fetch(url, params, callback){
    fetch(url, params).then(function(response) {
      if(response.ok || response.status == 400){
        return response.text();
      }
      else {
        throw response;
      }
    }).then(function(text) {
      if(text){
          try {
              var json = JSON.parse(text);
              callback(json,null);
          } catch(error) {
              callback(null,error);
          }
      }else {
          callback(null,null,null);
      }
    }).catch(function(response) {
        callback(null,response);
    });
  }
}
