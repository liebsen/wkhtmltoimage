module.exports = {
  buildSql: (data, ip, geoip, conn) => {
    var saveObj = {}
    if (ip && geoip) {
      const parts = geoip.split("\t")
      saveObj = {
        ip: ip,
        country: parts[0].split(' ')[1],
        country_iso: parts[1].toLowerCase(),
        city: parts[2],
        region: parts[3],
        lat: parts[4],
        lng: parts[5].replace('\n', '')
      }
    }
    if (data) {
      saveObj = Object.assign({}, saveObj, data)
    }
    let pairs = []
    let values = ''
    for (var i in saveObj) {
      pairs.push(`${i} = ${conn.escape(saveObj[i])}`)
    }
    return pairs.join(', ')
  }
}