import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Typography, Modal, Box, CircularProgress } from '@mui/material';
import { LaunchContext } from '../context/LaunchContext';
import { Launch } from '../interfaces/Launch';
import { fetchLaunchDetail } from '../services/LaunchService';

const LaunchDetail: React.FC = () => {
  const [launch, setLaunch] = useState<Launch | null>(null);
  const { launchId } = useParams<{ launchId: string }>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const previousUrl = location.state?.previous;
  const {setLaunchesFromCache} = useContext(LaunchContext) || {};

 useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const launchData = await fetchLaunchDetail(launchId || '');
                setLaunch(launchData);
                setOpen(true);
            } catch (error) {
                console.error('Error fetching launch details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (launchId) {
            fetchDetail();
        }
    }, [launchId]);

  const handleClose = () => {
    setOpen(false);
    // const cachedData = localStorage.getItem(previousUrl || '');
    // console.log('previousUrl', previousUrl);
    // console.log('cachedData', cachedData);
    // if (cachedData) {
    //   const parsedData = JSON.parse(cachedData);
    //   console.log(parsedData.results);
    //   setLaunchesFromCache?.(parsedData.results);
    // }
    // else {
    //   navigate('/');
    // }
    navigate('/');
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
      if (scrollTop + clientHeight >= scrollHeight) {
        // Fetch more data here
      }
    }
  };

  if (loading || !launch) {
    return (
      <Modal open={true}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          p: 4,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#333' }}>Launch Details</Typography>
        <Typography variant="h4" sx={{ marginBottom: 2, color: '#333' }}>{launch.name}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: '#666' }}>Rocket: {launch.rocket.configuration.name}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: '#666' }}>Country: {launch.pad.location.country_code}</Typography>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#333' }}>Mission Details</Typography>
        <Typography variant="h4" sx={{ marginBottom: 2, color: '#333' }}>{launch.mission.name}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: '#666' }}>About: {launch.mission.description}</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: '#666' }}>Orbit: {launch.mission.orbit.name}</Typography>
      </Box>
    </Modal>
  );
};

export default LaunchDetail;
