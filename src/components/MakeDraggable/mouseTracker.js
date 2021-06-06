const mouseTracker = () => {
  let x, y;
  let id = 0;
  const subscriptions = {};

  const move = (event) => {
    x = event.clientX;
    y = event.clientY;

    Object.values(subscriptions).map((callback) => callback(x, y));
  };

  window.addEventListener("mousemove", move);

  return {
    getX: () => x,
    getY: () => y,
    subscibe(callback) {
      Object.assign(subscriptions, { [++id]: callback });
      return id;
    },
    unsubscribe: (removeId) => delete subscriptions[removeId],
  };
};

export default mouseTracker();
