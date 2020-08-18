import React from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import util from '../assets/utils/util';

const BackIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const Navbar = () => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon}/>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
        <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  return (
    <Layout style={styles.container} level='1'>
      <TopNavigation
        alignment='center'
        title={() => (<Text style={{ color: util.green, fontSize: util.sm_fontsize, fontFamily: util.poppins_regular }}>My Wallet</Text>)}
        accessoryLeft={renderBackAction}
        // accessoryRight={renderRightActions}
      />
    </Layout>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    // minHeight: 128,
  },
});