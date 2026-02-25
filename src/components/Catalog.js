import React from "react";
import Skeleton from "./BorderBlock/Skeleton.js";
import Border from "./BorderBlock/index.js";

export default function Catalog(props) {
  const boards =
    Array.isArray(props.catalog) && props.catalog.length > 0 ? (
      props.catalog.map((catalog) => (
        <Border key={catalog.id} catalog={catalog} />
      ))
    ) : (
      <h2>По вашему запросу ничего не найдено</h2>
    );

  return (
    <>
      <div className='catalog'>
        {props.isLoading
          ? [...new Array(3)].map((_, index) => <Skeleton key={index} />)
          : boards}
      </div>
    </>
  );
}
