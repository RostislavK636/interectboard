import React from "react";
import Skeleton from "./BorderBlock/Skeleton";
import Border from "./BorderBlock/index";

type CatalogItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  rating: number;
  category: number;
};

interface CatalogType {
  catalog: Array<CatalogItem>;
  isLoading: boolean;
}

export default function Catalog({ catalog, isLoading }: CatalogType) {
  const boards =
    Array.isArray(catalog) && catalog.length > 0 ? (
      catalog.map((item: CatalogItem) => (
        <Border key={item.id} catalog={item} />
      ))
    ) : (
      <h2>По вашему запросу ничего не найдено</h2>
    );

  return (
    <>
      <div className='catalog'>
        {isLoading
          ? [...new Array(3)].map((_, index) => <Skeleton key={index} />)
          : boards}
      </div>
    </>
  );
}
