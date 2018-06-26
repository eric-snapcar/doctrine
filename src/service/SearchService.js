// http://openlibrary.org/search.json?q=the+lord+of+the+rings
import SearchResult  from '../object/SearchResult';
const baseUrl = "http://openlibrary.org/search.json";
export default class SearchService {
  static search(query,callback){
    const callback_ = function(json,error){
      console.log("SearchService search callback");
      console.log(json);
      console.log(error);
      let searchResult = new SearchResult(json);
    }
    this.get({q:query},callback_);
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
      console.log("SerchService");
      console.log(response);
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
