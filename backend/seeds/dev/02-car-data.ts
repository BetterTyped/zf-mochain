
const pick = (i, arr) => arr[i%arr.length];

const generateData = () => {

  const addresses = [
    '0x18908c013b069cCD0232578Bcff1ef9b3425e7a1',
    '0xC9e46EcE0116a3dBA6B61A07EA693F2B86275b66',
    '0x350f4C2c72DdDC1B7C895C37c85dA47B50fAE898',
  ]

  const carBrands = [
    'Mercedes',
    'Audi',
    'Lexus',
    'Toyota',
  ]

  const temperature = Array.from(Array(20), (k, i) => i+1);
  const speed = Array.from(Array(20), (k, i) => i*9);
  const output = [];

  for (let i = 0; i < 100; i++) {

    const carData = {
      id: i+1,
      sender_address: pick(i, addresses),
      car_brand: pick(i, carBrands),
      weather: {
        units: 'metric',
        temperature: pick(i, temperature),
        humidity: 20,
        wind: {
          speed: pick(i, temperature),
          degree: 0,
        }
      },
      speed: pick(i, speed),
      position: {
        latitude: 52.237049,
        longitude: 21.017532,
      },
      timestamp: new Date().toISOString(),
    }

    console.log(carData)
    output.push(carData);
  }

  return output;
}

export async function seed(knex): Promise<void> {

  await knex('car_data').del();
  await knex('car_data').insert(generateData())

}
