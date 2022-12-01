import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Loader from "./Loader";
import Api from "../utils/api/api";
import "./FilterSortModal.css";

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
              <input value={color} onChange={(e) => setColor(e.target.value)} />
            </section>

            <section className="criteria">
              <span>Brand</span>
              <select onChange={(e) => setBrand(e.target.value)} value={brand}>
                <option key={" "} value={" "}>
                  {" "}
                </option>
                {brandsData?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </section>

            <section className="criteria">
              <span>Weight</span>
              <select
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              >
                <option key={" "} value={" "}>
                  {" "}
                </option>
                {Array(10)
                  .fill()
                  .map((item, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
              </select>
            </section>

            <section className="criteria" style={{ alignItems: "flex-start" }}>
              <span>Material(s)</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "5rem",
                  overflowY: "scroll",
                  paddingRight: "1rem",
                }}
              >
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

            <Button
              clickHandler={handleSubmit}
              text={"Filter/Sort"}
              styles={{ width: "60%", margin: "2rem auto 0 auto" }}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
