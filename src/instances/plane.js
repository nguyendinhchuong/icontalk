

class Plane {
  constructor(id, duration) {
    this.planeID = id;
    this.duration = duration
  }
  usingCompleted = () => {
    this.duration = 0;
  }
  getPlaneID = () => {
    return this.planeID;
  }
  getPlaneDuration = () => {
    return this.duration;
  }
}

export default Plane