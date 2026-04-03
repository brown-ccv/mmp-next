import path from "path";
import fs from "fs";
import { GetServerSideProps, MetadataRoute } from "next";

type PageProps = {
  routes: string[];
};
// Required for static export
export const dynamic = "force-static";

const baseUrl = process.env.SITE_URL || "http://localhost:3000";
const baseDir = "src/pages";

const CACHE_DURATION = 60 * 60 * 24; // 24 hours in seconds
const LAST_MODIFIED = new Date().toUTCString();

function generateSiteMap(fullPath: string, routes: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>http://localhost:3000/</loc>
     </url>
     ${routes
       .map((route) => {
         return `
       <url>
           <loc>${`${fullPath}${route}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req,
  res,
}) => {
  const fullPath = path.join(process.cwd(), baseDir);
  let routes: string[] = ["/"]; // Always include home page

  function scanDirectory(dirPath: string, currentRoute: string = "") {
    try {
      // const entries = []
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      entries.forEach((entry) => {
        if (entry.isDirectory()) {
          const routePath = currentRoute
            ? `${currentRoute}/${entry.name}`
            : `/${entry.name}`;

          const subDirPath = path.join(dirPath, entry.name);

          // Only add route if it has a page.tsx file
          const pageFilePath = path.join(subDirPath, "index.js");
          if (fs.existsSync(pageFilePath)) {
            routes.push(routePath.replace("[project]", "mmp"));
            routes.push(routePath.replace("[project]", "lamp"));
          }

          // Recursively scan subdirectories
          scanDirectory(subDirPath, routePath);
        }
      });
    } catch (error) {
      // Handle case where directory doesn't exist or can't be read
      console.warn(`Could not read directory: ${dirPath}`);
    }
  }

  // Start scanning from the base directory
  scanDirectory(fullPath);
  console.log(routes);
  const sitemap = generateSiteMap(fullPath, routes);
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", `public, max-age=${CACHE_DURATION}`); // Cache for 24 hours
  res.setHeader("Last-Modified", LAST_MODIFIED);
  res.write(`<?xml version="1.0" encoding="UTF-8"?>`);
  res.write(sitemap);
  res.end();
  return { props: { routes } };
};

export default function SiteMap() {
  // return getRoutes()
}
