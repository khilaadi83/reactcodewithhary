import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        pageSize: 5,
        country: 'us',
        category: 'general'
    }
    static propTypes = {
        pageSize: propTypes.number,
        country: propTypes.string,
        category: propTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0

        };

    }

    async fetchNews(url) {
        this.props.setProgress(0);
        this.setState({ loading: true });
        try {
            this.props.setProgress(30);
            let response = await fetch(url);
            this.props.setProgress(50);
            let data = await response.json();
            this.props.setProgress(80);
            this.setState({ articles: data.articles, loading: false, totalArticles: data.totalResults });
            console.log(data.totalResults);
        } catch (e) {
            console.log('Something went wrong', e);
        }
        this.props.setProgress(100);
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.fetchNews(url)
    }

    handleNext = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)) {
            // Logic to handle the case where there are no more pages
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
            this.fetchNews(url);
        }
    }

    handlePrevious = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.fetchNews(url);
    }
    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;

        this.setState({ page: this.state.page + 1 });
        this.setState({ loading: true });
        try {
            let response = await fetch(url);
            let data = await response.json();
            this.setState({ articles: this.state.articles.concat(data.articles), loading: false, totalArticles: data.totalResults });
            console.log(data.totalResults);
        } catch (e) {
            console.log('Something went wrong', e);
        }

    }

    render() {
        return (

            <div className='container my-3'>
                <h1>Top Headlines</h1>
                {/* {this.state.loading ? <Spinner /> : ''} */}
                
                <div className="row my-3">
                    <div className="col-6 text-center container">
                        <button disabled={this.state.page <= 1} className="btn btn-warning" onClick={this.handlePrevious}>Previous</button>
                    </div>
                    <div className="col-6 text-center container">
                        <button className="btn btn-success" disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} onClick={this.handleNext}>Next</button>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalArticles}
                    loader={<h4><Spinner /></h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className="row">

                        {!this.state.loading && this.state.articles.map((element) => {
                            let { title, description, urlToImage, publishedAt, content, url, author } = element;
                            return (
                                <div className="col-md-4 mb-4" key={url}>
                                    <NewsItem title={(title?.slice(0, 55) || "") + (title?.length > 55 ? "..." : "")}
                                        description={(description?.slice(0, 95) || "") + (description?.length > 65 ? "..." : "")}
                                        url={urlToImage} publishedAt={publishedAt} author={author}
                                        content={content} more='Read More' linkurl={url} />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
                <div className="row">
                    <div className="col-6 text-center container">
                        <button disabled={this.state.page <= 1} className="btn btn-warning" onClick={this.handlePrevious}>Previous</button>
                    </div>
                    <div className="col-6 text-center container">
                        <button className="btn btn-success" disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} onClick={this.handleNext}>Next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default News;
