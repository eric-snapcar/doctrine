
export default class Document {
  constructor(data,searchText){
    console.log(data);
      if ( data ) {
        this.title = data.title;
        this.author_name = data.author_name;
        this.key = data.key;
        this.cover_i = data.cover_i;
      }
      console.log(this);
  }
  imageUrl(){

  }
  targetUrl(){

  }
}
