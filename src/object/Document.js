
export default class Document {
  constructor(data,searchText){
      if ( data ) {
        this.title = data.title;
        this.author_name = data.author_name;
        this.key = data.key;
        this.cover_i = data.cover_i;
      }
  }
  imageUrl(){
    return "http://covers.openlibrary.org/b/id/"+this.cover_i+".jpg";
  }
  targetUrl(){
    return "http://covers.openlibrary.org/books/"+this.key;
  }
}
