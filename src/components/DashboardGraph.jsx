import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import BASE_URL from "../app/store";

import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryPie,
  VictoryArea,
  VictoryAxis,
} from "victory";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 80vh;
  padding: 1rem;
`;

const ChartContainer = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 48%;
  height: 48%;

  .VictoryContainer {
    height: 60%;
    width: auto;
  }

  svg {
    height: 80%;
    width: auto;
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(BASE_URL + "products");
    setProducts(response.data);
  };

  const colorSchemes = [
    ["#3366cc", "#5899DA", "#99C0E9", "#CCE0FF", "#003366"],
    ["#FF9933", "#F9C177", "#FFC940", "#FFDEAD", "#CC8000"],
    ["#CC3366", "#FF6699", "#FF99CC", "#FFC0CB", "#990033"],
    ["#66CCCC", "#B2DFDB", "#80CBC4", "#26A69A", "#004D40"],
  ];

  return (
    <DashboardContainer>
      <ChartContainer>
        {/* <ChartTitle>Harga Barang (Scatter Chart)</ChartTitle> */}
        <VictoryChart>
          <VictoryScatter
            data={products.map((product) => ({
              x: product.name,
              y: product.price,
            }))}
            style={{
              data: { fill: colorSchemes[0][0], stroke: "black" },
            }}
          />
          <VictoryAxis
            style={{
              tickLabels: { angle: -10, padding: 5 },
            }}
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </ChartContainer>

      <ChartContainer>
        {/* <ChartTitle>Harga Barang (Line Chart)</ChartTitle> */}
        <VictoryChart>
          <VictoryLine
            data={products.map((product) => ({
              x: product.name,
              y: product.price,
            }))}
            style={{
              data: { stroke: colorSchemes[1][1] },
            }}
          />
          <VictoryAxis
            style={{
              tickLabels: { angle: -10, padding: 5 },
            }}
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </ChartContainer>

      <ChartContainer>
        {/* <ChartTitle>Harga Barang (Pie Chart)</ChartTitle> */}
        <VictoryPie
          data={products.map((product) => ({
            x: product.name,
            y: product.price,
          }))}
          colorScale={colorSchemes[2]}
        />
      </ChartContainer>

      <ChartContainer>
        {/* <ChartTitle>Harga Barang (Area Chart)</ChartTitle> */}
        <VictoryChart>
          <VictoryArea
            data={products.map((product) => ({
              x: product.name,
              y: product.price,
            }))}
            style={{
              data: { fill: colorSchemes[3][3] },
            }}
          />
          <VictoryAxis
            style={{
              tickLabels: { angle: -10, padding: 5 },
            }}
          />
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </ChartContainer>
    </DashboardContainer>
  );
};

export default ProductList;
