import React from "react";

const MoviesSortTabs = props => {
    const { sort_by, updateSortBy } = props;
    
    const handleClick = value => {                                  // Рефакторинг-оптимизация onClick
        return (event) => {
            updateSortBy(value);
        }
    }

    const getClassLink = value => {                               // Рефакторинг - избавление от тернарного оператора
        return `nav-link ${sort_by === value ? "active" : ""}`
    }

    return (
        <ul className="tabs nav nav-pills">
            <li className="nav-item">
                <div className={getClassLink("popularity.desc")}
                    onClick={handleClick("popularity.desc")}
                    >
                        Popularity descending
                </div>
            </li>
            <li className="nav-item">
                <div className={getClassLink("revenue.desc")}
                     onClick={handleClick("revenue.desc")}
                     >
                        Revenue descending
                </div>
            </li>
            <li className="nav-item">
                <div className={getClassLink("vote_average.desc")}
                     onClick={handleClick("vote_average.desc")}
                     >
                        Vote average descending
                </div>
            </li>
    </ul>
    )
}

export default MoviesSortTabs;