const d = require('./data')

const FUEL_COST = 140
const DISTANCE_LOWER_LOAD = 100000
const AVERAGE_PASSENGERS = 3

const o = {
  lat: 138.4906,
  long: 36.7193,
}

function distance(d, o) {
  const y1 = (d.lat * Math.PI) / 180
  const x1 = (d.long * Math.PI) / 180
  const y2 = (o.lat * Math.PI) / 180
  const x2 = (o.long * Math.PI) / 180
  const earth_r = 6378140

  const deg = Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)
  const res = Math.round(earth_r * (Math.atan(-deg / Math.sqrt(-deg * deg + 1)) + Math.PI / 2))
  return res + DISTANCE_LOWER_LOAD
}

// TODO: 首都高を考慮
function highWayCost(d, o) {
  return (distance(d, o) - DISTANCE_LOWER_LOAD) / 40
}

function gasolineCost(d, o) {
  return (FUEL_COST * distance(d, o)) / d.fuel
}

function costFromDistance(d, o) {
  return gasolineCost(d, o) + highWayCost(d, o)
}

function oneWayCosts() {
  return d.reduce((car, cur) => {
    console.log(cur.alias, costFromDistance(cur, o))
    return car + costFromDistance(cur, o)
  }, 0)
}

console.log((oneWayCosts() * 2) / d.length / AVERAGE_PASSENGERS)
