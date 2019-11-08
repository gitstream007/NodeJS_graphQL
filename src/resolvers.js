const cars = [
    {
        carId: 666,
        carType: "sport",
        carState: "not_assigned",
        driver: {
            driverId: 1,
            driverName: "jack"
        }
    },
    {
        carId: 777,
        carType: "urban",
        carState: "assigned",
        driver: {
            driverId: 2,
            driverName: "john"
        }
    }
];

const drivers = [
    {
        driverId: 1,
        driverName: "jack",
        carIds: [],
        driverState: "sleeping",
    },
    {
        driverId: 2,
        driverName: "john",
        carIds: [],
        driverState: "driving",
    }
];

const resolvers = {
    Query: {
        cars: () => cars,
        car: (parent, { carId }) => cars.find(car =>
            car.carId == carId),

        drivers: () => drivers,
        driver: (parent, { driverId }) => drivers.find(driver =>
            driver.driverId == driverId),
    },
    Mutation: {
        createCar: (parent, {
            carId,
            driver,
            carType,
            carState,
        }) => {

            let usedID = cars.findIndex(car =>
                car.carId === carId);
            if (usedID === -1) {
                let newCar = {
                    carId,
                    driver,
                    carType,
                    carState,
                };
                cars.push(newCar);
            } else {
                throw new Error(" carId already used");
            }
        },


        assignCars: (parent, {carId, driverId} ) => {
            let link = cars.carIds.includes(carId);
            if(link) {
                let existentCar = carId;

                let existentDriver = drivers.findIndex(driver => driver.driverId === driverId);

                if (existentCar !== -1 && existentDriver !== -1) {
                    cars[existentCar] = {
                        ...cars[existentCar],
                        state: "assigned",
                        driver: {
                            driverId: driverId,
                            driverName: drivers[driverId].driverName
                        }
                    }
                }
            }
            else {
                throw new Error(" please define valid carId or driverId");
            }
        },


        // todo à modifier pour retirer 1 car d'un driver
        unassignCar: (parent, {carId, driverId}) => {
            let usedID = cars.findIndex(car =>
                car.carId === carId);
            if (usedID !== -1) {
                cars.splice(usedID, 1);
            } else {
                throw new Error(" unknown carId");
            }
        },
    }
};

export default resolvers;
