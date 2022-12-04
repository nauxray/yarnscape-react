import "./Home.css";

import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";

import useModal from "../hooks/useModal";
import Api from "../utils/api/api";
import Card from "./Card";
import FilterSortModal from "./FilterSortModal";
import Loader from "./Loader";

export default function Home() {
  const api = new Api();
  const { isShowing, toggle } = useModal();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [topRated, setTopRated] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchParams, setSearchParams] = useState({});

  const fetchResults = async () => {
    setLoading(true);
    const res = await api.getYarns(searchParams);
    setLoading(false);
    setResults(res);
  };

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      fetchResults();
    }
  }, [searchParams]);

  const fetchTopRated = async () => {
    const res = await api.getYarns({ sort: "rating:desc", limit: 4 });
    setTopRated(res);
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchName.length > 0) {
      const newParams = { ...searchParams };
      newParams.name = searchName;
      setSearchParams(newParams);
    }
  };

  const filtersApplied = () => {
    const filters = Object.keys(searchParams).filter(
      (param) => param !== "name" && param !== "sort"
    );
    return filters.length;
  };

  return (
    <section className="home">
      {/* search bar */}
      <div className="search">
        <p className="search-prompt">What are you looking for?</p>
        <input
          className="search-input"
          placeholder="Search..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="search-filter-sort" onClick={toggle}>
          <span>Filter/Sort</span>
          <BiMenuAltLeft size={20} />
          {filtersApplied() > 0 && (
            <div className="filters-applied">{filtersApplied()}</div>
          )}
        </div>
        <FilterSortModal
          isShowing={isShowing}
          hide={toggle}
          searchParams={searchParams}
          setSearchParams={(val) => {
            setSearchParams(
              searchName.length > 0 ? { name: searchName, ...val } : val
            );
          }}
        />
      </div>
      {/* results */}
      {!loading && results !== null && (
        <div className="search-results-header">
          {results?.length} result{results?.length === 1 ? "" : "s"} found
        </div>
      )}
      <div className="search-results">
        {loading ? (
          <div
            style={{
              width: "2rem",
              height: "2rem",
              margin: "0 auto",
            }}
          >
            <Loader />
          </div>
        ) : (
          results?.length > 0 &&
          results?.map((item) => (
            <Link
              key={item._id}
              to={`/yarn/${item._id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Card yarn={item} />
            </Link>
          ))
        )}
      </div>
      {/* hero */}
      <div className="hero">
        <img src="/hero.jpg" alt="hero" width={"100%"} />
      </div>
      {/* suggestions */}
      {topRated?.length > 0 && (
        <div className="yarn-suggestions">
          <p>Don't know what you're looking for?</p>
          <p>Take a look at our top-rated yarns.</p>
          <div className="top-rated">
            {topRated?.map((item) => (
              <Link
                key={item._id}
                to={`/yarn/${item._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Card yarn={item} />
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* quote */}
      <div className="quote-box"></div>
    </section>
  );
}
