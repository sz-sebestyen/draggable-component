const mouseTracker = () => {
  let x, y;
  let id = 0;
  const subscriptions = {};
  let isListening = false;

  const move = ({ clientX, clientY }) => {
    x = clientX;
    y = clientY;

    Object.values(subscriptions).map((callback) => callback(x, y));
  };

  return {
    getX: () => x,
    getY: () => y,
    subscibe(callback) {
      Object.assign(subscriptions, { [++id]: callback });
      !isListening && window.addEventListener("mousemove", move);
      isListening = true;
      return id;
    },
    unsubscribe(removeId) {
      delete subscriptions[removeId];
      !Object.keys(subscriptions).length &&
        window.removeEventListener("mousemove", move);
      isListening = false;
    },
  };
};

export default mouseTracker();
