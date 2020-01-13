import React from 'react';
import TrafficTower from '../instances/trafficTower';
import Plane from '../instances/plane';

const S = 1000;

class Airport extends React.Component{
  render(){
    let plane1 = new Plane(1, 5*S);
    let plane2 = new Plane(2, 3*S);
    let plane3 = new Plane(3, 10*S);
    let plane4 = new Plane(4, 2*S);

    let tower = new TrafficTower(3);
    
    tower.addPlane(plane1)
    tower.addPlane(plane2)
    tower.addPlane(plane3)
    tower.addPlane(plane4)

    tower.processing()

    return<></>
  }
}

export default Airport;