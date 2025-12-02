/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dev2025.7gapp.me",
      "7gapp.me",
      "ibookik.b-cdn.net",
      "bookik.b-cdn.net",
      "192.168.100.190",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Explorer",
        permanent: false,
      },
      {
        source: "/OneVideoPlayerLink/:id", // Capture any ID dynamically
        destination: "/Explorer?id=:id", // Pass the ID as a query parameter
        permanent: false, // Use false for a 307 temporary redirect
      },
    ];
  },
  // async headers() {
  //     return [
  //     {
  //         source: '/(.*)',
  //         headers: [
  //         {
  //             key: 'X-Frame-Options',
  //             value: 'SAMEORIGIN',
  //         },
  //         ],
  //     },
  //     ];
  // },
};

export default nextConfig;
