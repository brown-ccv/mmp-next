import CMS from "decap-cms-app";
import { useEffect } from "react";
import "@staticcms/core/dist/main.css";
import type { FC } from "react";

const CMSPage: FC = () => {
  useEffect(() => {
    CMS.init();
  }, []);

  return (
    <div>
      <style jsx global>{`
        html,
        body {
          height: 100%;
        }

        #__next {
          display: none;
        }
      `}</style>
    </div>
  );
};

CMSPage.displayName = "CMSPage";

export default CMSPage;
