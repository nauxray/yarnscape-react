import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../utils/api/api";

export default function YarnDetails() {
  const yarnId = useParams().id;
  const [details, setDetails] = useState(null);

  const getYarnDetails = async () => {
    const res = await new Api().getYarn(yarnId);
    setDetails(res);
  };

  useEffect(() => {
    getYarnDetails();
  }, []);

  return <div>{details?.name}</div>;
}
