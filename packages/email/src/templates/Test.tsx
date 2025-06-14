import React from "react";
import { Button, Html } from "@react-email/components";

const MyEmail = () => {
  return (
    <Html>
      <Button
        href="https://example.com"
        className=""
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
};

export default MyEmail;
