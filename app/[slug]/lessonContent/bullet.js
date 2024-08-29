import React from "react";
import { renderAttributes } from "./lessonContent";

export default function Bullet({ value }) {
  return (
    <div>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((bullet, i) => (
            <ul className="" key={i}>
              {bullet.data.map((row, rowIndex) => (
                <>
                  {typeof row === "object" ? (
                    renderAttributes(row)
                  ) : (
                    <li key={rowIndex} className="flex text-xl">
                      <span className="mr-2">
                        {" "}
                        {bullet.type ? <div> {bullet.type}</div> : <div>•</div>}
                      </span>
                      <span>{renderAttributes(row)}</span>
                    </li>
                  )}
                </>
              ))}
            </ul>
          ))
        : null}
    </div>
  );
}
