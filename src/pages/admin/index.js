"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Admin = () => {
  const CMSPage = useMemo(
    () =>
      dynamic(() => import("../../components/cms/CMSPage"), {
        ssr: false,
      }),
    [],
  );

  return <CMSPage key="admin" />;
};

export default Admin;
