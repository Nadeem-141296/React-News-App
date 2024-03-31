import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from 'prop-types';


export default class News extends Component {
  static defualtProps = {
        country: 'in',
        pageSize:5,
      }
      static propTypes = {
        country: PropTypes.string,
        pageSize:PropTypes.number,
      }
  
   constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
      
    }
  }
    async componentDidMount(){
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1445f1593d64f10bd140558c3929aca`;
     this.setState({loading:true});
     const  data = await fetch(url);
     const  parasedData = await data.json()
     this.setState({articles:parasedData.articles, loading:false })
    }
    handelPreClick = async () => {     
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1445f1593d64f10bd140558c3929aca&page=${this.state.page + 1}&pagesize=20`;
     
     this.setState({loading:true});
     let data = await fetch(url);
     let parasedData = await data.json()
     this.setState({
      page:this.state.page - 1,
      articles:parasedData.articles,
      loading:false
    });

    }
    handelNextClick =  async () => {
    
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f1445f1593d64f10bd140558c3929aca&page=${this.state.page + 1}&pagesize=20`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parasedData = await data.json()

      this.setState({
        page:this.state.page + 1,
       articles:parasedData.articles,
       loading:false
     })
    }
  render() {
    return (
      <div>
        <div className="container my-4">
      {this.state.loading && <Spinner/>}
          <div className="row">
            { !this.state.loading &&  this.state.articles.map((element) => {
             return <div className="col-md-4  my-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  discription={element.description}
                  imageUrl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>;
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between my-3">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handelPreClick} >&larr; Previous</button>       
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
