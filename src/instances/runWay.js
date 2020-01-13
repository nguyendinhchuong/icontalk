class RunWay {
  constructor(name) {
    this.runWayName = name;
    this.available = true;
  }
  getRunWayStatus = () => {
    return this.available;
  }
  getName = () => {
    return this.runWayName;
  }
  busy = (usingTime) => {
    return new Promise(resolve => setTimeout(resolve, usingTime))
  }
  setBusy = async (usingTime, plane) => {
    console.log(`${this.runWayName} is used in ${usingTime}.`);
    this.available = false;
    await this.busy(usingTime);
    console.log(`${this.runWayName} is available now.`);
    console.log(`Plane ${plane.planeID} takes off successfully.`);
    plane.usingCompleted();
    this.available = true;
  }
}
export default RunWay