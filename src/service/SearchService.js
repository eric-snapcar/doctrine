// http://openlibrary.org/search.json?q=the+lord+of+the+rings
export default class SearchService {
  static search(query,callback){
    const callback_ = function(json,error){

    }
    // FetchService.get("riders/"+userId+"/planned_bookings" ,null,callback_)
    console.log("SearchService");
    console.log(query);
  }
}
