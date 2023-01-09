import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        background: "DarkSalmon",
        padding: "1rem 0",
      }}
    >
      <p>
        Author:
        <span>Dao Nhat Tuan</span>
      </p>
      <p>Software Developer Helsinki College</p>
      <p style={{ margin: 0 }}>
        Email: <a href="dntuan0110@gmail.com">dntuan0110@gmail.com</a>
      </p>
      <p style={{ margin: 0 }}>
        Github: <a href="https://github.com/TuanDao-0110">https://github.com/TuanDao-0110</a>
      </p>
    </footer>
  );
}
