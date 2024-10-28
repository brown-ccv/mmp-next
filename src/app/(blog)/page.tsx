import Layout from "@/components/Layout";
import type { FC } from "react";

const Admin: FC = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-auto items-center justify-center py-0 px-6">
          <div>
            <h1 className="text-4xl m-0 font-medium md:text-5xl">
              Hi, We&apos;re Next.js & Static CMS<span className="text-[#15847d]">.</span>
            </h1>
            <span className="inline-block mt-1 text-gray-400 tracking-wider">@nextjs-static-cms-blog</span>
            <h2 className="text-3xl font-normal md:text-4xl">A blog template with Next.js and Static CMS.</h2>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Admin;
