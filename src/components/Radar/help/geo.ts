const R = 6371.008;

const deg2rad = (deg: number): number => (deg * Math.PI) / 180;
const rad2deg = (rad: number): number => (rad * 180) / Math.PI;

interface GeoPoint {
  lat: number;
  lng: number;
}

const Geo = {
  distanceTo: function (this: GeoPoint, p: GeoPoint): number {
    const dLat = deg2rad(p.lat - this.lat);
    const dLng = deg2rad(p.lng - this.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(this.lat)) *
        Math.cos(deg2rad(p.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  },
  bearingTo: function (this: GeoPoint, p: GeoPoint): number {
    const dLng = deg2rad(p.lng - this.lng);
    const y = Math.sin(dLng) * Math.cos(deg2rad(p.lat));
    const x =
      Math.cos(deg2rad(this.lat)) * Math.sin(deg2rad(p.lat)) -
      Math.sin(deg2rad(this.lat)) * Math.cos(deg2rad(p.lat)) * Math.cos(dLng);

    const bearing = Math.atan2(y, x);

    return bearing;
  },
};

export { deg2rad, rad2deg };
export default Geo;
