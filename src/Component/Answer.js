import React from "react";

const Answer = ({ a }) => {
  return (
    <div>
      <p
        style={{
          position: "relative",
          paddingBottom: "5px",
          marginLeft: "20px",
          borderBottom: "2px solid grey",
        }}
      >
        <span>
          {a.answer}
          <span
            style={{
              color: "gray",
              fontSize: "small",
              display: "flex",
            }}
          >
            <span style={{ color: "green" }}>
              {a.user.displayName || a.user.email} on {new Date(a.timestamp).toLocaleString()}
            </span>
          </span>
        </span>
      </p>
    </div>
  );
};

export default Answer;
