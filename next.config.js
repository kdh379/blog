const { createContentlayerPlugin } = require("next-contentlayer");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
});

// export default withContentlayer(nextConfig);
// module.exports = withContentlayer(nextConfig);
module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
