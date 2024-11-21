import React, { useEffect, useState } from "react";
import axios from "axios";

const HowToUse = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/settings/howToUse")
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching how-to-use content:", error);
      });
  }, []);

  return (
    <div>
      <h1>{content?.title}</h1>
      <p>{content?.description}</p>
      <ul>
        {content?.steps?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default HowToUse;
