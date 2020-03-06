import React from "react";
import { moviesData } from "../moviesData"; // Убирает необходимость в export default (см. также 1-ю строчку moviesData.js)
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MoviesSortTabs from "./MoviesSortTabs"

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: moviesData,
      moviesWillWatch: [],
      sort_by: "revenue.desc"
    }

    console.log("constructor")
  }

  componentDidMount() {
    console.log("didMount");
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then((response) => {
      console.log("then")
      return response.json()
    }).then((data) => {
      console.log("data", data)
      this.setState({
        movies: data.results
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    console.log("prev", prevProps, prevState);
    console.log("this", this.props, this.state);
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
  
  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  };

  render() {                                                                            // Превращает виртуальный DOM в обычный  DOM и рендерит на страницу
    console.log("render", this.state.sort_by)
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MoviesSortTabs 
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                 />
              </div>
            </div>
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
