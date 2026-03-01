import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props?: {}) => (
  <ContentLoader
    speed={2}
    width={362}
    height={547}
    viewBox='0 0 362 547'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='20' y='20' rx='11' ry='11' width='300' height='292' />
    <rect x='20' y='339' rx='13' ry='13' width='300' height='22' />
    <rect x='20' y='385' rx='13' ry='13' width='300' height='22' />
    <rect x='20' y='425' rx='13' ry='13' width='300' height='22' />
    <rect x='20' y='465' rx='25' ry='25' width='300' height='40' />
  </ContentLoader>
);

export default Skeleton;
