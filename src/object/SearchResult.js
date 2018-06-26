import Document  from './Document';
export default class SearchResult {
  constructor(data,searchText){
      if ( data ) {
        this.numFounds = data.numFounds;
        this.start = data.start;
        this.searchText = searchText;
        this.documents = data.docs.map((json)=>{ return new Document(json);});
      }
  }
}
