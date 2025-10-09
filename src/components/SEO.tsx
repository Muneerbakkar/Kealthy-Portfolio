import { Helmet } from "react-helmet-async";
import React from "react";

const SEO: React.FC<{ title: string; description: string }>  = ({
    title,
    description,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEO;
