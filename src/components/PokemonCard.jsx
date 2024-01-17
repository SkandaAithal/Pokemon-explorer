import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Placeholder from "./placeholdergif.gif";
import BgImage from "./bgimage.png";
function PokemonCard({ name, image }) {
  const [loading, setLoading] = useState(true);

  //! after the image is loaded this function executes
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Card>
      <Link
        to={`/singlepokemon/${name}`}
        className="link"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {loading && (
          <img style={{ width: "15rem" }} src={Placeholder} alt="image" />
        )}
        <img
          src={image}
          onLoad={handleImageLoad}
          style={{ display: loading ? "none" : "block" }}
          alt="image"
        />
        <h1>{name}</h1>
      </Link>
    </Card>
  );
}

export default PokemonCard;
const Card = styled.div`
  border: 2px solid #040404;
  box-shadow: inset 0 0 0 10px rgba(0, 92, 173, 0.5),
    inset 0 0 0 15px rgba(0, 85, 159, 0.2);
  background-color: #8aa2d7;
  padding: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(#a8beec, rgba(165, 137, 192, 0.9)),
    url(${BgImage});
  background-position: 0% 100%;
  background-size: 200%;
  background-repeat: no-repeat;
  text-align: center;
  margin: auto;
  .link {
    text-decoration: none;
    color: black;
  }
  h1 {
    text-transform: capitalize;
    font-size: 2rem;
    padding-top: 1rem;
    font-family: monospace;
  }
  img {
    object-fit: contain;
    width: 100%;
    height: 15rem;
    transition: scale 0.3s;
    &:hover {
      scale: 1.15;
    }
  }
`;
