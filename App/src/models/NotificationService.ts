import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Please enable notification permissions!');
  }
};

const generateNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Drink water pretty please UvU",
        body: "Stay hydrated! Drink Prime",
      },
      trigger: null,
    });
    console.log("Notification sent");
  } catch (error) {
    console.error("Failed to notify", error);
  }
};

export const startNotificationService = () => {
  requestPermissions();
  const interval = setInterval(() => {
    generateNotification();
  }, 60000); // 60000 ms = 1 min

  return () => clearInterval(interval); 
};
