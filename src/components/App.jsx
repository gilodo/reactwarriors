import React from "react";
import { moviesData } from "../moviesData"; // Убирает необходимость в export default (см. также 1-ю строчку moviesData.js)
import MovieItem from "./MovieItem";



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: moviesData,
      moviesWillWatch: []
    }

    console.log("constructor")
  }

  componentDidMount() {
    console.log("didMount");
    fetch("https://api.themoviedb.org/3/discover/movie?=ae25716429c7265acbe66bf51e830702")
  }

  removeMovie = movie => {                                            //. Исчезает проблема Cannot read property 'state' of undefined
    const updateMovies = this.state.movies.filter(function(item) {
      return item.id !== movie.id;
    });
    console.log(updateMovies);
    this.setState({
      movies: updateMovies
    })
  }

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })
  }

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function(item) {
      return item.id !== movie.id;
    });
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })
  }  

  render() {                                                                            // Превращает виртуальный DOM в обычный  DOM и рендерит на страницу
    console.log("render")
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
              {this.state.movies.map(movie =>  {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem 
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                      />
                   </div> 
                );
              })}
             </div> 
            </div>
            <div className="col-3">
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>                
            </div>
        </div>  
      </div>
    ); 
  }
}  

export default App;
