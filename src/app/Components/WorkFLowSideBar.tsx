"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function WorkFLowSideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      {true && (
        <aside className="w-64 bg-[#D9D9D9] text-white hidden md:block sticky top-16 h-[calc(100vh-4rem)]">
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/dashboard"
                  className="text-lg bg-gray-700 p-2 rounded block"
                >
                 TASK 1
                </Link>
              </li>
              <li>
                <Link
                  href="/workflow"
                  className="text-lg bg-gray-700 p-2 rounded block"
                >
                 TASK 2
                </Link>
              </li>
              <li>
                <Link
                  href="/something"
                  className="text-lg bg-gray-700 p-2 rounded block"
                >
                 Task 3
                </Link>
              </li>
              <li>
                <Link
                  href="/something1"
                  className="text-lg bg-gray-700 p-2 rounded block"
                >
                  Task 4
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      )}
      <main className="flex-1 md:px-8 md:py-4 bg-gray-100 overflow-auto h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}
