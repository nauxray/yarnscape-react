import "./Home.css";

import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";

import Api from "../utils/api/api";
import Card from "./Card";
import Loader from "./Loader";

export default function Home() {
  const api = new Api();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
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
      setSearchParams({ name: searchName });
    }
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
        {/* Todo: open modal */}
        <div className="search-filter-sort">
          <span>Filter/Sort</span>
          <BiMenuAltLeft size={20} />
        </div>
      </div>
      {/* results */}
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
        ) : results.length > 0 ? (
          results.map((item) => <Card key={item._id} yarn={item} />)
        ) : (
          <div style={{ textAlign: "center" }}>
            {Object.keys(searchParams).length > 0 ? "No match found" : ""}
          </div>
        )}
      </div>
      {/* hero */}
      <div className="hero">
        <img src="/hero.jpg" alt="hero" width={"100%"} />
      </div>
      {/* suggestions */}
      {topRated.length > 0 && (
        <div className="yarn-suggestions">
          <p>Don't know what you're looking for?</p>
          <p>Take a look at our top-rated yarns.</p>
          <div className="top-rated">
            {topRated.map((item) => (
              <Card key={item._id} yarn={item} />
            ))}
          </div>
        </div>
      )}
      {/* quote */}
      <div className="quote-box"></div>
    </section>
  );
}
