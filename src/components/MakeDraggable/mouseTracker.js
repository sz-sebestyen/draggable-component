const mouseTracker = () => {
  let x, y;
  let id = 0;
  const subscriptions = {};

  const updateCoords = (event) => {
    x = event.clientX;
    y = event.clientY;

    // console.log("values", Object.values(subscriptions));

    Object.values(subscriptions).map((callback) => callback(x, y));
  };

  window.addEventListener("mousemove", updateCoords);

  return {
    getX: () => x,
    getY: () => y,
    subscibe: (callback) => {
      Object.assign(subscriptions, { [++id]: callback });
      return id;
    },
    ussubscribe: (removeId) => delete subscriptions[removeId],
  };
};

export default mouseTracker();
