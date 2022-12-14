import "./FilterSortModal.css";

import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "react-tippy";

import { yarnWeights } from "../../utils/weights";
import Api from "../../utils/api/api";
import Button from "../Common/Button";
import Loader from "../Common/Loader";
import Modal from "./Modal";

const sortOptions = [
  {
    key: "name:asc",
    name: "A-Z",
  },
  {
    key: "name:desc",
    name: "Z-A",
  },
  {
    key: "rating:asc",
    name: "Average rating (ascending)",
  },
  {
    key: "rating:desc",
    name: "Average rating (descending)",
  },
  {
    key: "reviews:asc",
    name: "No. of reviews (ascending)",
  },
  {
    key: "reviews:desc",
    name: "No. of reviews (descending)",
  },
];

export default function FilterSortModal({
  isShowing,
  hide,
  searchParams,
  setSearchParams,
}) {
  const [color, setColor] = useState(searchParams.color ?? "");
  const [brand, setBrand] = useState(searchParams.brand ?? " ");
  const [weight, setWeight] = useState(searchParams.weight ?? " ");
  const [material, setMaterial] = useState(searchParams.materials ?? []);
  const [sort, setSort] = useState(searchParams.sort ?? "name:asc");

  const [loading, setLoading] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [materialsData, setMaterialsData] = useState([]);

  const handleSubmit = () => {
    const newParams = { sort };
    if (color.length > 0) newParams.color = color;
    if (brand !== " ") newParams.brand = brand;
    if (weight !== " ") newParams.weight = parseInt(weight);
    if (material.length > 0) newParams.materials = material;
    setSearchParams(newParams);
    hide();
  };

  const fetchData = async () => {
    setLoading(true);
    const api = new Api();
    const brands = await api.getBrands();
    setBrandsData(brands);

    const materials = await api.getMaterials();
    setMaterialsData(materials);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReset = () => {
    setColor("");
    setBrand(" ");
    setWeight(" ");
    setMaterial([]);
    setSort("name:asc");
  };

  return (
    <Modal isShowing={isShowing} hide={hide}>
      <div className="filter-sort-container">
        {loading ? (
          <div
            style={{
              width: "2rem",
              height: "2rem",
              margin: "auto",
            }}
          >
            <Loader />
          </div>
        ) : (
          <>
            <section className="criteria">
              <span>Color</span>
              <input
                style={{ marginLeft: "1.5rem" }}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </section>

            <section className="criteria">
              <span>Brand</span>
              <select
                style={{ marginLeft: "1.2rem" }}
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              >
                <option key={" "} value={" "}>
                  {" "}
                </option>
                {brandsData?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {brand !== " " && (
                <Tooltip
                  className="filter-modal-brand-tooltip"
                  disabled={!brandsData?.find((item) => item._id === brand)}
                  title={
                    brandsData?.find((item) => item._id === brand)?.description
                  }
                  position="top"
                  hideOnClick={false}
                >
                  <AiOutlineInfoCircle className="info" size={20} />
                </Tooltip>
              )}
            </section>

            <section className="criteria">
              <span>Weight</span>
              <select
                className="weight-selection"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              >
                <option key={" "} value={" "}>
                  {" "}
                </option>
                {Array(8)
                  .fill()
                  .map((item, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
              </select>
              <span style={{ fontSize: "1rem" }}>{yarnWeights[weight]}</span>
            </section>

            <section className="criteria" style={{ alignItems: "flex-start" }}>
              <span>Material(s)</span>
              <div className="materials-checkboxes">
                {materialsData?.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{item.name}</span>
                    <input
                      type="checkbox"
                      checked={!!material.find((matId) => matId === item._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMaterial([...material, item._id]);
                        } else {
                          setMaterial(
                            material.filter((matId) => matId !== item._id)
                          );
                        }
                      }}
                      id={item._id}
                      name={item.name}
                      value={item._id}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="criteria">
              <span>Sort</span>
              <select onChange={(e) => setSort(e.target.value)} value={sort}>
                {sortOptions.map((op) => (
                  <option key={op.key} value={op.key}>
                    {op.name}
                  </option>
                ))}
              </select>
            </section>

            <section className="filter-modal-btns">
              <Button clickHandler={handleReset} text={"Reset"} />
              <Button clickHandler={handleSubmit} text={"Filter/Sort"} />
            </section>
          </>
        )}
      </div>
    </Modal>
  );
}
