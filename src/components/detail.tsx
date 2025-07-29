import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import useFetchDetails from '../utils/useFetchDetails';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { item, loading, error, fetchDetails } = useFetchDetails();
  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id, fetchDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>No details found</div>;
  }
  const currentPage = searchParams.get('page') || '1';
  return (
    <div className="detail">
      <button onClick={() => navigate(`/?page=${currentPage}`)}>Close</button>
      <h3>{item.name}</h3>
      <p data-testid="gender">
        <strong>Gender:</strong> {item.gender}
      </p>
      <p data-testid="height">
        <strong>Height:</strong> {item.height}
      </p>
      <p>
        <strong>Mass:</strong> {item.mass}
      </p>
      <p>
        <strong>Birth Year:</strong> {item.birth_year}
      </p>
      <p>
        <strong>Skin Color:</strong> {item.skin_color}
      </p>
      <p>
        <strong>Hair Color:</strong> {item.hair_color}
      </p>
      <p>
        <strong>Eye Color:</strong> {item.eye_color}
      </p>
      <p>
        <strong>Home world:</strong> {item.homeworld}
      </p>
    </div>
  );
};

export default Detail;
