import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 20,
      totalResults: 0
    };
    document.title = `News Monk - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`;
  }

  async updateNews() {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    });

  }

  async componentDidMount(props) {
    this.props.setProgress(0);
    this.updateNews();
    this.props.setProgress(100);
  }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          articles: this.state.articles.concat(data.articles),
          totalResults: data.totalResults,
          loading: false
        });
      }
      );
  };

  render() {
    return (
      <div className='container '>
        <h2 className="text-center">News Monk - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}

        >
          <div className="container">

            <div className="row">
              {Array.isArray(this.state.articles) && this.state.articles.length > 0 ? (
                this.state.articles.map((element, index) => {
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
    );
  }
}

export default News;


