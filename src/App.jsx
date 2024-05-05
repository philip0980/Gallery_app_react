import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/photos/?client_id=EEDbf4z-h-Ac9bxXvQuRjxSHqVLVbU4rPhevHigcW2I&&per_page=20"
      )
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      });
  }, []);

  const searchImage = (query) => {
    const result = data.filter((image) => {
      const description = image.alt_description || "no description"; // Default if null
      return description.toLowerCase().includes(query.toLowerCase()); // Case-insensitive search
    });
    setFilteredData(result); // Update state with filtered results
  };
  return (
    <div>
      <div
        className="search_box"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => searchImage(e.target.value)}
          style={{ padding: "10px 60px", marginTop: "10px" }}
        />
      </div>
      <div className="images">
        <p style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredData.map((dta) => (
            <center>
              <div className="image" style={{ margin: "10px 30px" }}>
                <img src={dta.urls.small} width={"270px"} height={"350px"} />
                <p>{dta.alt_description.split("", 20)}</p>
              </div>
            </center>
          ))}
        </p>
      </div>
    </div>
  );
};

export default App;
