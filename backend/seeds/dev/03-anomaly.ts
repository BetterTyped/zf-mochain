export async function seed(knex): Promise<void> {

  await knex('anomaly').del();
  await knex('anomaly').insert([{
    id: 1,
    sender_address: '0x18908c013b069cCD0232578Bcff1ef9b3425e7a1',
    car_brand: 'Mercedes',
    car_type: 'Passenger',
    position: {
      latitude: 52.237049,
      longitude: 21.017532,
    },
    anomaly: `
 Anomaly detected: speedometer showing 50km/h while gps speed is 70km/h
    `,
    timestamp: new Date().toISOString(),
  },
    {
      id: 2,
      sender_address: '0x18908c013b069cCD0232578Bcff1ef9b3425e7a1',
      car_brand: 'Mercedes',
      car_type: 'Passenger',
      position: {
        latitude: 52.237049,
        longitude: 21.017532,
      },
      anomaly: `
 Anomaly detected: speedometer showing 50km/h while gps speed is 70km/h
    `,
      timestamp: new Date().toISOString(),
    }])

}
