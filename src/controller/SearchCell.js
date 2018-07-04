import Img from 'react-image'
import React from 'react';
import { Button, Intent, Spinner, Dialog, Popover, Position } from "@blueprintjs/core";
export default class SearchCell extends React.Component {
  openUrl(){
    var win = window.open(this.props.document.targetUrl(), '_blank');
    win.focus();
  }
  render(){
    return(
      <div className="searchCell">


            <div onClick={()=> this.openUrl()} className="searchCellImage">
               {this.props.document.imageUrl()
                ?
                    <Img
                        src={this.props.document.imageUrl()}
                        loader={<div className="searchCellImagePlaceHolder"><Spinner className="pt-small" /></div>}
                    />
                :
                    <div className="searchCellImagePlaceHolder">No Cover</div>
                }
            </div>

          <div className="searchCellText">
              <div onClick={()=> this.openUrl()} className="title">{this.props.document.title}</div>
              {this.props.document.author_name && <div className="details">Author: {this.props.document.author_name}</div>}
          </div>
      </div>
    );
  }
}
