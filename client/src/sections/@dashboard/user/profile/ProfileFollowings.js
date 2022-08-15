import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import {updateFollowUser} from "../../../../helpers/backend_helper";

// ----------------------------------------------------------------------

ProfileFollowings.propTypes = {
  followings: PropTypes.array,
};

export default function ProfileFollowings({ followings, userFollowings }) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Followings
      </Typography>

      <Grid container spacing={3}>
        {followings.map((following) => (
            userFollowings.includes(following._id) && <Grid key={following?._id} item xs={12} md={4}>
            <FollowingCard following={following} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowingCard.propTypes = {
  following: PropTypes.object,
};

function FollowingCard({ following }) {
  const { firstName:name,_id:id, country, photoURL:avatarUrl, isFollowed } = following;

  const [toggle, setToogle] = useState(isFollowed);
  const handleFollow = async (id) => {
      setToogle(!toggle);
      await updateFollowUser({id});
      console.log(id, "------------------");
  };
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {country}
          </Typography>
        </Box>
      </Box>
        {false && <Button
        size="small"
        onClick={()=>handleFollow(id)}
        variant={toggle ? 'text' : 'outlined'}
        color={toggle ? 'primary' : 'inherit'}
        startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
      >
        {toggle ? 'Followed' : 'Follow'}
      </Button>}
    </Card>
  );
}
