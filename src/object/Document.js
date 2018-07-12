
export default class Document {
  constructor(data,searchText){
      if ( data ) {
        console.log("Document");
        console.log(data);
        this.title_ = data.title;
        this.author_name = data.author_name;
        this.key = data.key;
        this.cover_i = data.cover_i;
        this.first_publish_year = data.first_publish_year;
      }
  }
  title(){
    return this.title_;
  }
  details(){
    if(this.author_name){
      return "Author: " + this.author_name;
    }
    return "Author: Unknown";
  }
  description(){
    return "Description";
  }
  imageUrl(){
    if(this.cover_i != null){
      return "http://covers.openlibrary.org/b/id/"+this.cover_i+"-M.jpg";
    }
    return null;
  }
  targetUrl(){
    return "https://covers.openlibrary.org/books"+this.key;
  }
}
