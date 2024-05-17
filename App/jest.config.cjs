/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    "preset": "jest-expo",
    verbose: true
  };
};