import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';

import NavMenu from '../components/NavMenu';
import ProfileComponent from '../components/ProfileComponent';

const Profile = () => (
    // Wrap your page inside <Theme> HOC to get bootstrap styling.
    // Theme can also be omitted if react-bootstrap components are not used.
    <Theme>
        <NavMenu />

        <ProfileComponent />
    </Theme>
);

export default Profile;
