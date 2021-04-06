module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/${process.env.ROOTNOTIONPAGEID}`,
        permanent: true
      }
    ]
  }
}
