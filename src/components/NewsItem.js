import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let {title , description, imageUrl, newsUrl, author, published, source} = this.props;
    let datePublished = new Date(published);
    return (
      <div>
        <div className="card mt-2" style={{ width: '18rem' }}>
          <img src={imageUrl} className="card-img-top" alt="..." style={{height:'200px',width:'100%',objectFit:'cover'}}/>
          <div className="card-body">
            <h5 className="card-title">{title.length>20? title.slice(0,19):title}...</h5>
            <p className="card-text">
              {description.length > 100 ? description.slice(0, 60) : description}...
            </p>
            <p className='card-text'> <small className='text-muted'>By {author} on {datePublished.toGMTString()}</small></p>
            <p className='card-text'> <small className='text-muted'>Source:{source}</small></p>
            <a href={`${newsUrl}`} className="btn btn-primary">Read</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
