import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0)


    let fetchNews = async function (url) {
        props.setProgress(0);
        setLoading(true);
        try {
            props.setProgress(30);
            let response = await fetch(url);
            props.setProgress(50);
            let data = await response.json();
            props.setProgress(80);
            setArticles(data.articles)
            setLoading(false);
            setTotalResults(data.totalResults)
            /*  this.setState({ articles: data.articles, loading: false, totalArticles: data.totalResults }); */
            console.log(data.totalResults);
        } catch (e) {
            console.log('Something went wrong', e);
        }
        props.setProgress(100);
    }
useEffect(()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&pageSize=${props.pageSize}&category=${props.category}`;
    fetchNews(url)
}, [])


   /*  async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&pageSize=${props.pageSize}&category=${props.category}`;
        fetchNews(url)
    } */

    let handleNext = async () => {
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
            // Logic to handle the case where there are no more pages
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&page=${page + 1}&pageSize=${props.pageSize}&category=${props.category}`;
            fetchNews(url);
        }
    }

    let  handlePrevious = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&page=${page - 1}&pageSize=${props.pageSize}&category=${props.category}`;
        fetchNews(url);
    }
    let fetchMoreData = async  () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=903fd51d327f404cbea0807b9f09b425&page=${page + 1}&pageSize=${props.pageSize}&category=${props.category}`;
        setPage(page + 1)
       
        setLoading(true)
        try {
            let response = await fetch(url);
            let data = await response.json();
            setArticles(articles.concat(data.articles))
            setLoading(false)
            setTotalResults(data.totalResults)
            
            console.log(data.totalResults);
        } catch (e) {
            console.log('Something went wrong', e);
        }

    }


    return (

        <div className='container my-3'>
            <h1>Top Headlines</h1>
            {/* {this.state.loading ? <Spinner /> : ''} */}

            <div className="row my-3">
                <div className="col-6 text-center container">
                    <button disabled={page <= 1} className="btn btn-warning" onClick={handlePrevious}>Previous</button>
                </div>
                <div className="col-6 text-center container">
                    <button className="btn btn-success" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={handleNext}>Next</button>
                </div>
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !==totalResults}
                loader={<h4><Spinner /></h4>}
                scrollableTarget="scrollableDiv"
            >
                <div className="row">

                    {!loading && articles.map((element) => {
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
                    <button disabled={page <= 1} className="btn btn-warning" onClick={handlePrevious}>Previous</button>
                </div>
                <div className="col-6 text-center container">
                    <button className="btn btn-success" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    );

}
News.propTypes = {
    pageSize: propTypes.number,
    country: propTypes.string,
    category: propTypes.string,
};
News.defaultProps = {
    pageSize: 5,
    country: 'us',
    category: 'general'
}


