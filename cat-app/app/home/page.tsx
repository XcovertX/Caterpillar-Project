'use client'
import { useEffect, useState } from 'react';
import { Customer } from '@/models/customer';

export default function Page() {
  const [customers, setCustomers] = useState(Array<Customer>);
  const url = process.env.URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customer/');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Customer Data</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.firstName} {customer.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}