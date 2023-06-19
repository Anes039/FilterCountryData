import React from "react";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import "./CountryList.css";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v2/all?fields=name,region,area"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterCountries = () => {
    const findLithuania = data.find((country) => country.name === "Lithuania");
    const filterByOceania = data.filter(
      (country) => country.region === "Oceania"
    );

    const filterSmallerThanLithuania = filterByOceania.filter(
      (country) => country.area < findLithuania.area
    );

    setData(filterSmallerThanLithuania);
  };

  const sortData = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortOrder === "ascending") {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
      }

      return 0;
    });

    setData(sortedData);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "ascending" ? "descending" : "ascending";
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <div>
        <button onClick={toggleSortOrder}>
          {sortOrder === "ascending" ? "Sort Descending" : "Sort Ascending"}
        </button>
        <button onClick={sortData}>Sort</button>
        <button onClick={filterCountries}>
          Filter countries smaller than Lithuania
        </button>
      </div>
      <Card>
        <ul>
          {data.map((country, index) => (
            <li key={index}>
              <p>Name: {country.name}</p>
              <p>Region: {country.region}</p>
              <p>Area Size: {country.area}</p>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};
export default CountryList;
