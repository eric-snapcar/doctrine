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
              <div onClick={()=> this.openUrl()} className="title">{this.props.document.title()}</div>
              <div className="details"> {this.props.document.details()}</div>
              <div className="description"> {this.props.document.description()}</div>
          </div>
      </div>
    );
  }
}
