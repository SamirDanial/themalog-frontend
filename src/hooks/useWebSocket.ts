import { useEffect } from "react";
import io from "socket.io-client";

const socketUrl = "ws://localhost:3001"; // Update with your WebSocket URL

export const useWebSocket = (onMessage: (message: any) => void) => {
  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io(socketUrl);

    // Listen for the 'temperatureUpdate' event
    socket.on("temperatureUpdate", (message: any) => {
      // Call the callback function when a message is received
      onMessage(message);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, [onMessage]);
};
