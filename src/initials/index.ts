import {getNotificationBadgeSetting, setBadgeCount} from 'react-native-notification-badge';

export const setBadgeCountNoti = async (count: number): Promise<void> => {
  const permissions = await getNotificationBadgeSetting();
  if (permissions === 'enabled') {
    await setBadgeCount(count);
  }
};
