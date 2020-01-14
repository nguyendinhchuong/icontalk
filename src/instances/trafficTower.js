import RunWay from './runWay'

class Queue {
  constructor() {
    this.items = [];
  }
  isEmpty = () => {
    return this.items.length === 0;
  }
  enQueue = (item) => {
    this.items.push(item);
  }
  deQueue = () => {
    if (this.isEmpty()) {
      return null;
    }
    this.items.splice(0, 1);
  }
  front = () => {
    if (this.isEmpty())
      return null;
    return this.items[0]
  }
}

class TrafficTower {
  constructor(NumOfRunWay) {
    this.PlaneQueue = new Queue();
    this.RunWayList = this.initRunWayList(NumOfRunWay);
    this.TimeProcesList = [];
  }
  initRunWayList = (NumOfRunWay) => {
    let list = [];
    for (let i = 0; i < NumOfRunWay; ++i) {
      list.push(new RunWay("No " + (i + 1)))
    }
    return list;
  }
  addPlane = (plane) => {
    this.PlaneQueue.enQueue(plane)
  }
  removePlane = (plane) => {
    this.PlaneQueue = this.PlaneQueue.filter(_plane => _plane.getPlaneID() !== plane.getPlaneID())
  }
  findMin = () => {
    return Math.min(...this.TimeProcesList)
  }
  removeMin = (min) => {
    const index = this.TimeProcesList.findIndex(time => time === min)
    this.TimeProcesList = this.TimeProcesList.splice(index, 1);
  }
  searchingAvailable = async (plane) => {
    this.TimeProcesList.push(plane.duration);
    const availableIndex = this.RunWayList.findIndex(RunWay => RunWay.getRunWayStatus());
    if (availableIndex !== -1) return availableIndex;
    const min = this.findMin();
    await new Promise(res=> setTimeout(res, min));
    this.removeMin(min)
    const certainAvailableIndex = this.RunWayList.findIndex(RunWay => RunWay.getRunWayStatus());
    if (certainAvailableIndex !== -1) return certainAvailableIndex;
  }
  processing = async () => {
    while (!this.PlaneQueue.isEmpty()) {
      const plane = this.PlaneQueue.front();
      this.PlaneQueue.deQueue();
      console.log(`Plane ${plane.planeID} need to use run way.`);
      console.log("Searching available run way ...");
      const availableRunWayIndex = await this.searchingAvailable(plane);
      console.log(`Run way ${this.RunWayList[availableRunWayIndex].getName()} is available.`);
      this.RunWayList[availableRunWayIndex].setBusy(plane.duration, plane);
    }
  }
}

export default TrafficTower