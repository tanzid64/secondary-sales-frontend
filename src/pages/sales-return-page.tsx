import { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const SalesReturn: FC = () => {
    const navigate = useNavigate();
    // Filtering
    const [searchParams, setSearchParams] = useSearchParams({});
    useEffect(() => {
      setSearchParams({});
      // setSearchQuery({ cursor: "", search: "" });
    }, []);
  return(
    <div className=''>
      SalesReturn
    </div>
  );
};

export default SalesReturn;
