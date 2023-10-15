
import { Customer } from '@/models/customer';

export default async function Page() {

  const response = await fetch(process.env.URL + '/api/customer');
  console.log(response);
  const data = response.json()
  console.log(data);
  return (
    <div>
      <h1>Customer Data</h1>
      {/* <ul>
        {data.map((customer) => (
          <li key={customer.id}>
            {customer.firstName} {customer.lastName}
          </li>
        ))}
      </ul> */}
    </div>
  );
}