/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = nextConfig
module.exports = {
  images: {
    domains: [
      "i.ibb.co",
      "localhost:3000",
      "example.com",
      "cloudfront.net",
      "mrkoachman.com"
    ],
  },
  env: {
    //RazorPay keys
    RAZORPAY_KEY: "rzp_test_XT5NZr4gUPVJV4",
    RAZORPAY_SECRET: "ciVeiPXbBtC3oePuMHQ5KuJK",
  },
};




