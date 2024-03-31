import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let {title, discription , imageUrl,newsurl} = this.props;
    

    return (
     
      
        <div className="card">       
             <img src={!imageUrl ? "https://c.biztoc.com/p/bb63916f5388c203/s.webp" : imageUrl } className="card-img-top" alt="..."/>
             <div className="card-body">
             <h5 className="card-title">{title}</h5>
             <p className="card-text">{discription}</p>
              <a  rel="noreferrer" href={newsurl}  target="_blank"  className="btn btn-outline-dark">Read More</a>
        </div>
</div>
      
    )
  }
}
