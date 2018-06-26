
export default class Document {
  constructor(data,searchText){
      if ( data ) {
        this.title = data.title;
        this.author_name = data.author_name;
      }
  }
}
