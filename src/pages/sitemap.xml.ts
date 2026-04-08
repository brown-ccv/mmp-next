import path from "path";
import fs from "fs";
import { GetServerSideProps, MetadataRoute } from "next";

type PageProps = {
  routes: string[];
};

const baseUrl = process.env.SITE_URL || "http://localhost:3000";
const baseDir = "src/pages";

const CACHE_DURATION = 60 * 60 * 24; // 24 hours in seconds
const LAST_MODIFIED = new Date().toUTCString();
const EXCLUDED_DIRS = ["admin", "api", "_app", "_document"];
const INDEX_FILES = ["index.js", "index.ts", "index.tsx"];

function generateSiteMap(fullPath: string, routes: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${routes
       .map((route) => {
         return `
       <url>
           <loc>${`${baseUrl}${route}`}</loc>
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
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      entries.forEach((entry) => {
        if (!entry.isDirectory()) return;

        // Skip underscore-prefixed and excluded directories
        if (entry.name.startsWith("_") || EXCLUDED_DIRS.includes(entry.name)) {
          return;
        }

        const routePath = currentRoute
          ? `${currentRoute}/${entry.name}`
          : `/${entry.name}`;
        console.log(routePath);

        const subDirPath = path.join(dirPath, entry.name);
        // Recursively scan subdirectories
        // Check if the directory has an index file
        const hasIndexFile = INDEX_FILES.some((file) =>
          fs.existsSync(path.join(subDirPath, file)),
        );

        if (hasIndexFile) {
          if (routePath.includes("[project]")) {
            routes.push(routePath.replace("[project]", "mmp"));
            routes.push(routePath.replace("[project]", "lamp"));
          } else {
            routes.push(routePath);
          }
        }
        // Recursively scan subdirectories
        scanDirectory(subDirPath, routePath);
      });
    } catch (error) {
      // Handle case where directory doesn't exist or can't be read
      console.warn(`Could not read directory: ${dirPath}`);
    }
  }

  // Start scanning from the base directory
  scanDirectory(fullPath);
  const sitemap = generateSiteMap(fullPath, routes);
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", `public, max-age=${CACHE_DURATION}`); // Cache for 24 hours
  res.setHeader("Last-Modified", LAST_MODIFIED);
  res.write(sitemap);
  res.end();
  return { props: { routes } };
};

export default function SiteMap() {}
