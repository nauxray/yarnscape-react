import "./AddYarn.css";

import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { toast } from "react-toastify";

import { isImage } from "../utils/isImage";
import Api from "../utils/api/api";
import AuthApi from "../utils/api/authApi";
import Button from "./Common/Button";
import Loader from "./Common/Loader";

export default function AddYarn({ user, logout }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState(1);
  const [brand, setBrand] = useState();
  const [hookSize, setHookSize] = useState(2);
  const [needleSize, setNeedleSize] = useState(2);
  const [materials, setMaterials] = useState([]);
  const [images, setImages] = useState([""]);

  const [loading, setLoading] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [materialsData, setMaterialsData] = useState([]);

  const fetchData = async () => {
    const api = new Api();
    const brands = await api.getBrands();
    setBrandsData(brands);
    setBrand(brands[0]);

    const matData = await api.getMaterials();
    setMaterialsData(matData);
    setMaterials([{ _id: matData[0]._id, percentage: 100 }]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validate = () => {
    if (name.length === 0) {
      toast.error("Name cannot be empty!");
      return false;
    }
    if (color.length === 0) {
      toast.error("Color cannot be empty!");
      return false;
    }
    if (weight <= 0 || weight > 10) {
      toast.error("Weight must be within 1 to 10!");
      return false;
    }
    if (!brand) {
      toast.error("You must select a brand!");
      return false;
    }
    if (materials?.length <= 0) {
      toast.error("You must select a material!");
      return false;
    }
    if (images.filter((entry) => entry.trim().length > 0).length <= 0) {
      toast.error("You must include at least one image!");
      return false;
    }
    if (
      materials
        ?.map((item) => item.percentage)
        .reduce((sum, a) => sum + a, 0) !== 100
    ) {
      toast.error("Materials percentage must add up to 100!");
      return false;
    }
    if (images.filter((item) => !isImage(item)).length > 0) {
      toast.error("Please enter valid image urls");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const api = new AuthApi();
    setLoading(true);
    const filteredImgs = [...images].filter((entry) => entry.trim().length > 0);
    const res = await api.postYarn(
      name,
      color,
      weight,
      brand,
      hookSize,
      needleSize,
      materials,
      filteredImgs
    );
    if (res.status === 201) {
      toast.success("Yarn successfully added!");
      navigate(`/yarn/${res.data.insertedId}`);
    } else if (res.status === 403) {
      toast.error("Please login again");
      logout();
      navigate("/login");
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="add-yarn-container">
        <p className="add-yarn-header">Please login first! </p>
      </div>
    );
  }

  return (
    <div className="add-yarn-container">
      <p className="add-yarn-header">
        Don’t see the yarn you’re searching for?
      </p>
      <div className="add-yarn-form">
        <div className="add-yarn-form-row">
          <span className="form-label">Name:*</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="add-yarn-form-row">
          <span className="form-label">Color:*</span>
          <input value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className="add-yarn-form-row">
          <div className="inline-form-row">
            <span className="form-label">Weight:*</span>
            <select
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            >
              {Array(10)
                .fill()
                .map((item, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>
          </div>
          <div className="inline-form-row">
            <span className="form-label">Brand:*</span>
            <select
              value={brand?.name}
              onChange={(e) => {
                setBrand(
                  brandsData?.find((item) => item._id === e.target.value)
                );
              }}
            >
              {brandsData?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {brand?.description?.length > 0 && (
              <Tooltip
                title={brand?.description}
                position="top"
                hideOnClick={false}
              >
                <AiOutlineInfoCircle className="icon-btn" size={20} />
              </Tooltip>
            )}
          </div>
        </div>
        <hr className="add-yarn-section-break" />
        <p className="add-yarn-subheader">Recommended hook and needle size</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "5rem",
            rowGap: "1rem",
          }}
        >
          <div className="add-yarn-form-row">
            <span className="form-label">Hook (mm):*</span>
            <input
              value={hookSize}
              type="number"
              min={0}
              max={30}
              onChange={(e) => setHookSize(parseFloat(e.target.value))}
            />
          </div>
          <div className="add-yarn-form-row">
            <span className="form-label">Needle (mm):*</span>
            <input
              value={needleSize}
              type="number"
              min={0}
              max={30}
              onChange={(e) => setNeedleSize(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <div className="add-yarn-images">
          <span className="form-label" style={{ marginRight: "2rem" }}>
            Material(s)*
          </span>
          <div className="add-yarn-images-row">
            {materials?.map((item, index) => (
              <div key={index}>
                <IoIosAddCircleOutline
                  size={30}
                  className="icon-btn"
                  onClick={() =>
                    setMaterials([
                      ...materials,
                      { _id: materialsData[0]._id, percentage: 0 },
                    ])
                  }
                />
                <select
                  style={{ margin: 0 }}
                  value={item._id}
                  onChange={(e) => {
                    const newArr = [...materials];
                    newArr[index] = {
                      _id: e.target.value,
                      percentage: item.percentage,
                    };
                    setMaterials(newArr);
                  }}
                >
                  {materialsData?.map((mat) => (
                    <option key={mat._id} value={mat._id}>
                      {mat.name}
                    </option>
                  ))}
                </select>
                <div className="yarn-material-percentage">
                  <input
                    style={{ width: "4rem", paddingRight: 0 }}
                    type="number"
                    value={item.percentage}
                    min={1}
                    max={100}
                    onChange={(e) => {
                      const newArr = [...materials];
                      newArr[index] = {
                        _id: item._id,
                        percentage: parseInt(e.target.value),
                      };
                      setMaterials(newArr);
                    }}
                  />
                  %
                </div>
                {index > 0 && (
                  <AiOutlineClose
                    size={25}
                    className="icon-btn"
                    onClick={() => {
                      const newMats = [...materials];
                      newMats.splice(index, 1);
                      setMaterials(newMats);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="add-yarn-images">
          <span className="form-label">Image URL(s)*</span>
          <div className="add-yarn-images-row">
            {images?.map((item, index) => (
              <div key={index}>
                <IoIosAddCircleOutline
                  size={30}
                  className="icon-btn"
                  onClick={() => setImages([...images, ""])}
                />
                <input
                  style={{ margin: 0 }}
                  value={item}
                  onChange={(e) => {
                    const newArr = [...images];
                    newArr[index] = e.target.value;
                    setImages(newArr);
                  }}
                />
                {index > 0 && (
                  <AiOutlineClose
                    size={25}
                    className="icon-btn"
                    onClick={() => {
                      const newImgs = [...images];
                      newImgs.splice(index, 1);
                      setImages(newImgs);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className="add-yarn-section-break" />
        {loading ? (
          <div style={{ width: "2rem", height: "2rem", margin: "0 auto" }}>
            <Loader />
          </div>
        ) : (
          <Button clickHandler={handleSubmit} text={"Add Yarn"} />
        )}
      </div>
    </div>
  );
}
