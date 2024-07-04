import React, { Component } from 'react'

export default function NewsItem(props) {
   
        let { title, description, url, more, linkurl,publishedAt, author } = props;
        const date = new Date(publishedAt);
const formattedDate = date.toLocaleString();
        return (


            <div className="card">
                <img className="card-img-top" src={url ? url : "https://via.placeholder.com/150"} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={linkurl} target='_blank' class="btn btn-primary">{more}</a>
                    <h3 className="lead">Date - {formattedDate ? formattedDate.split(',')[0]:''}</h3>
                    <h3 className="lead">Time- {formattedDate ? formattedDate.split(',')[1]:''}</h3>
                    <h3 className="lead">Author - {author ? author : 'Not Availiable'}</h3>
                </div>




            </div>
        )
    
}



