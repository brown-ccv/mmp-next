/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      ...[
        {
          test: /\.ya?ml$/,
          use: "js-yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
        {
          test: /\.md$/,
          loader: "frontmatter-markdown-loader",
          options: { mode: ["react-component"] },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    );
    return config;
  },
  async redirects() {
    return [{ source: "/", destination: "/mmp", permanent: false }];
  },
};

module.exports = nextConfig;
