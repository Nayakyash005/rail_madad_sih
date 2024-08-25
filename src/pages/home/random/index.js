import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

export default function RandomNumber() {
  const { response } = useLoaderData();

  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={response}>
          {(num) => <h1>Your random number is: {num}</h1>}
        </Await>
      </Suspense>
    </div>
  );
}
