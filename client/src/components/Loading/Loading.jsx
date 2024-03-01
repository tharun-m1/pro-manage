import React from "react";

function Loading() {
  return (
    <div
      style={{
        height: "99.99dvh",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        zIndex: "2",
        background: "rgba(0, 0, 0, 0.81)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem",
      }}
    >
      Loading...
    </div>
  );
}

export default Loading;
