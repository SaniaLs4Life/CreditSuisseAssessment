import React, {
  useEffect,
  lazy,
  Suspense,
  useState,
  useLayoutEffect,
  useRef
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { MdClose } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';
import {
  CustomHeader,
  CustomButton,
  Divider,
  CustomSortButton,
  CustomSearchInput,
  CustomCloseButton
} from './CustomComponents';
import { loadMatters } from '../store/actions';
import CustomPagination from './CustomPagination';
import { ExportCSV } from './ExportCSV';
import { MattersService } from '../Services/MattersService';
import { ToggleContent, Modal } from './MessagePopup';

const LazyLoadMattersTable = lazy(() => import('./MattersTable'));

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [second, setSecond] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [sortBy, setSortBy] = useState({ field: 'Id', type: 'asc' });
  const [search, setSearch] = useState('');
  const isUnmounted = useRef(false);
  const dispatch = useDispatch();
  const matters = useSelector(state => state.matters);

  useEffect(() => {
    fetchMatters();
  }, [page, search, sortBy]);

  const fetchMatters = async () => {
    try {
      const res = await MattersService.getMatters(page, search, sortBy);
      setTotal(parseInt(res.headers['x-total-count']));
      dispatch(loadMatters(res.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    let timer;
    if (second === 3) setShowMessage(false);
    if (showMessage) timer = setTimeout(() => {setSecond(prevState => prevState + 1)}, 1000);
    return () => clearTimeout(timer);    
  }, [second]);

  const changePageNumber = type => {
    if (type === 'increment') {
      setPage(prevState => prevState + 1);
    } else {
      if (page !== 1) {
        setPage(prevState => prevState - 1);
      }
    }
  };

  const handleChangePagination = e => {
    if (!e.target.value) {
      setPage(1);
    } else {
      setPage(parseInt(e.target.value));
    }
  };

  const handleReload = () => {
    setSearch('');
    setSortBy({});
    fetchMatters();
  };

  const handleSortBy = (field, type) => {
    setSortBy({ ...sortBy, field: field, type: type });
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <CustomHeader>Online Reporting - GCMC</CustomHeader>
      <Link to='/form'>
        <CustomButton>Create a new matter</CustomButton>
      </Link>
      <Divider />
      <CustomHeader>My team active items</CustomHeader>
      <CustomSortButton noRightBorder inline onClick={() => handleReload()}>
        Reload
      </CustomSortButton>
      <ExportCSV csvData={matters} />
      <span style={{ padding: '0 15px 0 15px' }}>
        Request completed. Result content: {matters && matters.length}
      </span>
      <CustomPagination
        changePageNumber={changePageNumber}
        total={total}
        handleChangePagination={handleChangePagination}
        page={page}
      />
      <CustomSearchInput
        value={search}
        placeholder='Search...'
        onChange={handleSearch}
      />
      <Suspense fallback={<Skeleton height='80px' count={5} />}>
        <LazyLoadMattersTable
          matters={matters}
          handleSortBy={handleSortBy}
          sortBy={sortBy}
        />
      </Suspense>
      <CustomPagination
        changePageNumber={changePageNumber}
        total={total}
        handleChangePagination={handleChangePagination}
        page={page}
      />
      <ToggleContent
        isVisible={showMessage}
        setShowMessage={setShowMessage}
        content={hide => (
          <Modal>
            <h4>
              <FaInfo /> Message
            </h4>
            New matters added successfully.
            <CustomCloseButton>
              <MdClose
                onClick={hide}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </CustomCloseButton>
          </Modal>
        )}
      />
    </div>
  );
}
