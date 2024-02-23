import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        class="w-12 h-12 rounded-full animate-spin
                    border-8 border-solid border-purple-500 border-t-transparent"
      ></div>
    </div>
  );
};

export default Loading;
