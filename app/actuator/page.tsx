'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

// Define the type for an actuator
interface Actuator {
  id: number; // Adjust type based on your schema (e.g., string if using UUIDs)
  name: string;
  description: string;
}

const IssuesPage: React.FC = () => {
  const [actuators, setActuators] = useState<Actuator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActuators = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Failed to fetch actuators');
        }
        const data: Actuator[] = await response.json();
        setActuators(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchActuators();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Button>
        <Link href='/actuator/new'>New Actuator</Link>
      </Button>
      <h2>Actuators List</h2>
      <ul>
        {actuators.map((actuator) => (
          <li key={actuator.id}>
            <strong>{actuator.name}</strong>: {actuator.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssuesPage;
