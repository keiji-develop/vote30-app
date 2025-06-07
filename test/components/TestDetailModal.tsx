import React, { useState, useEffect } from 'react';
import { DetailModal } from '../../src/components/DetailModal';
import { loadTestData } from '../services/testDataService';
import type { Tour } from '../../src/types/tour';

export function TestDetailModal() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [active, setActive] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await loadTestData();
        setTours(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load test data');
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (tours.length === 0) return <div>No test data available</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DetailModal Test</h1>
      
      {/* テストケース一覧 */}
      <div className="space-y-4">
        {tours.map(tour => (
          <div key={tour.id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
            <p className="text-gray-600 mb-2">{tour.subtitle}</p>
            <p className="text-sm text-gray-500 mb-4">{tour.description}</p>
            <button
              onClick={() => setActive(tour)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Open Modal
            </button>
          </div>
        ))}
      </div>

      {/* DetailModal */}
      {active && (
        <DetailModal
          active={active}
          setActive={setActive}
          setPreview={(t) => console.log('Preview:', t)}
          tours={tours}
        />
      )}
    </div>
  );
} 