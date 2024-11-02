import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalResults, setTotalResults] = useState(0);


  // document.title = `News Monk - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;


  const updateNews = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);


  }

  useEffect(() => {
    document.title = `News Monk - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;
    updateNews();
    // eslint-disable-next-line
  }, [])


// handleNextClick = async () => {
//   this.setState({ page: this.state.page + 1 });
//   this.updateNews();
// };

// handlePrevClick = async () => {
//   this.setState({ page: this.state.page - 1 });
//   this.updateNews();
// };

const fetchMoreData = async () => {
  setPage(page + 1);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setArticles(articles.concat(data.articles));
      setTotalResults(data.totalResults);
      setLoading(false);
    }
    );
};


  return (
    <div className='container '>
      <h2 className="text-center">News Monk - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length <= totalResults}
        loader={<Spinner />}

      >
        <div className="container">

          <div className="row">
            {Array.isArray(articles) && articles.length > 0 ? (
              articles.map((element, index) => {
                //console.log(index);
                return (

                  <div className="col-md-4" key={index}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imageUrl={element.urlToImage ? element.urlToImage : "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1719775348/image_loading_error_header/image_loading_error_header-png?_i=AA"}
                      newsUrl={element.url ? element.url : "Error 404 - Page not found"}
                      author={element.author ? element.author : "Unknown"}
                      published={element.publishedAt ? element.publishedAt : "Unknown"}
                      source={element.source.name ? element.source.name : "Unknown"}
                    />
                  </div>
                );
              })
            ) : (
              <p>No more news articles available.</p>
            )}
          </div>
        </div>
      </InfiniteScroll>


    </div>
  )
}

News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;


