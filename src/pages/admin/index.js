"use client";

import dynamic from "next/dynamic";

const Admin = () => {
  const CMSPage = dynamic(() => import("../../components/cms/CMSPage"), {
    ssr: false,
  });

  return <CMSPage key="admin" />;
};

export default Admin;
